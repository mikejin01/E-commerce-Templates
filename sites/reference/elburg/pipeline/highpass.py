"""High-pass screen: subtract a blurred copy from the greyscale and autocontrast.

Embossing and low-contrast printing pop out of the shading; a plain 1:1 look
reads a two-line maker's stamp as grain (PLAN.md, standing rule 9). This is the
screen that runs over EVERY shipped file, before and after the patch.
"""
import sys, glob, os
from PIL import Image, ImageFilter, ImageChops, ImageOps


def highpass(path, radius=6):
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (128, 128, 128, 255))
    bg.alpha_composite(im)
    g = bg.convert("L")
    hp = ImageChops.difference(g, g.filter(ImageFilter.GaussianBlur(radius)))
    return ImageOps.autocontrast(hp)


def contact(paths, out, cell=340, radius=6, cols=None):
    ims = [highpass(p, radius) for p in paths]
    cols = cols or min(6, len(ims))
    rows = (len(ims) + cols - 1) // cols
    scaled = []
    for im in ims:
        r = cell / max(im.size)
        scaled.append(im.resize((max(1, int(im.width * r)), max(1, int(im.height * r)))))
    sheet = Image.new("L", (cols * cell, rows * cell), 0)
    for i, im in enumerate(scaled):
        x, y = (i % cols) * cell, (i // cols) * cell
        sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
    sheet.save(out)
    print(out, sheet.size, [os.path.basename(p) for p in paths])


if __name__ == "__main__":
    paths = sorted(sum([glob.glob(a) for a in sys.argv[2:]], []))
    contact(paths, sys.argv[1])
