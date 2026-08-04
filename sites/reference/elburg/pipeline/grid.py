"""Render an image (or a crop of one) at a zoom with a labelled pixel grid, so a
mark's rect can be *measured* off the picture instead of guessed. Reading rects
off an unlabelled zoom is how five ELBURG patches were drawn to the wrong bounds.
"""
import sys
from PIL import Image, ImageDraw

def sheet(path, out, crop=None, zoom=2, step=20):
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (245, 244, 240, 255))
    bg.alpha_composite(im)
    im = bg.convert("RGB")
    ox, oy = 0, 0
    if crop:
        ox, oy = crop[0], crop[1]
        im = im.crop(crop)
    w, h = im.size
    im = im.resize((int(w * zoom), int(h * zoom)), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    for x in range(0, w + 1, step):
        d.line([(x * zoom, 0), (x * zoom, h * zoom)], fill=(255, 0, 0), width=1)
        d.text((x * zoom + 2, 2), str(x + ox), fill=(255, 0, 0))
    for y in range(0, h + 1, step):
        d.line([(0, y * zoom), (w * zoom, y * zoom)], fill=(0, 90, 255), width=1)
        d.text((2, y * zoom + 2), str(y + oy), fill=(0, 90, 255))
    im.save(out)
    print(out, im.size)

if __name__ == "__main__":
    a = sys.argv
    crop = tuple(int(v) for v in a[3].split(",")) if len(a) > 3 and a[3] != "-" else None
    zoom = float(a[4]) if len(a) > 4 else 2
    step = int(a[5]) if len(a) > 5 else 20
    sheet(a[1], a[2], crop, zoom, step)
