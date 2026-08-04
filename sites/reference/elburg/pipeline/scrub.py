"""Apply the de-brand recipes to every downloaded render.

Rects are never hand-written per file. The studio renders inside a model family
share a pose but NOT their pixel dimensions (Duowallet's three colourways are
442, 480 and 501px wide), so a recipe names a *region* in fractions of the
image and `find_mark` measures the actual rect inside it. That survives the
drift and it is the technique PLAN.md asks for — measure the rect, don't read it
off a zoom.

Alpha: every render is a cut-out PNG. debrand.py works in RGB, so the alpha
channel is split off and re-attached; a patch never touches the silhouette.
"""
import os, sys, glob
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", ".."))
sys.path.insert(0, "/Users/mikejin/Documents/GitHub/XO Clients/Template-Vallon/sites/reference/elburg")
from debrand import find_mark, pick_offset, patch, blur_patch  # noqa: E402


def stud_smear(im, rect, spread=15, steps=11, feather=3):
    """Erase an engraved press-stud rim by smearing the disc *tangentially*.

    A stud is a small metal dome with the wordmark engraved twice around its
    rim. Blurring it either leaves the letters (an ellipse drawn to the disc
    feathers exactly on them) or, grown enough to cover them, prints a soft
    halo on the leather that reads as a retouch. But engraving is localised in
    ANGLE while the dome's own shading — the rim, the bevel, the specular
    highlight — varies only with radius. So average a fan of copies rotated
    about the stud's centre: the letters average away, the dome survives sharp.

    The fan is taken from a rect padded by half again, so the rotation pulls in
    real neighbouring pixels rather than black corners.
    """
    x0, y0, x1, y1 = rect
    cx, cy = (x0 + x1) / 2.0, (y0 + y1) / 2.0
    w, h = x1 - x0, y1 - y0
    pad = int(max(w, h) * 0.75)
    box = (int(cx - w / 2 - pad), int(cy - h / 2 - pad),
           int(cx + w / 2 + pad), int(cy + h / 2 + pad))
    box = (max(0, box[0]), max(0, box[1]), min(im.width, box[2]), min(im.height, box[3]))
    big = im.crop(box)
    centre = (cx - box[0], cy - box[1])

    acc = None
    for i in range(steps):
        a = -spread + 2.0 * spread * i / (steps - 1)
        rot = big.rotate(a, resample=Image.BICUBIC, center=centre)
        acc = rot if acc is None else Image.blend(acc, rot, 1.0 / (i + 1))

    mask = Image.new("L", big.size, 0)
    ImageDraw.Draw(mask).ellipse(
        (centre[0] - w / 2, centre[1] - h / 2, centre[0] + w / 2, centre[1] + h / 2), fill=255)
    big.paste(acc, (0, 0), mask.filter(ImageFilter.GaussianBlur(feather)))
    im.paste(big, (box[0], box[1]))
    return im


def blur_ellipse(im, rect, radius=5, feather=4):
    """blur_patch, but masked to the ellipse inscribed in `rect`.

    A press stud is a disc engraved around its rim, sitting on leather. A
    rectangular blur big enough to reach the rim's last letter also softens a
    square of the leather around it, and that square reads as a retouch from
    across the page. Masking to the disc keeps the grain outside it sharp.
    """
    x0, y0, x1, y1 = rect
    w, h = x1 - x0, y1 - y0
    src = im.crop(rect).filter(ImageFilter.GaussianBlur(radius))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, w - 1, h - 1), fill=255)
    im.paste(src, (x0, y0), mask.filter(ImageFilter.GaussianBlur(feather)))
    return im


def _abs(rect_frac, w, h):
    x0, y0, x1, y1 = rect_frac
    return (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))


def run_ops(im, ops, name=""):
    """`im` is RGB. Each op is a dict; see RECIPES for the vocabulary."""
    w, h = im.size
    log = []
    for op in ops:
        region = _abs(op["region"], w, h)
        mode = op.get("mode", "bright")
        k = op.get("k", 30)
        if op.get("fixed"):
            # a stud's engraved rim has no clean outlier cluster — find_mark
            # latches onto the stud's own specular highlight instead. Where the
            # mark's position is stable across a family, name the rect.
            rect = region
        else:
            try:
                rect = find_mark(im, region, mode=mode, k=k, pad=op.get("pad", 6),
                                 gap=op.get("gap", 6))
            except ValueError:
                log.append(f"    {op['id']}: no mark found in {region}")
                continue
            rw, rh = rect[2] - rect[0], rect[3] - rect[1]
            if rw > (region[2] - region[0]) * 0.96 and rh > (region[3] - region[1]) * 0.96:
                log.append(f"    {op['id']}: cluster filled the region, using it whole")
        grow = op.get("grow", 0)
        rect = (rect[0] - grow, rect[1] - grow, rect[2] + grow, rect[3] + grow)
        gf = op.get("grow_frac")
        if gf:
            cx, cy = (rect[0] + rect[2]) / 2.0, (rect[1] + rect[3]) / 2.0
            rx, ry = (rect[2] - rect[0]) / 2.0 * gf, (rect[3] - rect[1]) / 2.0 * gf
            rect = (int(cx - rx), int(cy - ry), int(cx + rx), int(cy + ry))
        rect = (max(0, rect[0]), max(0, rect[1]), min(w, rect[2]), min(h, rect[3]))
        if op.get("tool") == "stud":
            # Smear first, then a light blur over the residue. A blur alone only
            # lowers the engraving's contrast — the relief survives as a soft
            # modulation that is still readable at 4x. The smear removes the
            # angular modulation itself, which is what the letters ARE.
            d = min(rect[2] - rect[0], rect[3] - rect[1])
            stud_smear(im, rect, spread=op.get("spread", 18), steps=13,
                       feather=max(2, int(d * 0.05)))
            blur_ellipse(im, rect, radius=max(2.0, d * 0.05), feather=max(3, int(d * 0.10)))
            log.append(f"    {op['id']}: stud {rect} d={d}")
        elif op.get("tool") == "fill":
            # flat vector artwork: a clone brings the illustration's own line
            # work with it and a blur only softens an outlined word. Painting
            # the field's colour back over it is exactly right, and only right,
            # because the field IS one flat colour.
            fa = op.get("fill_at")
            if fa:
                col = im.getpixel((int(fa[0] * w), int(fa[1] * h)))
            else:
                from debrand import _ring_mean
                col = tuple(int(round(v)) for v in _ring_mean(im.crop(rect), 4))
            block = Image.new("RGB", (rect[2] - rect[0], rect[3] - rect[1]), col)
            m = Image.new("L", block.size, 255)
            im.paste(block, (rect[0], rect[1]), m.filter(ImageFilter.GaussianBlur(1.5)))
            log.append(f"    {op['id']}: fill {rect} {col}")
        elif op.get("tool") == "blur":
            blur_patch(im, rect, radius=op.get("radius", 8), feather=op.get("feather", 6))
            log.append(f"    {op['id']}: blur {rect}")
        else:
            # a lattice texture (the magnet pad's dot grid) only clones cleanly
            # at a whole number of its own pitch, so those offsets are absolute
            offs = op.get("offsets_px") or [
                (int(dx * w), int(dy * h)) for dx, dy in op["offsets"]
            ]
            dx, dy = pick_offset(im, rect, offs, mode=mode, k=k)
            patch(im, rect, dx, dy, feather=op.get("feather", 6))
            log.append(f"    {op['id']}: clone {rect} by {(dx, dy)}")
    return log


def process(src, dst, ops):
    im = Image.open(src)
    alpha = im.getchannel("A") if im.mode in ("RGBA", "LA") else None
    rgb = im.convert("RGB")
    log = run_ops(rgb, ops, src)
    out = rgb
    if alpha is not None:
        out = rgb.convert("RGBA")
        out.putalpha(alpha)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if dst.endswith(".png"):
        out.save(dst, optimize=True)
    else:
        out.convert("RGB").save(dst, quality=88, progressive=True)
    return log
