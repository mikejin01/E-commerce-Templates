"""Flatten every render onto its colourway's own tint and ship it as a JPEG.

The reference composites its cut-out renders onto a per-product tint — the tint
is a real design element, used behind the PDP panels and on every card. Baking
it in costs nothing (nothing ever shows these renders on another ground), drops
28MB of RGBA PNG to about a tenth of that, and removes a whole class of bug the
site doc warns about: a colourway that lost its tint would otherwise render a
cut-out over the paper background and lose its edges.
"""
import os, shutil
from PIL import Image

DEST = "/Users/mikejin/Documents/GitHub/XO Clients/Template-Vallon/public/images/elburg"

TINTS = {
    ("cardlift", "black"): "#454545", ("cardlift", "red"): "#BA4C40",
    ("cardlift", "sand"): "#BCAA93",
    ("cardlift-snap", "titanium"): "#B6B6B6", ("cardlift-snap", "fuchsia"): "#B45672",
    ("cardlift-snap", "lime"): "#BCB693",
    ("cardlift-sleeve", "desert"): "#A8886B", ("cardlift-sleeve", "black"): "#666666",
    ("cardlift-sleeve", "charcoal"): "#5C5648",
    ("notewallet", "nightblue-orange"): "#C05746", ("notewallet", "black"): "#666666",
    ("notewallet", "teal"): "#849399",
    ("claspwallet", "cappuccino"): "#C1A488", ("claspwallet", "ice-blue"): "#849399",
    ("claspwallet", "butter-yellow"): "#D6BC7A",
    ("foldwallet", "latte"): "#BCAA93", ("foldwallet", "rose"): "#C5ABA5",
    ("foldwallet", "chocolate"): "#8F6E5B",
    ("strapwallet", "leaf-khaki"): "#9D9F8B", ("strapwallet", "black"): "#727272",
    ("strapwallet", "steel-blue-brown"): "#ABB4C0",
    ("duowallet", "cognac-brown"): "#AC9080", ("duowallet", "red"): "#994C40",
    ("duowallet", "chocolate"): "#8F6E5B",
}
ADDON_TINTS = {"trackcard": "#CFCAC1", "coin-pouch": "#B0BABE", "cashband": "#B6B6B6"}


def flatten(src, dst, hexcol, quality=88):
    im = Image.open(src).convert("RGBA")
    bg = Image.new("RGBA", im.size, hexcol)
    bg.alpha_composite(im)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    bg.convert("RGB").save(dst, quality=quality, progressive=True, optimize=True)


def main():
    for (prod, col), tint in TINTS.items():
        for view in ("front", "open", "side"):
            src = f"clean/products/{prod}/{col}-{view}.png"
            if not os.path.exists(src):
                continue
            flatten(src, f"{DEST}/products/{prod}/{col}-{view}.jpg", tint)
    for slug, tint in ADDON_TINTS.items():
        flatten(f"clean/addons/{slug}-front.png", f"{DEST}/addons/{slug}.jpg", tint)
    for kind in ("materials", "facts"):
        for name in os.listdir(f"clean/{kind}") if os.path.isdir(f"clean/{kind}") else []:
            os.makedirs(f"{DEST}/{kind}", exist_ok=True)
            shutil.copy(f"clean/{kind}/{name}", f"{DEST}/{kind}/{name}")


if __name__ == "__main__":
    main()
    print("deployed")
