"""De-brand recipes, one entry per (family, view).

Regions are FRACTIONS of the image, because a family's three colourways are the
same pose at slightly different pixel sizes (Duowallet: 442, 480, 501 wide).
`find_mark` measures the real rect inside the region, so the region only has to
be roughly right — which is what makes one recipe cover three files.

Where the reference hides its mark, per the checklist in sites/elburg.md:
  spine   printed down the card holder's anodised edge — every front and side
  emboss  stamped into the leather panel, bottom left
  stud    engraved around the press stud's rim — `fixed`, because find_mark
          latches onto the stud's own specular highlight instead
  pad     debossed in the middle of the magnetic pad (Cardlift Snap only)
  cards   printed on the mock cards slotted into the open views
"""

# The spine rects below are all at least three times the wordmark's own width.
# `_feather_mask` clamps its feather to a quarter of the short side, so a rect
# drawn 2x the mark leaves an opaque core barely wider than the mark itself and
# the outermost strokes paste semi-transparent — a legible ghost, and PLAN.md's
# first-and-last-letter failure in its subtlest form.
SPINE_DOWN = [(0, 0.22), (0, 0.30), (0, 0.40), (0, 0.50)]


def STUD(x0, y0, x1, y1, scale=1.38):
    """An engraved press stud: give the disc's own measured bounds.

    The engraving runs around the RIM, so the mask has to clear the disc
    entirely or the feather lands on the letters and they survive — the
    circular form of the first-and-last-letter failure in PLAN.md. Hence the
    38% growth, and hence an ellipse rather than a rect: the extra softness
    falls on the leather ring around the stud, where a rectangle's corners
    would have read as a retouch.
    """
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    rx, ry = (x1 - x0) / 2 * scale, (y1 - y0) / 2 * scale
    return dict(region=(max(0.0, cx - rx), max(0.0, cy - ry),
                        min(1.0, cx + rx), min(1.0, cy + ry)),
                fixed=True, tool="stud")


def SIDE_SPINE(*offsets):
    """The side view IS the card holder's spine: one uniform vertical strip.

    find_mark missed the mark outright on three of the 24 sides (the emboss is
    lower-contrast on a matte finish), so the band is fixed and over-covered
    instead — cloning a strip onto itself from further down costs nothing, and
    the strip's horizontal gradient is preserved by a purely vertical offset."""
    return dict(region=(0.0, 0.03, 1.0, 0.28), fixed=True, offsets=list(offsets))


def EMBOSS(x0, y0, x1, y1):
    """A leather emboss gets a *fixed* rect, not a measured one.

    find_mark's outlier clustering saturates on leather grain: on ELBURG's
    first pass it returned a 39px box for a 100px word, and what shipped was
    the classic first-and-last-letter ghost. The mark's position is stable
    inside a model family, so the rect is named and the clone comes from clean
    leather above it."""
    return dict(region=(x0, y0, x1, y1), fixed=True,
                offsets=[(0, -0.11), (0, -0.17), (0, -0.24), (0.24, -0.11)])

RECIPES = {
    # --- anodised aluminium ------------------------------------------------
    ("cardlift", "front"): [
        dict(id="spine", region=(0.826, 0.050, 0.920, 0.232), fixed=True, offsets=SPINE_DOWN),
    ],
    ("cardlift", "side"): [
        dict(id="spine", **SIDE_SPINE((0, 0.30), (0, 0.42), (0, 0.55))),
    ],
    ("cardlift", "open"): [
        # the spine runs down-right at ~0.45 px/px; clone along it, not across
        dict(id="spine", region=(0.360, 0.618, 0.500, 0.742), fixed=True,
             offsets=[(-0.11, -0.050), (-0.17, -0.077), (-0.23, -0.104)]),
    ],
    ("cardlift-snap", "front"): [
        # the pad is a dot lattice with a 9.5px vertical pitch, so the clone
        # only registers at a whole number of pitches — and only ±76px stays
        # inside the ring. A free choice of offset dragged the ring's own edge
        # into the middle of the pad and printed a crescent there.
        dict(id="pad", region=(0.185, 0.240, 0.665, 0.342), fixed=True,
             offsets_px=[(0, -76), (0, 76)]),
    ],
    ("cardlift-snap", "side"): [
        dict(id="spine", **SIDE_SPINE((0, 0.30), (0, 0.42), (0, 0.55))),
    ],
    ("cardlift-snap", "open"): [
        dict(id="spine", region=(0.420, 0.598, 0.552, 0.742), fixed=True,
             offsets=[(-0.14, -0.059), (-0.20, -0.084), (-0.26, -0.109)]),
        # "…PROTECTOR" printed across the top mock card, at an angle
        dict(id="card", region=(0.772, 0.452, 0.898, 0.556), fixed=True,
             tool="blur", radius=5, feather=5),
    ],
    ("cardlift-sleeve", "front"): [
        # the mark is on the metal clip: smooth, and only ~17px wide, so there
        # is nothing to clone from — a light blur is the documented tool
        dict(id="spine", region=(0.894, 0.092, 0.960, 0.270), fixed=True,
             tool="blur", radius=9, feather=5),
    ],
    ("cardlift-sleeve", "side"): [
        dict(id="spine", region=(0.18, 0.075, 1.00, 0.295), fixed=True,
             tool="blur", radius=9, feather=5),
    ],
    ("cardlift-sleeve", "open"): [
        dict(id="spine", region=(0.0, 0.02, 1.0, 0.30), fixed=True,
             offsets=[(0, 0.24), (0, 0.34), (0, 0.44)]),
    ],

    # --- leather -----------------------------------------------------------
    ("notewallet", "front"): [
        dict(id="spine", region=(0.884, 0.026, 0.980, 0.212), fixed=True, offsets=SPINE_DOWN),
        dict(id="emboss", **EMBOSS(0.10, 0.765, 0.58, 0.885)),
    ],
    ("notewallet", "side"): [
        dict(id="spine", **SIDE_SPINE((0, 0.32), (0, 0.45), (0, 0.58))),
    ],
    ("notewallet", "open"): [],  # mock cards read CREDITCARD / WORLDC — generic

    ("claspwallet", "front"): [
        dict(id="emboss", region=(0.020, 0.34, 0.145, 0.66), fixed=True,
             offsets=[(0.16, 0), (0.24, 0), (0.16, -0.12), (0.16, 0.12)]),
        dict(id="stud", **STUD(0.358, 0.429, 0.561, 0.544)),
    ],
    ("claspwallet", "side"): [],
    ("claspwallet", "open"): [
        dict(id="spine-l", region=(0.006, 0.042, 0.052, 0.210), fixed=True,
             offsets=[(0, 0.26), (0, 0.36)]),
        # printed on the mock card, not on the wallet: no clean run of the same
        # card to clone from, and every candidate offset held another copy of
        # the same word — so this one is a blur, per PLAN.md's smooth-surface rule
        dict(id="card", region=(0.632, 0.560, 0.742, 0.870), fixed=True,
             tool="blur", radius=5, feather=5),
        dict(id="stud", **STUD(0.923, 0.450, 0.967, 0.560)),
    ],

    ("foldwallet", "front"): [
        dict(id="spine", region=(0.884, 0.024, 0.980, 0.210), fixed=True, offsets=SPINE_DOWN),
        dict(id="stud", **STUD(0.425, 0.406, 0.648, 0.554)),
        dict(id="emboss", **EMBOSS(0.10, 0.770, 0.58, 0.885)),
    ],
    ("foldwallet", "side"): [
        dict(id="spine", **SIDE_SPINE((0, 0.60), (0, 0.66), (0, 0.30))),
    ],
    ("foldwallet", "open"): [
        # the reference's own mock cards, printed "…NAL SINCE 2009" / "CARDPRO…"
        dict(id="card-l", region=(0.485, 0.05, 0.535, 0.78), fixed=True,
             tool="blur", radius=6, feather=5),
        dict(id="card-r", region=(0.625, 0.05, 0.675, 0.78), fixed=True,
             tool="blur", radius=6, feather=5),
        dict(id="stud", **STUD(0.942, 0.420, 0.983, 0.520)),
    ],

    ("strapwallet", "front"): [
        dict(id="spine", region=(0.866, 0.024, 0.968, 0.204), fixed=True, offsets=SPINE_DOWN),
        dict(id="emboss", **EMBOSS(0.12, 0.755, 0.58, 0.880)),
    ],
    ("strapwallet", "side"): [
        dict(id="spine", **SIDE_SPINE((0, 0.48), (0, 0.56), (0, 0.64))),
    ],
    ("strapwallet", "open"): [
        dict(id="spine", region=(0.300, 0.020, 0.460, 0.300), fixed=True,
             offsets=[(0, 0.26), (0, 0.36), (0.10, 0.26)]),
    ],

    ("duowallet", "front"): [
        dict(id="spine", region=(0.826, 0.026, 0.926, 0.210), fixed=True, offsets=SPINE_DOWN),
        dict(id="stud", **STUD(0.860, 0.427, 0.968, 0.546)),
        dict(id="emboss", **EMBOSS(0.13, 0.765, 0.55, 0.885)),
    ],
    ("duowallet", "side"): [
        dict(id="spine", **SIDE_SPINE((0, 0.60), (0, 0.66))),
        dict(id="stud", **STUD(0.390, 0.398, 0.905, 0.590)),
    ],
    ("duowallet", "open"): [
        dict(id="card", region=(0.494, 0.535, 0.586, 0.780), fixed=True,
             tool="blur", radius=5, feather=5),
        dict(id="card-edge", region=(0.675, 0.13, 0.730, 0.66), fixed=True,
             tool="blur", radius=5, feather=5),
        dict(id="stud", **STUD(0.932, 0.402, 0.976, 0.505)),
    ],
}

# add-ons: the tracker card and the cashband both carry the mark on their face
ADDON_RECIPES = {
    "trackcard": [
        # the partner's own wordmark, set sideways across a matte plastic card
        dict(id="face", region=(0.385, 0.315, 0.590, 0.660), fixed=True,
             offsets=[(0, 0.30), (0.30, 0), (-0.35, 0), (0, -0.28)]),
    ],
    "coin-pouch": [
        # woven pull tab: the weave runs at ~45 degrees, so the clone offsets
        # follow it rather than shifting straight across
        dict(id="tab", region=(0.875, 0.175, 0.955, 0.375), fixed=True,
             offsets=[(-0.062, -0.040), (-0.062, 0.040), (-0.062, 0)]),
        dict(id="stud", **STUD(0.520, 0.838, 0.700, 0.975)),
    ],
    "cashband": [
        dict(id="clip", region=(0.285, 0.450, 0.525, 0.535), fixed=True,
             tool="blur", radius=6, feather=5),
        # and a second, near-invisible one debossed into the white card holder
        # the band is wrapped around — found only by stretching the contrast of
        # a white-on-white area, which the high-pass screen barely showed
        dict(id="body", region=(0.900, 0.038, 0.998, 0.210), fixed=True,
             offsets=[(0, 0.17), (0, 0.21), (-0.085, 0)]),
    ],
}


# The wallet-facts photography. Only three of the reference's six ship: one of
# its facts names a real certification and one a real award, both of which the
# naming map drops (their artwork is the certification's and the award's own),
# and the "register your wallet" shot is a serial plate carrying the reference's
# name, a country of origin and a scannable data-matrix code — three leaks in
# one frame. Those cards reuse ELBURG's own library instead.
FACT_RECIPES = {
    "quick-access": [
        dict(id="emboss", region=(0.565, 0.420, 0.900, 0.618), fixed=True,
             tool="fill", fill_at=(0.78, 0.32)),
    ],
    "protected-cards": [],
    "built-to-last": [],
}


# Per-colourway overrides. A family's colourways share a pose but not a canvas —
# the Duowallet's three renders are 442, 480 and 501px wide, and the Chocolate
# one is framed differently enough that the family's fraction rect lands 8% of
# the width off the mark. Keyed (product, view, colour); falls back to
# (product, view).
OVERRIDES = {
    ("duowallet", "front", "chocolate"): [
        dict(id="spine", region=(0.794, 0.056, 0.898, 0.244), fixed=True, offsets=SPINE_DOWN),
        dict(id="stud", **STUD(0.780, 0.404, 0.902, 0.538)),
        dict(id="emboss", **EMBOSS(0.13, 0.765, 0.55, 0.885)),
    ],
}


def ops_for(product, view, colour):
    return OVERRIDES.get((product, view, colour)) or RECIPES.get((product, view), [])
