"""
Remove the reference brand from a downloaded product photo (standing rule 2:
nothing shipped names a real company, and the scrub grep cannot see artwork).

Technique: clone-stamp. For each rect holding a mark, copy an adjacent patch of
the SAME material, rescale its mean to the destination's border ring so the
local lighting gradient still matches, then paste it back under a feathered
mask. Preserves leather grain / metal sheen, unlike a blur, which leaves a
visible smudge on a crisp product shot.

patch(im, (x0, y0, x1, y1), dx, dy) — the clone source is the rect shifted by
(dx, dy), so pick an offset that lands on clean material of the same panel.
Pure PIL; no numpy in this environment.

Two rules that cost most of a session to learn:

1. **Pad the rect past the mark by more than the feather.** A rect drawn tight
   around the wordmark puts the mask's feathered ring exactly on the letters, so
   the strokes' edges paste semi-transparent and what ships is an outlined ghost
   of the mark — still legible, and now it looks like a botched retouch too.
   Leave ~8px of clean material on every side.
2. **A mark on a tilted panel needs a rect tall enough for the tilt.** An emboss
   running along a wallet's edge rises across its own length; a rect sized to
   the middle of the word clips the first letter's top and the last letter's
   bottom, and both survive.

Verify by cropping the rect out of the *saved* file at 6-8x and comparing it to
the same crop of the original, side by side. Anything else — checking at 1:1,
or trusting the call — has missed a mark at least once here.
"""

from PIL import Image, ImageFilter, ImageStat


def _ring_mask(w, h, ring=6):
    """Mask selecting only the band just inside a patch's edge. The mark sits in
    the middle, so the edge ring reports the material's local tone."""
    m = Image.new("L", (w, h), 255)
    m.paste(0, (ring, ring, max(ring, w - ring), max(ring, h - ring)))
    return m


def _ring_mean(im, ring=6):
    return ImageStat.Stat(im, _ring_mask(im.width, im.height, ring)).mean


def _feather_mask(w, h, feather=6):
    """Opaque core, feathered edge — and the core has to *stay* opaque.

    An inset-then-blur mask silently loses opacity once the rect is narrow: a
    22px-wide rect inset by 6 leaves a 10px core, and blurring that by σ=4 peaks
    around 200, not 255. The clone then pastes ~78% opaque and the mark survives
    as a faded ghost that reads, at a glance, like the patch simply missed. So
    the feather is clamped to a quarter of the short side, and the mask is
    blurred *after* the inset only by as much as the inset can absorb."""
    feather = max(1, min(feather, min(w, h) // 4))
    m = Image.new("L", (w, h), 0)
    m.paste(255, (feather, feather, w - feather, h - feather))
    return m.filter(ImageFilter.GaussianBlur(feather / 2))


def _outliers(im, region, mode, k):
    """Pixels inside `region` that deviate from the local median — a printed mark
    is the brightest thing on its panel, an embossed one the darkest."""
    x0, y0, x1, y1 = region
    g = im.convert("L").crop(region)
    bg = g.filter(ImageFilter.MedianFilter(9)).filter(ImageFilter.GaussianBlur(9))
    gp, bp = g.load(), bg.load()
    out = set()
    for y in range(y1 - y0):
        for x in range(x1 - x0):
            d = gp[x, y] - bp[x, y]
            if (d > k) if mode == "bright" else (d < -k):
                out.add((x, y))
    return out


def find_mark(im, region, mode="bright", k=30, pad=4, gap=6):
    """Bounding box of the mark inside `region`.

    Measuring the rect beats reading it off a zoomed screenshot — every patch
    that "missed" during this build was a misread grid label, not a bad
    technique. Outlier pixels alone are not enough, though: leather grain and a
    stitch line trip the same threshold and stretch the box to the whole region,
    which then clones the wallet's background over the wallet. So outliers are
    clustered (8-connected, dilated by `gap` so the letters of one word join)
    and only the largest cluster is returned."""
    x0, y0, x1, y1 = region
    pts = _outliers(im, region, mode, k)
    if not pts:
        raise ValueError(f"no mark found in {region}")

    seen, best = set(), []
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
        if len(comp) > len(best):
            best = comp

    xs = [p[0] for p in best]; ys = [p[1] for p in best]
    return (x0 + min(xs) - pad, y0 + min(ys) - pad,
            x0 + max(xs) + 1 + pad, y0 + max(ys) + 1 + pad)


def pick_offset(im, rect, offsets, mode="bright", k=30):
    """Choose the clone offset whose source is cleanest and closest in tone.

    Hand-picked offsets kept landing off the panel — on the backdrop, on a
    stitch line, on the *next* copy of the same mark — and a clone from there is
    more obvious than the mark was. Scores each candidate by how many outlier
    pixels its source holds and how far its mean sits from the destination's
    border ring, and returns the best."""
    x0, y0, x1, y1 = rect
    w, h = x1 - x0, y1 - y0
    dm = _ring_mean(im.crop(rect))
    best, best_score = None, None
    for dx, dy in offsets:
        sx0, sy0 = x0 + dx, y0 + dy
        if sx0 < 0 or sy0 < 0 or sx0 + w > im.width or sy0 + h > im.height:
            continue
        src_rect = (sx0, sy0, sx0 + w, sy0 + h)
        dirt = len(_outliers(im, src_rect, mode, k)) / float(w * h)
        sm = _ring_mean(im.crop(src_rect))
        drift = sum(abs(a - b) for a, b in zip(dm, sm)) / 3.0
        score = dirt * 100 + drift
        if best_score is None or score < best_score:
            best, best_score = (dx, dy), score
    if best is None:
        raise ValueError(f"no usable clone offset for {rect}")
    return best


def auto_patch(im, region, offsets, mode="bright", k=30, pad=4, gap=6, **kw):
    """find_mark() + pick_offset() + patch(): a call names the neighbourhood to
    search and a list of candidate directions, never a hand-read pixel rect."""
    rect = find_mark(im, region, mode=mode, k=k, pad=pad, gap=gap)
    dx, dy = pick_offset(im, rect, offsets, mode=mode, k=k)
    patch(im, rect, dx, dy, **kw)
    return rect, (dx, dy)


def patch(im, rect, dx, dy, feather=6, ring=6):
    x0, y0, x1, y1 = rect
    w, h = x1 - x0, y1 - y0

    dst = im.crop(rect)
    src = im.crop((x0 + dx, y0 + dy, x1 + dx, y1 + dy))

    # match the clone's tone to the destination's surroundings, per channel
    dm, sm = _ring_mean(dst, ring), _ring_mean(src, ring)
    bands = []
    for band, d, s in zip(src.split(), dm, sm):
        r = d / max(s, 1e-6)
        bands.append(band.point(lambda v, r=r: min(255, int(v * r + 0.5))))
    src = Image.merge("RGB", bands)

    im.paste(src, (x0, y0), _feather_mask(w, h, feather))
    return im


def blur_patch(im, rect, radius=7, feather=6):
    """For marks printed on a smooth surface (anodised metal, plastic) there is
    no grain to preserve and no clean run of the same material to clone from —
    a feathered blur reads as the surface's own soft sheen."""
    x0, y0, x1, y1 = rect
    w, h = x1 - x0, y1 - y0

    src = im.crop(rect).filter(ImageFilter.GaussianBlur(radius))
    im.paste(src, (x0, y0), _feather_mask(w, h, feather))
    return im


def tile_patch(im, rect, src_rect, feather=6, ring=6, mirror=True, tone=True):
    """For a mark printed across a repeating texture (carbon weave, ribbing)
    where no single clean run is as large as the mark. Tiles a small clean
    sample of the SAME texture across the rect, then tone-matches to the
    destination's border ring exactly as patch() does.

    `mirror` flips alternate tiles so a plain repeat does not read as a grid —
    right for an isotropic grain, but WRONG for a directional weave, where the
    flip reverses the diagonal and prints a chevron the material never had.
    Give the source rect the destination's full height (or width) and it tiles
    along one axis only, so the texture's own lines stay registered.

    Set `tone=False` when the mark runs right up to the rect's edges: the border
    ring then samples the mark itself, and a bright printed mark drags the whole
    clone up with it, replacing the wordmark with an equally obvious glare."""
    x0, y0, x1, y1 = rect
    w, h = x1 - x0, y1 - y0

    dst = im.crop(rect)
    sample = im.crop(src_rect)
    sw, sh = sample.size

    src = Image.new("RGB", (w, h))
    for ty in range(0, h, sh):
        for tx in range(0, w, sw):
            t = sample
            if mirror and (tx // sw) % 2:
                t = t.transpose(Image.FLIP_LEFT_RIGHT)
            if mirror and (ty // sh) % 2:
                t = t.transpose(Image.FLIP_TOP_BOTTOM)
            src.paste(t, (tx, ty))

    if tone:
        dm, sm = _ring_mean(dst, ring), _ring_mean(src, ring)
        bands = []
        for band, d, s in zip(src.split(), dm, sm):
            r = d / max(s, 1e-6)
            bands.append(band.point(lambda v, r=r: min(255, int(v * r + 0.5))))
        src = Image.merge("RGB", bands)

    im.paste(src, (x0, y0), _feather_mask(w, h, feather))
    return im


if __name__ == "__main__":
    import sys

    src_path = "hero-orig.jpg"
    im = Image.open(src_path).convert("RGB")

    # Embossed wordmark on the leather flap. The clone offset follows the flap's
    # own diagonal edge (slope ≈ -0.37), so the edge lands back in place instead
    # of being painted over with flat leather.
    patch(im, (802, 242, 930, 310), 162, -60)
    # Printed wordmark on the card holder: smooth dark metal, nothing to clone.
    blur_patch(im, (1170, 434, 1252, 476), radius=7)

    out = sys.argv[1] if len(sys.argv) > 1 else "hero-clean.jpg"
    im.save(out, quality=88, progressive=True)
    print("wrote", out, im.size)
