"""High-pass + labelled fraction grid: the screening view and the measuring view
in one picture. Labels are FRACTIONS (x100) of the image, because the recipes in
scrub.py are written in fractions — a family's colourways differ in pixel size.
"""
import sys
from PIL import Image, ImageDraw
from highpass import highpass


def sheet(path, out, zoom=2.0, step=0.05, plain=False):
    if plain:
        im = Image.open(path).convert("RGBA")
        bg = Image.new("RGBA", im.size, (245, 244, 240, 255))
        bg.alpha_composite(im)
        im = bg.convert("RGB")
    else:
        im = highpass(path).convert("RGB")
    w, h = im.size
    im = im.resize((int(w * zoom), int(h * zoom)), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    f = 0.0
    while f <= 1.0001:
        x = int(f * w * zoom)
        d.line([(x, 0), (x, h * zoom)], fill=(255, 40, 40))
        d.text((x + 2, 2), f"{f:.2f}", fill=(255, 120, 120))
        y = int(f * h * zoom)
        d.line([(0, y), (w * zoom, y)], fill=(40, 140, 255))
        d.text((2, y + 2), f"{f:.2f}", fill=(120, 190, 255))
        f += step
    im.save(out)
    print(out, im.size, "source", (w, h))


if __name__ == "__main__":
    sheet(sys.argv[1], sys.argv[2],
          float(sys.argv[3]) if len(sys.argv) > 3 else 2.0,
          float(sys.argv[4]) if len(sys.argv) > 4 else 0.05,
          len(sys.argv) > 5 and sys.argv[5] == "plain")
