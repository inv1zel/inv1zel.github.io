#!/usr/bin/env python3
"""Build the deployable iphone-duo/ page from index.html (the artifact-friendly source).

The source keeps everything inline and loads its libraries from CDNs so it can be
previewed as a single file. The build splits it into style.css + app.js, serves
three.js / GSAP / Lenis locally, loads the model as a plain binary, and wraps the
page in a full document with a strict Content-Security-Policy and SRI hashes.

    python3 iphone-duo/source/build.py   ->  writes the page into iphone-duo/
"""
import base64
import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
SRC = (ROOT / "index.html").read_text(encoding="utf-8")
OUT = ROOT.parent
SITE = OUT.parent

CDN = {
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js": "../vendor/three.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js": "vendor/gsap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js": "vendor/ScrollTrigger.min.js",
    "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js": "vendor/lenis.min.js",
}

style = re.search(r"<style>(.*?)</style>", SRC, re.S).group(1)
fonts = re.search(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com[^"]+)">', SRC).group(1)
title = re.search(r"<title>(.*?)</title>", SRC).group(1)
scripts = re.findall(r"<script>(.*?)</script>", SRC, re.S)
assert len(scripts) == 1, "expected one inline app script"
first_cdn = next(iter(CDN))
markup = SRC[SRC.index("</style>") + len("</style>"):SRC.index(f'<script src="{first_cdn}"')].strip()
assert "<script" not in markup

# The artifact can't serve .bin files, so the source reads the model as base64 text.
# GitHub Pages can, so the deployed page fetches the raw binary instead.
B64_FETCH = """const res = await fetch('duo.b64.txt'); if (!res.ok) throw new Error(res.status);
    const bin = atob((await res.text()).trim()), u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const buf = u8.buffer,"""
BIN_FETCH = """const res = await fetch('duo.bin'); if (!res.ok) throw new Error(res.status);
    const buf = await res.arrayBuffer(),"""
app = scripts[0]
assert B64_FETCH in app, "model loader changed; update build.py"
app = app.replace(B64_FETCH, BIN_FETCH)

BASE_CSS = """/* what the artifact preview skeleton used to provide */
body { margin: 0; font-size: 14px; }
img { max-width: 100%; }
[hidden] { display: none !important; }
/* stay blank inside someone else's frame (see ../guard.js) */
html:not(.framed-ok) body { display: none; }
"""

CSP = "; ".join([
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",   # GSAP animates inline styles
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",                                               # fetches duo.bin
    "media-src 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "upgrade-insecure-requests",
])

DESCRIPTION = "iPhone Duo — концепт продающей страницы складного iPhone с живой 3D-моделью, которая складывается при прокрутке."


def sri(path: pathlib.Path) -> str:
    return "sha384-" + base64.b64encode(hashlib.sha384(path.read_bytes()).digest()).decode()


(OUT / "style.css").write_text(BASE_CSS + style.strip() + "\n", encoding="utf-8")
(OUT / "app.js").write_text(app.strip() + "\n", encoding="utf-8")

tags = [f'<script src="../guard.js" integrity="{sri(SITE / "guard.js")}"></script>']
body_scripts = []
for local in list(CDN.values()) + ["app.js"]:
    body_scripts.append(f'<script src="{local}" integrity="{sri(OUT / local)}"></script>')

html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<meta name="referrer" content="no-referrer">
<title>{title}</title>
<meta name="description" content="{DESCRIPTION}">
<meta name="theme-color" content="#050506">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{DESCRIPTION}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
{tags[0]}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{fonts}">
<link rel="stylesheet" href="style.css" integrity="{sri(OUT / "style.css")}">
</head>
<body>
{markup}
{chr(10).join(body_scripts)}
</body>
</html>
"""
(OUT / "index.html").write_text(html, encoding="utf-8")
print("built", OUT / "index.html")
