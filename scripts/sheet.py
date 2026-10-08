"""Gabungkan PNG menjadi satu lembar kontak untuk dicek: python scripts/sheet.py out/stills/reel30 out/sheet.jpg [kolom] [lebar]"""
import glob, sys
from PIL import Image, ImageDraw

prefix, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5
w = int(sys.argv[4]) if len(sys.argv) > 4 else 300
fs = sorted(glob.glob(prefix + '*.png'))
ims = []
for f in fs:
    im = Image.open(f).convert('RGB')
    im = im.resize((w, int(im.height * w / im.width)))
    ImageDraw.Draw(im).text((8, 6), f.split('-')[-1].split('.')[0], fill='red')
    ims.append(im)
rows = (len(ims) + cols - 1) // cols
H = max(i.height for i in ims)
sheet = Image.new('RGB', (cols * (w + 6), rows * (H + 6)), 'white')
for k, im in enumerate(ims):
    sheet.paste(im, ((k % cols) * (w + 6), (k // cols) * (H + 6)))
sheet.save(out, quality=82)
print(out, sheet.size)
