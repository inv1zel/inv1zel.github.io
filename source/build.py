#!/usr/bin/env python3
"""Build the deployable site/ folder from index.html (the artifact-friendly source).

The source keeps everything inline so it can be previewed as a single file.
The build splits it into style.css + scene.js + os.js, serves three.js locally,
and wraps the page in a full document with a strict Content-Security-Policy,
so no inline script is ever allowed to run on the deployed site.

    python3 source/build.py   ->  writes the site into the repository root (served by GitHub Pages)
"""
import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
SRC = (ROOT / "index.html").read_text(encoding="utf-8")
OUT = ROOT.parent

THREE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"

style = re.search(r"<style>(.*?)</style>", SRC, re.S).group(1)
fonts = re.search(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com[^"]+)">', SRC).group(1)
scripts = re.findall(r"<script>(.*?)</script>", SRC, re.S)
assert len(scripts) == 2, "expected the 3D scene script and the OS script"
markup = SRC[SRC.index("</style>") + len("</style>"):SRC.index(f'<script src="{THREE_CDN}"')].strip()
assert "<script" not in markup

BASE_CSS = """/* what the artifact preview skeleton used to provide */
body { margin: 0; font-size: 14px; }
img { max-width: 100%; }
[hidden] { display: none !important; }
"""

CSP = "; ".join([
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",   # inline style="" attrs set by the OS windows
    "font-src https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'none'",
    "media-src 'none'",
    "object-src 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "upgrade-insecure-requests",
])

# GitHub Pages can't send X-Frame-Options / frame-ancestors, so refuse framing from script:
# the page stays invisible unless it is the top window.
GUARD = """// Anti-clickjacking: GitHub Pages can't send frame-ancestors, so do it here.
if (window.top === window.self) {
  document.documentElement.classList.add("framed-ok");
} else {
  try { window.top.location.replace(window.self.location.href); } catch (err) { /* stay hidden */ }
}
"""

DESCRIPTION = "Портфолио inv1zel: старый компьютер в тёмной комнате, загрузка и своя операционная система нулевых с проектами внутри."

FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
<rect width="32" height="32" fill="#050506"/><rect x="4" y="5" width="24" height="18" fill="#cdc3a2"/>
<rect x="6" y="7" width="20" height="14" fill="#0c100d"/><rect x="8" y="10" width="2" height="2" fill="#b9e0b2"/>
<rect x="10" y="12" width="2" height="2" fill="#b9e0b2"/><rect x="8" y="14" width="2" height="2" fill="#b9e0b2"/>
<rect x="13" y="15" width="7" height="2" fill="#b9e0b2"/><rect x="12" y="23" width="8" height="2" fill="#a99f80"/>
<rect x="8" y="25" width="16" height="2" fill="#cdc3a2"/></svg>
"""

ROBOTS = """User-agent: *
Allow: /

# no AI training crawlers
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: anthropic-ai
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: PerplexityBot
Disallow: /
User-agent: Bytespider
Disallow: /
"""

NOT_FOUND = f"""<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'self'">
<meta name="robots" content="noindex">
<title>404 — inv1zel.log</title>
<style>
  body {{ margin: 0; min-height: 100vh; display: grid; place-items: center; background: #050506; color: #b9c7b4;
    font: 15px/1.6 "Courier New", monospace; padding: 16px; box-sizing: border-box; }}
  a {{ color: #ffb766; }}
</style>
</head>
<body>
<main>
<p>C:\\&gt; cd {"{"}страница{"}"}<br>Неверно задан путь.<br><br>Ошибка 404: такой страницы нет.</p>
<p><a href="./">Вернуться к компьютеру</a></p>
</main>
</body>
</html>
"""


def sri(data: bytes) -> str:
    import base64
    return "sha384-" + base64.b64encode(hashlib.sha384(data).digest()).decode()


def write(name: str, text: str) -> bytes:
    path = OUT / name
    path.parent.mkdir(parents=True, exist_ok=True)
    data = text.encode("utf-8")
    path.write_bytes(data)
    return data


css = write("style.css", BASE_CSS + style.strip() + "\n\n/* hidden until guard.js confirms we're not inside someone else's frame */\nhtml:not(.framed-ok) { display: none; }\n")
guard = write("guard.js", GUARD)
scene = write("scene.js", scripts[0].strip() + "\n")
osjs = write("os.js", scripts[1].strip() + "\n")
three = (OUT / "vendor" / "three.min.js").read_bytes()
write("favicon.svg", FAVICON)
write("robots.txt", ROBOTS)
write("404.html", NOT_FOUND)
write(".nojekyll", "")

page = f"""<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="{CSP}">
<meta name="referrer" content="no-referrer">
<title>inv1zel.log</title>
<meta name="description" content="{DESCRIPTION}">
<meta name="theme-color" content="#050506">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:title" content="inv1zel.log">
<meta property="og:description" content="{DESCRIPTION}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<script src="guard.js" integrity="{sri(guard)}"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{fonts}">
<link rel="stylesheet" href="style.css" integrity="{sri(css)}">
</head>
<body>
{markup}

<script src="vendor/three.min.js" integrity="{sri(three)}"></script>
<script src="scene.js" integrity="{sri(scene)}"></script>
<script src="os.js" integrity="{sri(osjs)}"></script>
</body>
</html>
"""
write("index.html", page)
print("built into", OUT.resolve())
