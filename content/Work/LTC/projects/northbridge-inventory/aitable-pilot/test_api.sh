#!/usr/bin/env bash
# AITable API connectivity + space list test
# Usage: ./test_api.sh

set -euo pipefail

CRED_FILE="${HOME}/.config/aitable/credentials.env"

if [[ ! -f "$CRED_FILE" ]]; then
  echo "ERROR: $CRED_FILE not found."
  echo "Copy .env.example to that path, fill in AITABLE_API_TOKEN, then chmod 600."
  exit 1
fi

# shellcheck disable=SC1090
set -a; source "$CRED_FILE"; set +a

if [[ -z "${AITABLE_API_TOKEN:-}" || "$AITABLE_API_TOKEN" == "your_token_here" ]]; then
  echo "ERROR: AITABLE_API_TOKEN is missing or unset in $CRED_FILE"
  exit 1
fi

BASE_URL="${AITABLE_BASE_URL:-https://api.AITable.com/fusion/v1}"

echo "==> Auth: whoami (read current user via spaces list)"
echo "==> GET ${BASE_URL}/spaces"
echo

RESPONSE=$(curl -sS -w "\nHTTP_STATUS:%{http_code}\n" \
  -H "Authorization: Bearer ${AITABLE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  "${BASE_URL}/spaces")

HTTP_STATUS=$(echo "$RESPONSE" | grep -E '^HTTP_STATUS:' | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/^HTTP_STATUS:/d')

echo "HTTP ${HTTP_STATUS}"
echo

if [[ "$HTTP_STATUS" == "200" ]]; then
  echo "==> Spaces (parsed):"
  echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
  echo
  echo "==> Space IDs only:"
  echo "$BODY" | python3 -c "
import sys, json
data = json.load(sys.stdin)
spaces = data.get('data', {}).get('spaces', data.get('spaces', data.get('data', [])))
if isinstance(spaces, list):
    for s in spaces:
        print(f\"  {s.get('id')}  -  {s.get('name')}  -  admin={s.get('isAdmin')}\")
else:
    print(json.dumps(spaces, indent=2))
" 2>/dev/null || echo "(could not auto-parse; raw body above)"
else
  echo "Raw response:"
  echo "$BODY"
fi
