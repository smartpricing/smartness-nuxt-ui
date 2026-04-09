#!/usr/bin/env bash
# Automated bumpp release flow debugger.
#
# Runs the full release flow non-interactively (--no-push, --yes),
# captures the repo state before and after, then auto-undoes everything
# (git reset --hard + tag delete) so the working tree returns to its
# starting state. Full output is also written to /tmp/release-debug.log.
#
# Usage: pnpm release:debug

set -uo pipefail

LOG=/tmp/release-debug.log
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

# Mirror everything to the log file as well as the terminal
exec > >(tee "$LOG") 2>&1

echo "=== release:debug $(date '+%Y-%m-%d %H:%M:%S') ==="
echo "ROOT: $ROOT"
echo

# --- Safety: refuse to run with uncommitted tracked changes -------------------
if ! git diff-index --quiet HEAD --; then
	echo "ERROR: working tree has uncommitted tracked changes."
	echo "Commit or stash them first, then re-run."
	git status --short
	exit 1
fi

ORIGINAL_HEAD=$(git rev-parse HEAD)
ORIGINAL_VERSION=$(node -p "require('./package.json').version")

NEXT_VERSION=$(node -e '
const v = require("./package.json").version.split("-")[0].split(".");
v[2] = String(parseInt(v[2], 10) + 1);
console.log(v.join("."));
')

echo "ORIGINAL_HEAD    = $ORIGINAL_HEAD"
echo "ORIGINAL_VERSION = $ORIGINAL_VERSION"
echo "TARGET_VERSION   = $NEXT_VERSION"
echo

# --- Environment -------------------------------------------------------------
echo "--- ENV ---"
echo "[node]    $(node --version)"
echo "[pnpm]    $(pnpm --version)"
echo "[bumpp]   $(pnpm exec bumpp --version 2>&1 | tail -1)"
echo "[git]     $(git --version)"
echo

# --- Initial state ------------------------------------------------------------
echo "--- INITIAL STATE ---"
echo "[git status]"
git status --short --branch
echo
echo "[git log -3]"
git log --oneline -3
echo
echo "[git tag (last 5)]"
git tag --sort=-creatordate | head -5
echo
echo "[git remote]"
git remote -v
echo

# --- Cleanup leftovers from previous test runs --------------------------------
rm -f CHANGELOG.md
git tag -d "v$NEXT_VERSION" 2>/dev/null || true

echo "--- RUN ---"
echo "+ pnpm exec bumpp $NEXT_VERSION --all --no-push --execute 'pnpm changelog' --yes"
echo

set +e
pnpm exec bumpp "$NEXT_VERSION" --all --no-push --execute "pnpm changelog" --yes
BUMPP_EXIT=$?
set -e

echo
echo "BUMPP_EXIT_CODE = $BUMPP_EXIT"
echo

# --- Post-run state -----------------------------------------------------------
echo "--- POST-RUN STATE ---"
echo "[git status]"
git status --short --branch
echo
echo "[git log -3]"
git log --oneline -3
echo
echo "[git diff HEAD --stat]"
git diff HEAD --stat
echo
echo "[git tag (last 5)]"
git tag --sort=-creatordate | head -5
echo
echo "[package.json version]"
node -p "require('./package.json').version"
echo
echo "[.git/COMMIT_EDITMSG (head)]"
head -5 .git/COMMIT_EDITMSG 2>/dev/null || echo "none"
echo
echo "[CHANGELOG.md (first 40 lines)]"
head -40 CHANGELOG.md 2>/dev/null || echo "no CHANGELOG.md"
echo

# --- Auto-undo ----------------------------------------------------------------
echo "--- AUTO-UNDO ---"
git reset --hard "$ORIGINAL_HEAD"
if git tag -d "v$NEXT_VERSION" 2>/dev/null; then
	echo "deleted tag v$NEXT_VERSION"
else
	echo "no tag v$NEXT_VERSION to delete"
fi
rm -f CHANGELOG.md
echo "[final git status]"
git status --short --branch
echo

echo "=== DONE — full log: $LOG ==="
echo "If anything went wrong and the repo is in an unexpected state, recover with:"
echo "  git reset --hard $ORIGINAL_HEAD"
