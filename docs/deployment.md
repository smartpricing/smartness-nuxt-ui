# Playground deployment

The playground (`.playground/`) is deployed to Kubernetes as a single container, prod only. Only the playground is deployed: the layer itself is consumed via `extends` and has no runtime.

- **URL**: https://ui.smartness.com
- **Helm release / Deployment / Service**: `smartness-ui-playground` (from `imageName` in the root `package.json`)
- **Image tag**: `<version>-<short-sha>`
- **Secrets / runtime env**: none (`layerVersion` is baked at build time)

Cluster, namespace, registry and cloud identity are set in the `env` block of `.github/workflows/deploy.yml`, the only place that needs them.

## Files

```
├── Dockerfile                             # multi-stage Node 24 Alpine, builds the playground
├── .dockerignore
├── .playground/server/api/health.get.ts   # /api/health for probes + load-balancer health check
├── helm/
│   ├── prod.yaml                          # values (replicas, resources, hostNames)
│   └── templates/                         # Deployment, Service, HTTPRoute, health check / backend policies, PDB
└── .github/workflows/deploy.yml           # push on main → build + deploy
```

No versioned `Chart.yaml`: the workflow generates it on the fly.

## How the build works

- The playground is a SPA (`ssr: false`) served by the Nitro `node-server` output: `node .output/server/index.mjs` on port 3000. Server routes (`/api/health`) work as usual with `ssr: false`.
- The image is built from the **repo root**, because `.playground` extends `..` and is a pnpm workspace member. `pnpm build` runs `nuxt prepare` (layer) + `nuxt build .playground`, so the output is `.playground/.output`, copied to `.output` in the runtime stage.
- The whole source is copied before `pnpm install`: the root and `.playground` `postinstall` scripts run `nuxt prepare`, which needs both configs. A BuildKit cache mount on the pnpm store keeps reinstalls fast.
- pnpm is installed at the exact version of `packageManager`. `NODE_OPTIONS=--max-old-space-size=4096` avoids heap OOM during `nuxt build`.
- `pnpm install --frozen-lockfile`: **any dependency change needs a regenerated `pnpm-lock.yaml`**, otherwise the image build fails with `ERR_PNPM_OUTDATED_LOCKFILE`.

## CI/CD

`.github/workflows/deploy.yml` runs on every push to `main`, or manually from Actions → "Build & Deploy playground" → Run workflow.

This repo is public, so the workflow uses only public actions (`actions/*`, `google-github-actions/*`): GitHub does not let a public repo use actions from a private one.

1. **Set image variables** — `imageName` and `version` from `package.json`.
2. **Authenticate to Google Cloud** — Workload Identity Federation (OIDC, `id-token: write`), no stored key.
3. **Build and push image** — `docker build` with the root `Dockerfile`.
4. **Deploy with Helm** — `helm upgrade --install --wait --timeout 10m` with `helm/prod.yaml`. `--wait` fails the run if the pod does not become Ready.

No GitHub secrets or variables are needed.

## Kubernetes details

- **Probes**: readiness `/api/health` after 5s every 5s; liveness after 30s every 15s.
- **Rollout**: `maxUnavailable: 0`, `maxSurge: 1`, `preStop: sleep 10` so the load balancer stops sending traffic before the pod exits.
- **Resources**: 1 replica, small request, memory limit only. Tune in `helm/prod.yaml`.
- **Network**: inbound from the gateway only, no outbound calls.

## Checks

```bash
# Render the chart locally
cd helm && printf 'apiVersion: v2\nname: smartness-ui-playground\ntype: application\nversion: "0"\n' > Chart.yaml
helm template smartness-ui-playground . -f prod.yaml --set image=x --set imageTag=y
rm Chart.yaml

# Health
curl https://ui.smartness.com/api/health   # → {"status":"ok"}
```

Local image test: `docker build -t playground . && docker run --rm -p 3000:3000 playground`, then open http://localhost:3000.
