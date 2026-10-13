#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/load-tests"

: "${SUPABASE_ANON_KEY:?Set SUPABASE_ANON_KEY}"
VUS="${VUS:-150}"
MODE="${LOADTEST_MODE:-supabase}"

if [[ ! -f users.json ]]; then
  echo "Missing load-tests/users.json — run seed-loadtest-users.mjs and apply enroll SQL first." >&2
  exit 1
fi

echo "Running k6 with VUS=$VUS MODE=$MODE"
k6 run \
  -e SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY" \
  -e VUS="$VUS" \
  -e LOADTEST_MODE="$MODE" \
  -e BASE_URL="${BASE_URL:-https://www.cursurispecializare.ro}" \
  lms-lesson-view.k6.js
