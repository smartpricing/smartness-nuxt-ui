FROM --platform=$BUILDPLATFORM node:24-alpine AS build

WORKDIR /usr/src/app

# Whole source before install: the root and .playground postinstall scripts run `nuxt prepare`,
# which needs the layer and playground configs. The pnpm store cache keeps reinstalls fast.
COPY . .

# pnpm version read from packageManager in package.json, so it never drifts
RUN npm i -g pnpm@$(node -p "require('./package.json').packageManager.split('@')[1]")

# No npmrc secret mount: only public packages (the CI passes an empty NPM_TOKEN)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    --mount=type=cache,id=pnpm-cache,target=/pnpm/cache \
    pnpm install --frozen-lockfile --store-dir /pnpm/store --config.cache-dir=/pnpm/cache

ENV NODE_OPTIONS="--max-old-space-size=4096"
# `pnpm build` = nuxt prepare (layer) + nuxt build .playground → .playground/.output
RUN pnpm build

FROM node:24-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.playground/.output ./.output

USER node

ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
