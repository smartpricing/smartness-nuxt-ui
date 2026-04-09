#!/usr/bin/env bash
# Release flow for smartness-nuxt-ui:
#   1) Interactive version bump (bumpp, file-only)
#   2) Generate CHANGELOG.md (changelogen)
#   3) git add + commit + tag
#   4) git push --follow-tags  →  triggers .github/workflows/release.yml (Zapier notify)
#
# Usage: pnpm release

set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

# --- Pre-flight ---------------------------------------------------------------
if ! git diff-index --quiet HEAD --; then
	echo "ERROR: working tree has uncommitted changes. Commit or stash them first."
	git status --short
	exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
	echo "ERROR: must be on 'main' branch (currently on '$BRANCH')."
	exit 1
fi

OLD_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $OLD_VERSION"
echo

# --- 1. Bump version (interactive prompt) -------------------------------------
echo "→ Bumping version..."
pnpm exec bumpp --no-commit --no-tag --no-push package.json

NEW_VERSION=$(node -p "require('./package.json').version")
if [ "$NEW_VERSION" = "$OLD_VERSION" ]; then
	echo "ERROR: version was not changed. Aborting."
	exit 1
fi
echo "✓ Bumped: $OLD_VERSION → $NEW_VERSION"
echo

# --- 2. Generate changelog ----------------------------------------------------
echo "→ Generating CHANGELOG.md..."
pnpm exec changelogen --noAuthors --output CHANGELOG.md
echo "✓ CHANGELOG.md updated"
echo

# --- 3. Commit + tag ----------------------------------------------------------
TAG="v$NEW_VERSION"

echo "→ Committing..."
git add package.json CHANGELOG.md
git commit -m "chore: release $TAG"

echo "→ Tagging $TAG..."
git tag "$TAG"

# --- 4. Push ------------------------------------------------------------------
echo "→ Pushing to origin (commit + tag)..."
git push --follow-tags

echo
echo "✓ Released $TAG"
echo "  Tag pushed → release.yml will trigger Zapier notification."
