#!/usr/bin/env bash
# Buat audio (musik + efek suara) lalu samakan kerasnya ke standar media sosial (-14 LUFS).
set -e
cd "$(dirname "$0")/.."
FF=${FFMPEG:-$(command -v ffmpeg || echo /projects/sandbox/qa-tools/bin/ffmpeg)}
node scripts/audio.mjs
for f in public/audio/*-mix.wav public/audio/*-sfx.wav; do
  "$FF" -hide_banner -loglevel error -y -i "$f" -af "loudnorm=I=-14:TP=-1.5:LRA=11" -ar 48000 -ac 2 "${f%.wav}.tmp.wav"
  mv "${f%.wav}.tmp.wav" "$f"
  echo "$f: $("$FF" -hide_banner -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E '^\s+I:' | tr -s ' ')"
done
