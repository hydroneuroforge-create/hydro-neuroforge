#!/usr/bin/env bash
# Gabungkan video master (tanpa suara) dengan audio → file final siap posting di out/final/
#   <nama>-musik.mp4      : musik orisinal + efek suara
#   <nama>-efek-suara.mp4 : efek suara saja (tambahkan musik dari Instagram/TikTok)
#   <nama>-tanpa-suara.mp4: tanpa audio
# Plus cover (sampul) PNG.
set -e
cd "$(dirname "$0")/.."
FF=${FFMPEG:-$(command -v ffmpeg || echo /projects/sandbox/qa-tools/bin/ffmpeg)}
mkdir -p out/final
declare -A NAME=([reel30]=hnc-reels-30s [reel15]=hnc-iklan-15s [feed30]=hnc-feed-4x5-30s)
for V in reel30 reel15 feed30; do
  M=out/master/$V.mp4
  [ -f "$M" ] || { echo "lewati $V (belum dirender)"; continue; }
  N=${NAME[$V]}
  "$FF" -hide_banner -loglevel error -y -i "$M" -i public/audio/$V-mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/final/$N-musik.mp4
  "$FF" -hide_banner -loglevel error -y -i "$M" -i public/audio/$V-sfx.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/final/$N-efek-suara.mp4
  "$FF" -hide_banner -loglevel error -y -i "$M" -c:v copy -an -movflags +faststart out/final/$N-tanpa-suara.mp4
done
# sampul: adegan judul lengkap
[ -f out/master/reel30.mp4 ] && "$FF" -hide_banner -loglevel error -y -ss 6.0 -i out/master/reel30.mp4 -frames:v 1 out/final/hnc-cover-9x16.png
[ -f out/master/feed30.mp4 ] && "$FF" -hide_banner -loglevel error -y -ss 6.0 -i out/master/feed30.mp4 -frames:v 1 out/final/hnc-cover-4x5.png
ls -la out/final
