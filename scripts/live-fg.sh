#!/usr/bin/env bash
# Preview LIVE untuk HP: Vite (Remotion Player, hot reload) + tunnel Cloudflare dalam satu proses.
# Tautan publik ditulis ke out/live-url.txt. Jalankan sebagai job latar; berhenti bila job dihentikan.
cd /projects/sandbox/hnc-motion
NODE_BIN=$(ls -d /root/.nvm/versions/node/v22*/bin 2>/dev/null | head -1)
export PATH=$NODE_BIN:$PATH
CF=${CLOUDFLARED:-$(command -v cloudflared || echo /projects/sandbox/qa-tools/bin/cloudflared)}
mkdir -p out
rm -f out/tunnel.log out/live-url.txt
echo "start $(date +%T)" > out/live.log
TUNNEL=1 node node_modules/vite/bin/vite.js --config vite.preview.config.ts >> out/live.log 2>&1 &
sleep 4
"$CF" tunnel --no-autoupdate --url http://127.0.0.1:5174 > out/tunnel.log 2>&1 &
for i in $(seq 1 60); do
  URL=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' out/tunnel.log 2>/dev/null | head -1)
  [ -n "$URL" ] && echo "$URL" > out/live-url.txt && break
  sleep 1
done
echo "url $URL" >> out/live.log
wait
