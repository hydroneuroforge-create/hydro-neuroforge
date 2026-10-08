#!/usr/bin/env bash
# Jalankan preview live (Vite + Remotion Player) dan buka akses dari HP lewat tunnel Cloudflare.
# Tautan publik ditulis ke out/live-url.txt. Hentikan dengan: bash scripts/live.sh stop
cd "$(dirname "$0")/.."
export PATH=$(ls -d /root/.nvm/versions/node/v22*/bin 2>/dev/null | head -1):$PATH
CF=${CLOUDFLARED:-$(command -v cloudflared || echo /projects/sandbox/qa-tools/bin/cloudflared)}
mkdir -p out

if [ "$1" = "stop" ]; then
  pkill -f "vite.preview.config.ts" ; pkill -f "cloudflared tunnel" ; echo "dihentikan"; exit 0
fi

if ! pgrep -f "vite.preview.config.ts" >/dev/null; then
  TUNNEL=1 setsid nohup npx vite --config vite.preview.config.ts > out/vite.log 2>&1 < /dev/null &
fi
if ! pgrep -f "cloudflared tunnel" >/dev/null; then
  rm -f out/tunnel.log
  setsid nohup "$CF" tunnel --no-autoupdate --url http://localhost:5174 > out/tunnel.log 2>&1 < /dev/null &
fi
for i in $(seq 1 40); do
  URL=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' out/tunnel.log 2>/dev/null | head -1)
  [ -n "$URL" ] && break
  sleep 1
done
echo "$URL" > out/live-url.txt
echo "LIVE: $URL"
