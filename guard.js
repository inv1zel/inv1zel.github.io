// Anti-clickjacking: GitHub Pages can't send frame-ancestors, so do it here.
if (window.top === window.self) {
  document.documentElement.classList.add("framed-ok");
} else {
  try { window.top.location.replace(window.self.location.href); } catch (err) { /* stay hidden */ }
}
