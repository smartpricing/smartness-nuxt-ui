# Playground deployment (Kubernetes)

The playground (`.playground/`) runs on GKE, same setup as `smartness-pms-webapp` and `smartness-guesthub-webapp`. Only the playground is deployed: the layer itself is consumed via `extends: ["github:smartpricing/smartness-nuxt-ui#vX.Y.Z"]` and has no runtime.

## Identifiers

| What | Value |
|---|---|
| URL | https://ui.smartness.com |
| Cluster / context | `k8s-03-prod` / `gke_smartness-prod_europe-west1_k8s-03-prod` |
| Namespace | `ciaobooking` |
| Helm release / Deployment / Service | `smartness-ui-playground` (from `imageName` in the root `package.json`) |
| Image | `europe-docker.pkg.dev/smartness-artifact-registry/docker/smartness-ui-playground:<version>-<short-sha>` |
| Environments | prod only |
| Secrets | none: the playground reads no runtime env (`layerVersion` is baked at build time) |

## Files

```
├── Dockerfile                        # multi-stage Node 24 Alpine, builds the playground
├── .dockerignore
├── .playground/server/api/health.get.ts   # /api/health for probes + LB health check
├── helm/
│   ├── prod.yaml                     # values (replicas, resources, hostNames)
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── httproute.yaml            # ui.smartness.com on external-http-gateway
│       ├── healthcheckpolicy.yaml    # GKE load-balancer health check → /api/health
│       ├── gcpbackendpolicy.yaml     # backend timeout, connection draining, logging
│       └── pdb.yaml                  # minAvailable 0 with 1 replica
└── .github/workflows/deploy.yml      # push on main → build + deploy
```

No versioned `Chart.yaml`: the shared deploy action generates it on the fly.

## How the build works

- The playground is a SPA (`ssr: false`) served by the Nitro `node-server` output: `node .output/server/index.mjs` on port 3000. Server routes (`/api/health`) work as usual with `ssr: false`.
- The image is built from the **repo root**, because `.playground` extends `..` and is a pnpm workspace member. `pnpm build` runs `nuxt prepare` (layer) + `nuxt build .playground`, so the output is `.playground/.output`, copied to `.output` in the runtime stage.
- The whole source is copied before `pnpm install`: the root and `.playground` `postinstall` scripts run `nuxt prepare`, which needs both configs. A BuildKit cache mount on the pnpm store keeps reinstalls fast.
- pnpm is installed at the exact version of `packageManager`. `NODE_OPTIONS=--max-old-space-size=4096` avoids heap OOM during `nuxt build`.
- `pnpm install --frozen-lockfile`: **any dependency change needs a regenerated `pnpm-lock.yaml`**, otherwise the image build fails with `ERR_PNPM_OUTDATED_LOCKFILE`.

## CI/CD

**This repo is public**, so `.github/workflows/deploy.yml` **cannot** use the private `smartpricing/github-actions` composite actions used by pms/guesthub (GitHub blocks private actions from public repos: the run fails with `Unable to resolve action smartpricing/github-actions, not found`). Their steps are inlined, with only public actions allowed by the repo policy (`actions/*`, `google-github-actions/*`):

1. **Set image variables** — `imageName` and `version` from `package.json`; `TAG = <version>-<short-sha>` (same as the shared `setup-env/v2`).
2. **Authenticate to Google Cloud** — Workload Identity Federation (`google-github-actions/auth`), no JSON key.
3. **Build and push image** — `docker build` with the root `Dockerfile`, push to the Artifact Registry.
4. **Get GKE credentials** + **Deploy with Helm** — ephemeral `helm/Chart.yaml`, then `helm upgrade smartness-ui-playground helm -n ciaobooking -f helm/prod.yaml --install --wait --timeout 10m`. `--wait` fails the run if the pod does not become Ready.

Trigger: every push to `main`, or manually from Actions → "Build & Deploy playground" → Run workflow.

GitHub configuration — none to add (no secrets, no repo vars):

- **GCP auth**: the shared WIF provider (`github-actions-pool/github-provider`) and the `github-actions@smartness-cicd` service account, set in the workflow `env` (same defaults as the shared `v2-wif` actions). If a run fails at "Authenticate to Google Cloud", infra must allow `smartpricing/smartness-nuxt-ui` on that provider/service account.
- **Cluster**: `projects/smartness-prod/locations/europe-west1/clusters/k8s-03-prod`, set in the workflow `env` (the org vars `GKE_CLUSTER_NAME_*` are not shared with this repo).

## Kubernetes details

- **Network policies (Cilium)**: only `np.ingress.external: "true"`. The playground makes no outbound calls, so no egress labels.
- **Probes**: readiness `/api/health` after 5s every 5s; liveness after 30s every 15s.
- **Rollout**: `maxUnavailable: 0`, `maxSurge: 1`, `preStop: sleep 10` so the load balancer stops sending traffic before the pod exits.
- **Resources**: 1 replica, request 10m CPU / 128Mi, memory limit 256Mi, no CPU limit. Raise in `helm/prod.yaml` if needed.

## Manual checks

```bash
CTX=gke_smartness-prod_europe-west1_k8s-03-prod

# Render + server-side validation of the chart, without applying
cd helm && printf 'apiVersion: v2\nname: smartness-ui-playground\ntype: application\nversion: "0"\n' > Chart.yaml
helm template smartness-ui-playground . -n ciaobooking -f prod.yaml --set image=x --set imageTag=y \
  | kubectl --context $CTX apply --dry-run=server -f -
rm Chart.yaml

# Status
kubectl --context $CTX -n ciaobooking get deploy,pod,httproute -l run=smartness-ui-playground
kubectl --context $CTX -n ciaobooking logs deploy/smartness-ui-playground

# Health
curl https://ui.smartness.com/api/health
```

Local image test: `docker build -t playground . && docker run --rm -p 3000:3000 playground`, then open http://localhost:3000.

## First rollout (from Netlify)

DNS and certificate were set up beforehand: `ui.smartness.com` is a CNAME to `k8s-03-prod.smartness.com` and the gateway already serves a valid certificate for it (404 until the HTTPRoute exists).

1. Merge on `main` → watch the "Build & Deploy playground" run; the site is live as soon as the pod is Ready.
2. Check `curl https://ui.smartness.com/api/health` → `{"status":"ok"}`.
3. Turn off the Netlify site (`smartness-nuxt-ui-playground.netlify.app`) from the Netlify UI: there is no `netlify.toml` in the repo.
