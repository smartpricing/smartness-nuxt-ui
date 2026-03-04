#!/usr/bin/env bash
set -euo pipefail

# Sync design system files from Nuxt layer (app/) into Vue lib (.smartness-vue/src/)

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/app"
DEST="$ROOT/.smartness-vue/src"

echo "=== Syncing Nuxt layer → Vue lib ==="
echo "  Source: $SRC"
echo "  Dest:   $DEST"
echo ""

# --- CSS ---
echo "[css] Copying stylesheets..."
rm -rf "$DEST/assets/css"
mkdir -p "$DEST/assets/css"
cp "$SRC/assets/css/"*.css "$DEST/assets/css/"

# --- Fonts (woff2 only) ---
echo "[fonts] Copying web fonts..."
rm -rf "$DEST/assets/fonts"
mkdir -p "$DEST/assets/fonts"
cp "$SRC/assets/fonts/"*.woff2 "$DEST/assets/fonts/"

# --- Components ---
echo "[components] Copying components..."
rm -rf "$DEST/components"
mkdir -p "$DEST/components"
cp -R "$SRC/components/"* "$DEST/components/"

# --- Composables ---
echo "[composables] Copying composables..."
rm -rf "$DEST/composables"
mkdir -p "$DEST/composables"
cp "$SRC/composables/"*.ts "$DEST/composables/"

# --- Types ---
echo "[types] Copying types..."
rm -rf "$DEST/types"
mkdir -p "$DEST/types"
cp "$SRC/types/"*.ts "$DEST/types/"

# --- Utils ---
echo "[utils] Copying utils..."
rm -rf "$DEST/utils"
mkdir -p "$DEST/utils"
cp "$SRC/utils/"*.ts "$DEST/utils/"

# --- App config ---
echo "[config] Copying app.config.ts..."
cp "$SRC/app.config.ts" "$DEST/app.config.ts"

# --- Post-copy transforms (Nuxt → Vue compatibility) ---
echo ""
echo "[transform] Patching Nuxt-specific code..."

# app.config.ts: defineAppConfig() → plain object export
sed -i '' 's/export default defineAppConfig(/export default (/' "$DEST/app.config.ts"
echo "  - app.config.ts: removed defineAppConfig wrapper"

# getSortableHeader.ts: #components → direct @nuxt/ui import
sed -i '' 's|import { UButton } from "#components"|import UButton from "@nuxt/ui/components/Button.vue"|' "$DEST/utils/getSortableHeader.ts"
echo "  - getSortableHeader.ts: replaced #components alias"

# useConfirm.ts: add missing useOverlay import
sed -i '' '1s|^|import { useOverlay } from "@nuxt/ui/composables";\n|' "$DEST/composables/useConfirm.ts"
echo "  - useConfirm.ts: added useOverlay import"

# --- Summary ---
echo ""
echo "=== Sync complete ==="
echo "Files copied:"
find "$DEST" -type f -not -name "index.ts" -not -name "index.mjs" -not -name "vite.mjs" | sort | while read -r f; do
  echo "  ${f#$DEST/}"
done
