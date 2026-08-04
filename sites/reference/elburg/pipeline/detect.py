"""Sweep every shipped render for anything shaped like the reference wordmark.

The per-op verify sheet only checks where the recipe CLAIMS a mark is — on the
Claspwallet's open view the rect was 2% of the width off, so the sheet showed a
clean spine and the wordmark shipped anyway. This looks at the whole frame
instead: high-pass, threshold hard, cluster, and report every blob whose size
and aspect could be a six-letter word (roughly 2.5:1 either way, and a few
hundred px in area). It over-reports — stitching, card print and specular edges
all trip it — but the hits are few enough to look at, which is the point.
"""
import sys, glob, os
from PIL import Image, ImageFilter, ImageChops, ImageOps


def blobs(path, k=48, min_area=90, radius=5):
    im = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", im.size, (128, 128, 128, 255))
    bg.alpha_composite(im)
    g = bg.convert("L")
    hp = ImageChops.difference(g, g.filter(ImageFilter.GaussianBlur(radius)))
    hp = ImageOps.autocontrast(hp)
    w, h = hp.size
    px = hp.load()
    pts = set()
    for y in range(0, h):
        for x in range(0, w):
            if px[x, y] > k:
                pts.add((x, y))
    seen, out = set(), []
    gap = 4
    for p in pts:
        if p in seen:
            continue
        stack, comp = [p], []
        seen.add(p)
        while stack:
            cx, cy = stack.pop()
            comp.append((cx, cy))
            for ny in range(cy - gap, cy + gap + 1):
                for nx in range(cx - gap, cx + gap + 1):
                    q = (nx, ny)
                    if q in pts and q not in seen:
                        seen.add(q); stack.append(q)
        if len(comp) < min_area:
            continue
        xs = [c[0] for c in comp]; ys = [c[1] for c in comp]
        bw, bh = max(xs) - min(xs) + 1, max(ys) - min(ys) + 1
        ar = bw / bh
        fill = len(comp) / float(bw * bh)
        # a word is a compact, elongated, densely-filled run
        if (2.0 < ar < 6.5 or 0.15 < ar < 0.5) and fill > 0.16 and 200 < bw * bh < 40000:
            out.append((min(xs), min(ys), max(xs), max(ys), len(comp), round(ar, 2)))
    return out, (w, h)


if __name__ == "__main__":
    paths = sorted(sum([glob.glob(a) for a in sys.argv[1:]], []))
    for p in paths:
        bs, size = blobs(p)
        for b in bs:
            print(f"{p} {size} rect={b[:4]} area={b[4]} ar={b[5]} "
                  f"frac=({b[0]/size[0]:.3f},{b[1]/size[1]:.3f},{b[2]/size[0]:.3f},{b[3]/size[1]:.3f})")
