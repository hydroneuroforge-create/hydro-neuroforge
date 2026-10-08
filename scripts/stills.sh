#!/usr/bin/env bash
# Render beberapa frame diam untuk cek tampilan: scripts/stills.sh <komposisi> <frame,frame,...>
set -e
export PATH=$(ls -d /root/.nvm/versions/node/v22*/bin 2>/dev/null | head -1):$PATH
COMP=${1:-reel30}
FRAMES=${2:-10,50,160,260,345,610,650,740,860}
mkdir -p out/stills
for F in ${FRAMES//,/ }; do
  npx remotion still src/index.ts "$COMP" "out/stills/$COMP-$(printf %04d "$F").png" --frame="$F" --props='{"audio":"none"}' --gl=swangle --log=error
done
ls out/stills | grep "$COMP" | tr '\n' ' '
