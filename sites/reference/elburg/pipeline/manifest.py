"""The ELBURG Phase 3 image manifest: reference asset -> shipped path.

One entry per file that ships. `family` groups renders that share a pose, so the
de-brand rects can be written once per (family, view) and applied to every
colourway — the studio shots inside a model family are pixel-registered.
"""

# product-slug -> (family, [(colour-slug, reference-slug)])
MODELS = {
    "cardlift": ("cardprotector", [
        ("black", "cardprotector-black"),
        ("red", "cardprotector-red"),
        ("sand", "cardprotector-sand"),
    ]),
    "cardlift-snap": ("magsafe", [
        ("titanium", "cardprotector-for-magsafe-titanium"),
        ("fuchsia", "cardprotector-for-magsafe-fuchsia"),
        ("lime", "cardprotector-for-magsafe-lime"),
    ]),
    "cardlift-sleeve": ("cardslide", [
        ("desert", "cardslide-desert"),
        ("black", "black"),
        ("charcoal", "cardslide-charcoal"),
    ]),
    "notewallet": ("slimwallet", [
        ("nightblue-orange", "slimwallet-matte-nightblue-orange"),
        ("black", "slimwallet-matte-black"),
        ("teal", "slimwallet-vintage-teal"),
    ]),
    "claspwallet": ("envelope", [
        ("cappuccino", "envelope-pebble-cappuccino"),
        ("ice-blue", "envelope-pebble-ice-blue"),
        ("butter-yellow", "envelope-pebble-butter-yellow"),
    ]),
    "foldwallet": ("miniwallet", [
        ("latte", "miniwallet-pebble-latte"),
        ("rose", "miniwallet-pebble-rose"),
        ("chocolate", "miniwallet-original-chocolate"),
    ]),
    "strapwallet": ("bandwallet", [
        ("leaf-khaki", "bandwallet-matte-leaf-khaki"),
        ("black", "bandwallet-matte-black-black"),
        ("steel-blue-brown", "bandwallet-matte-steel-blue-brown"),
    ]),
    "duowallet": ("twinwallet", [
        ("cognac-brown", "twinwallet-vintage-cognac-brown"),
        ("red", "twinwallet-original-red-red"),
        ("chocolate", "twinwallet-vintage-chocolate"),
    ]),
}

# our view name -> the reference `layout` tags that can fill it, best first
VIEWS = {
    "front": ["frontView"],
    "open": ["fullOpen", "flatCards", "custom", "semiOpen", "openEnvelope"],
    "side": ["sideView"],
}

ADDONS = {
    "trackcard": ("chipolo-card", "#CFCAC1"),
    "coin-pouch": ("coinpocket-transparent", "#B0BABE"),
    "cashband": ("moneyband-charcoal", "#B6B6B6"),
}

MATERIALS = {
    "aluminium": "https://a.storyblok.com/f/132418/2839x3267/6cacdcb78f/aluminium_sample.jpg",
    "pebble": "https://a.storyblok.com/f/132418/710x816/a4d96ff56d/pebble-leather.jpg",
    "matte": "https://a.storyblok.com/f/132418/2838x3270/27193881f4/matte-leather.jpg",
    "vintage": "https://a.storyblok.com/f/132418/2838x3268/de6dd5d16c/vintage-leather.jpg",
    "original": "https://a.storyblok.com/f/132418/2838x3268/5c98bdeec2/original-leather.jpg",
}

# the reference's own wallet-facts photography. Two of its six facts name a real
# certification and a real award; the naming map drops both, so their artwork is
# not downloaded — those cards reuse ELBURG's own library.
FACTS = {
    "protected-cards": "https://a.storyblok.com/f/132418/867x1248/ce154559b7/secrid-wallet-frid.jpg",
    "built-to-last": "https://a.storyblok.com/f/132418/863x1152/eaec8c4f91/wallet-fact-no-breaking.jpg",
    "registration": "https://a.storyblok.com/f/132418/1364x648/df3282ff91/serial_code.jpg",
    "quick-access": "https://a.storyblok.com/f/132418/867x1056/33df4e69cd/wallet-fact-times-tested.jpg",
}
