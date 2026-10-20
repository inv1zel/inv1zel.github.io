/* ===================== inv1zel.log ===================== */
(() => {
  // ---- your content: edit here ----
  const ME = {
    name: "Александр",
    login: "you",
    role: "Веб-разработчик · Digital-дизайнер",
    city: "",
    about: [
      "Создаю сайты, которые выходят за рамки обычных шаблонов. Мне интересны необычные визуальные решения, тёмная эстетика, интерактивные интерфейсы и анимации, превращающие просмотр сайта в отдельный опыт. Работаю на стыке веб-разработки и дизайна, экспериментирую с формой, светом, типографикой и цифровыми пространствами.",
      "В работе для меня важны детали, атмосфера и идея, которая стоит за каждым проектом. Люблю превращать абстрактные концепции в работающие сайты — от минималистичных портфолио до экспериментальных интерактивных пространств. Постоянно изучаю новые инструменты, развиваю навыки и ищу способы сделать каждый следующий проект интереснее предыдущего.",
    ],
    skills: [["HTML / CSS", 9], ["JavaScript", 8], ["React", 7], ["Three.js", 6], ["Figma", 6]],
  };
  const CONTACTS = {
    telegram: "inv1zelLog",
  };
  const PROJECTS = [
    { dir: "Aurum_Dental", title: "Aurum Dental", year: "2026", role: "Дизайн и разработка",
      stack: ["HTML", "CSS", "JavaScript", "three.js", "GSAP"], url: "https://inv1zel.github.io/aurum-dental/",
      shot: { theme: "gold", tagline: "Стоматология премиум-класса", cta: "Записаться на приём" },
      desc: "Сайт премиальной стоматологии с рабочей онлайн-записью, панелью для клиники и собственными 3D-сценами.",
      points: [
        ["Запись без личных данных.", "Посетитель выбирает услуги, врача и время и получает талон с номером и QR-кодом. Запись можно перенести или отменить. На сайте нет ни одного поля ввода, ничего не собирается и не хранится."],
        ["Логика как в настоящей клинике.", "Сайт предлагает только тех врачей, которые делают все выбранные услуги, и показывает только окна, куда визит помещается целиком, с учётом обеда и выходных. Калькулятор сразу считает сумму и длительность."],
        ["Две стороны продукта.", "Кроме сайта для пациента есть панель клиники: сетка приёмов, загрузка врачей, выручка, отмена записей и закрытие слотов. Всё, что делает администратор, сразу отражается в записи у посетителя."],
        ["Премиальный вид.", "Тёмная гамма с золотом, свои 3D-сцены на three.js: живой зуб и имплант, который разбирается при прокрутке. Анимации на GSAP, свой курсор, магнитные кнопки. Картинки — собственные 3D-рендеры, без стоковых фото."],
        ["Удобно на телефоне.", "Отдельно проработана мобильная версия: нижняя панель с суммой и кнопкой «Далее», страница нигде не вылезает по ширине."],
        ["Проверено автотестами.", "46 автоматических проверок всех сценариев проходят на телефоне и на компьютере."],
        ["Базовая защита.", "Строгая политика безопасности браузера (CSP), проверка целостности библиотек, защита от встраивания в чужие сайты, запрет ИИ-краулерам в robots.txt."],
        ["Без сервера и сборки.", "Чистые HTML, CSS и JS, все библиотеки внутри проекта. Сайт работает на бесплатном GitHub Pages."],
      ] },
    { dir: "Obsidian_Atelier", title: "Obsidian Atelier", year: "2026", role: "Дизайн и разработка",
      stack: [], url: "https://inv1zel.github.io/obsidian-atelier/",
      shot: { theme: "carbon", tagline: "Детейлинг-ателье", cta: "Записаться" },
      desc: "Сайт премиальной детейлинг-студии: кинематографичное интро, живые фото и онлайн-запись в четыре шага.",
      points: [
        "Премиальный узнаваемый стиль: графит, металл, карбон.",
        "Кинематографичное интро с синтезированным звуком двигателя.",
        "Живые фото: фары, мерцающий свет, пыль, параллакс.",
        "Интерактив: слайдер «до/после» и палитра плёнок.",
        "Удобная запись в 4 шага с талоном и разделом «Мои визиты».",
        "Полная мобильная версия, проверенная на телефонах.",
        "Никаких персональных данных и встроенная защита.",
      ] },
    { dir: "Nocturne", title: "Nocturne", year: "2026", role: "Дизайн и разработка",
      stack: ["React", "TypeScript", "Vite", "GSAP", "GLSL"], url: "https://inv1zel.github.io/inv1zel-nocturne/",
      shot: { theme: "nocturne", tagline: "Selected works", cta: "View project" },
      desc: "Атмосферное портфолио вымышленной студии: изображения, сгенерированные кодом, выразительная типографика и кинематографичные переходы.",
      points: [
        ["Уникальные изображения.", "Ни одного стокового фото: все 14 картинок сгенерированы кодом (GLSL), поэтому нет проблем с авторскими правами."],
        ["Типографика как главный элемент.", "Тонкая контрастная антиква Cormorant, нейтральный Inter для интерфейса и моноширинный JetBrains Mono для подписей."],
        ["Анимации.", "Intro, построчное появление текста, раскрытие изображений, параллакс. Переход в проект сделан так, что картинка карточки раскрывается на весь экран и становится обложкой страницы."],
        ["Кастомный курсор.", "На карточках проектов он показывает «View project». Включается только при управлении мышью."],
        ["Скорость.", "Все изображения вместе весят около 1 МБ (AVIF/WebP с подбором размера под экран). Шрифты подключены локально."],
        ["Адаптивность.", "Проверено на ширинах 360, 390, 820 и 1440 px, горизонтального скролла нет."],
        ["Доступность.", "Работает навигация с клавиатуры, фокус виден, есть ссылка «Skip to content». Если в системе включено уменьшение анимации, сайт её отключает."],
        ["Без ошибок.", "Консоль чистая, нерабочих ссылок нет, неизвестные адреса ведут на страницу 404."],
        ["Безопасность и честность.", "Никаких форм, почты и трекинга, сайт ничего не собирает. Дисклеймер о вымысле есть в колофоне, меню и футере."],
        ["Аккуратный код.", "React, TypeScript, Vite и GSAP. Код разбит на отдельные компоненты с общими дизайн-токенами, анимации корректно очищаются."],
        ["Легко менять.", "Тексты проектов лежат в одном файле. Любую картинку можно заменить: положите фото в art-source/ и выполните одну команду."],
        ["Выложить можно куда угодно.", "Готовы настройки для GitHub Pages, Vercel и Netlify."],
      ] },
  ];

  const OS = { name: "inv1zel.log", host: "inv1zel", wm: "ghost-wm" };

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  document.querySelectorAll("[data-osname]").forEach(n => { n.textContent = OS.name; n.dataset.text = OS.name; });
  document.querySelectorAll("[data-oshost]").forEach(n => { n.textContent = OS.host; });
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const touchUI = matchMedia("(hover: none)").matches;
  const small = () => innerWidth <= 640 || innerHeight <= 500;   // phones, either orientation

  // ---- pixel icons ----
  const svg = (body, vb = 32) => `<svg viewBox="0 0 ${vb} ${vb}" shape-rendering="crispEdges" aria-hidden="true">${body}</svg>`;
  const ICON = {
    who: svg(`<rect x="3" y="5" width="26" height="20" fill="#1a1a1a"/><rect x="5" y="7" width="22" height="16" fill="#0c100d"/>
      <rect x="7" y="10" width="2" height="2" fill="#5fd35f"/><rect x="9" y="12" width="2" height="2" fill="#5fd35f"/><rect x="7" y="14" width="2" height="2" fill="#5fd35f"/>
      <rect x="13" y="15" width="7" height="2" fill="#5fd35f"/><rect x="11" y="25" width="10" height="2" fill="#807b6d"/><rect x="7" y="27" width="18" height="2" fill="#c6c2b6"/>`),
    folder: svg(`<rect x="3" y="7" width="11" height="4" fill="#c8962e"/><rect x="3" y="10" width="26" height="17" fill="#e7b84a"/>
      <rect x="3" y="10" width="26" height="2" fill="#f6d77e"/><rect x="3" y="26" width="26" height="1" fill="#8a6216"/>`),
    mail: svg(`<rect x="3" y="8" width="26" height="17" fill="#f6f4ec"/><rect x="3" y="8" width="26" height="1" fill="#807b6d"/>
      <rect x="3" y="24" width="26" height="1" fill="#807b6d"/>
      <path d="M3 9 L16 18 L29 9" fill="none" stroke="#b8322a" stroke-width="2"/><rect x="22" y="4" width="8" height="8" fill="#b8322a"/><rect x="25" y="6" width="2" height="4" fill="#fff"/>`),
    trash: svg(`<rect x="8" y="9" width="16" height="19" fill="#9aa1a6"/><rect x="6" y="6" width="20" height="3" fill="#6b7277"/><rect x="13" y="4" width="6" height="2" fill="#6b7277"/>
      <rect x="11" y="12" width="2" height="13" fill="#6b7277"/><rect x="15" y="12" width="2" height="13" fill="#6b7277"/><rect x="19" y="12" width="2" height="13" fill="#6b7277"/>`),
    info: svg(`<rect x="4" y="4" width="24" height="24" fill="#1b3a6b"/><rect x="15" y="8" width="3" height="3" fill="#fff"/><rect x="15" y="13" width="3" height="11" fill="#fff"/><rect x="13" y="13" width="2" height="2" fill="#fff"/><rect x="13" y="22" width="7" height="2" fill="#fff"/>`),
    globe: svg(`<circle cx="16" cy="16" r="12" fill="#2a6fb0"/><path d="M8 9h7v5h-4v4H7z M18 7h5l3 5-4 2-2 5h-3v-6z M14 22h6v4h-5z" fill="#55a84c"/>
      <circle cx="16" cy="16" r="12" fill="none" stroke="#10243a"/><rect x="20" y="20" width="9" height="9" fill="#eee"/><path d="M22 22 h5 v1 h-5z M22 24 h5 v1 h-5z M22 26 h3 v1 h-3z" fill="#555"/>`),
    games: svg(`<rect x="3" y="10" width="26" height="14" fill="#4b4e54"/><rect x="5" y="12" width="22" height="10" fill="#777b82"/>
      <rect x="7" y="16" width="7" height="2" fill="#111"/><rect x="9.5" y="13.5" width="2" height="7" fill="#111"/><rect x="20" y="14" width="3" height="3" fill="#c33"/><rect x="23" y="17" width="3" height="3" fill="#3a3"/>`),
    mine: svg(`<rect x="15" y="4" width="2" height="24" fill="#111"/><rect x="4" y="15" width="24" height="2" fill="#111"/>
      <rect x="8" y="8" width="2" height="2" fill="#111"/><rect x="22" y="8" width="2" height="2" fill="#111"/><rect x="8" y="22" width="2" height="2" fill="#111"/><rect x="22" y="22" width="2" height="2" fill="#111"/>
      <circle cx="16" cy="16" r="8" fill="#111"/><rect x="12" y="12" width="3" height="3" fill="#fff"/>`),
    snake: svg(`<rect x="2" y="4" width="28" height="24" fill="#c7d9a7"/><g fill="#2e3b22"><rect x="5" y="20" width="4" height="4"/><rect x="9" y="20" width="4" height="4"/>
      <rect x="13" y="20" width="4" height="4"/><rect x="13" y="16" width="4" height="4"/><rect x="13" y="12" width="4" height="4"/><rect x="17" y="12" width="4" height="4"/>
      <rect x="21" y="12" width="4" height="4"/><rect x="24" y="6" width="3" height="3"/></g>`),
    power: svg(`<rect x="5" y="5" width="22" height="22" fill="#b8322a"/><path d="M11 12 a7 7 0 1 0 10 0" fill="none" stroke="#fff" stroke-width="3"/><rect x="14.5" y="8" width="3" height="9" fill="#fff"/>`),
    min: `<svg viewBox="0 0 8 8" aria-hidden="true"><rect x="1" y="6" width="6" height="2" fill="currentColor"/></svg>`,
    max: `<svg viewBox="0 0 8 8" aria-hidden="true"><rect x=".5" y=".5" width="7" height="7" fill="none" stroke="currentColor"/><rect x="0" y="0" width="8" height="2" fill="currentColor"/></svg>`,
    close: `<svg viewBox="0 0 8 8" aria-hidden="true"><path d="M1 1 L7 7 M7 1 L1 7" stroke="currentColor" stroke-width="1.6"/></svg>`,
  };

  // ---- apps ----
  const APPS = {
    who: { title: "whoami — Обо мне", label: "Обо мне", icon: ICON.who, w: 600, h: 440, menu: false, render: renderWho },
    files: { title: "Файлы", label: "Файлы", icon: ICON.folder, w: 760, h: 540, render: renderFiles },
    mail: { title: "Почта — Входящие", label: "Почта", icon: ICON.mail, w: 700, h: 460, render: renderMail },
    browser: { title: "Сёрфер 4.0", label: "Интернет", icon: ICON.globe, w: 780, h: 540, render: renderBrowser },
    games: { title: "Игры", label: "Игры", icon: ICON.games, w: 320, h: 200, render: renderGames },
    mines: { title: "Сапёр", label: "Сапёр", icon: ICON.mine, w: 250, h: 340, menu: false, auto: true, render: renderMines },
    snake: { title: "Змейка", label: "Змейка", icon: ICON.snake, w: 340, h: 500, menu: false, auto: true, render: renderSnake },
    trash: { title: "Корзина", label: "Корзина", icon: ICON.trash, w: 360, h: 190, render: renderTrash },
  };
  const DESKTOP = ["who", "files", "mail", "browser", "games", "trash"];

  const os = $("#os"), desk = $("#osDesk"), area = $("#osArea"), bootEl = $("#osBoot");
  const tasks = $("#osTasks"), menu = $("#osMenu"), startBtn = $("#osStart");
  const wins = new Map();   // id -> { el, task, app }
  let z = 10, cascade = 0;

  // ---- animated wallpaper: brushed graphite with metal dust (raw WebGL) ----
  const wall = (() => {
    const canvas = $("#osWall");
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    let raf = 0, t0 = performance.now(), uRes, uT, fallback = !gl;
    if (gl) {
      const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
      const fs = `precision mediump float;
        uniform vec2 res; uniform float t;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vnoise(vec2 p){
          vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f);
          return mix(mix(hash(i), hash(i + vec2(1.,0.)), f.x), mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
        }
        float field(vec2 p){                       // slow liquid-metal swell
          float h = sin(p.x*3.2 + t*.25 + sin(p.y*2.1 + t*.17)*1.4)*.35;
          h += sin(p.y*4.3 - t*.3 + sin(p.x*2.6 - t*.13)*1.2)*.25;
          return h;
        }
        void main(){
          vec2 uv = gl_FragCoord.xy / res;
          vec2 p = (gl_FragCoord.xy - .5*res) / res.y;
          float e = 1.5 / res.y;
          float h = field(p);
          vec3 n = normalize(vec3(field(p - vec2(e,0.)) - field(p + vec2(e,0.)), field(p - vec2(0.,e)) - field(p + vec2(0.,e)), e*14.));
          vec2 q = p + n.xy*.03;                   // the swell bends the brushed grain
          float brush = vnoise(vec2(q.x*2.5, q.y*420.))*.6 + vnoise(vec2(q.x*8., q.y*1300.))*.4;
          vec3 col = mix(vec3(.085,.087,.092), vec3(.165,.167,.172), brush);
          float sheen = exp(-pow((q.y - .18 + n.y*.25)*2.6, 2.));          // anisotropic band of light
          col += vec3(.16) * sheen * (.6 + .4*brush);
          vec3 L = normalize(vec3(-.3, .5, .8));
          float spec = pow(max(dot(reflect(-L, n), vec3(0.,0.,1.)), 0.), 30.);
          col += vec3(.75) * spec * .22;
          vec2 cell = floor(gl_FragCoord.xy / 2.);                           // metal dust specks
          float r = hash(cell);
          float tw = sin(t*1.3 + r*60. + h*5.)*.5 + .5;
          col += vec3(.9) * step(.988, r) * pow(tw, 6.) * (.35 + spec*2. + sheen*.6);
          col += vec3(.04) * step(.97, r);
          col *= .94 + .06*sin(gl_FragCoord.y*3.14159);
          col *= 1. - .45*pow(length(uv - .5), 1.5);
          gl_FragColor = vec4(col, 1.);
        }`;
      const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
      const prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) fallback = true;
      else {
        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        uRes = gl.getUniformLocation(prog, "res"); uT = gl.getUniformLocation(prog, "t");
      }
    }
    if (fallback) canvas.style.background = "radial-gradient(ellipse at 50% 30%, #2a2b2e, #111214 70%)";
    const SCALE = 0.6;   // render under-resolution: softer, cheaper, more 2003
    function size() {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE)), h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    }
    function draw() {
      if (fallback) return;
      size();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, reduceMotion ? 12 : (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    const hiddenByWindow = () => !!area.querySelector(".win.max:not([hidden])");
    const minGap = matchMedia("(hover: none)").matches ? 33 : 0;
    let last = 0;
    function loop(now = 0) {
      if (now - last >= minGap && !hiddenByWindow()) { draw(); last = now; }
      raf = reduceMotion ? 0 : requestAnimationFrame(loop);
    }
    return {
      canvas,
      start() { if (!raf) loop(); },
      stop() { cancelAnimationFrame(raf); raf = 0; },
    };
  })();

  // desktop icons
  $("#osIcons").innerHTML = DESKTOP.map(id =>
    `<button class="os-icon" data-app="${id}">${APPS[id].icon}<span>${APPS[id].label}</span></button>`).join("");
  bindIcons($("#osIcons"), id => openApp(id));

  // start menu
  menu.innerHTML = `<div class="side">${esc(OS.name)}</div>` +
    DESKTOP.filter(id => id !== "trash").map(id => `<button role="menuitem" data-app="${id}">${APPS[id].icon}${APPS[id].label}</button>`).join("") +
    `<hr><button role="menuitem" data-act="about">${ICON.info}О системе</button>` +
    `<button role="menuitem" data-act="exit">${ICON.power}Встать из-за компа</button>`;
  startBtn.addEventListener("click", e => { e.stopPropagation(); toggleMenu(); });
  menu.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    toggleMenu(false);
    if (b.dataset.app) openApp(b.dataset.app);
    else if (b.dataset.act === "about") openDialog("sys", "О системе", ICON.info,
      `<p><b>${esc(OS.name)} 2.4.22</b><br>Ядро собрано вручную, X11R6, оконный менеджер ${esc(OS.wm)}.</p><p>256 МБ ОЗУ, из них 200 занимает этот сайт.</p>`);
    else if (b.dataset.act === "exit") exit();
  });
  document.addEventListener("click", e => { if (!menu.hidden && !menu.contains(e.target)) toggleMenu(false); });
  function toggleMenu(force) {
    const open = force ?? menu.hidden;
    menu.hidden = !open; startBtn.classList.toggle("on", open);
    startBtn.setAttribute("aria-expanded", String(open));
  }

  // click to select, double-click (or tap on touch) to open
  function bindIcons(root, open) {
    root.addEventListener("click", e => {
      const b = e.target.closest(".os-icon"); if (!b) return;
      root.querySelectorAll(".os-icon.sel").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
      if (touchUI || e.detail === 0) open(b.dataset.app);   // detail 0 = keyboard Enter/Space
    });
    root.addEventListener("dblclick", e => { const b = e.target.closest(".os-icon"); if (b) open(b.dataset.app); });
  }
  area.addEventListener("pointerdown", e => {
    if (e.target === area || e.target === wall.canvas) area.querySelectorAll(".os-icon.sel").forEach(x => x.classList.remove("sel"));
  });

  // ---- window manager ----
  function openApp(id) {
    if (wins.has(id)) { const w = wins.get(id); w.el.hidden = false; focus(id); return w; }
    const app = APPS[id];
    const rec = createWindow(id, app.title, app.icon, app.w, app.h, app.render, app.menu !== false);
    if (app.auto && !small()) { rec.el.style.width = "auto"; rec.el.style.height = "auto"; }
    return rec;
  }
  function createWindow(id, title, icon, w, h, render, withMenu) {
    const el = document.createElement("section");
    el.className = "win";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", title);
    el.innerHTML = `
      <header class="win-bar">${icon}<span class="win-title">${esc(title)}</span>
        <div class="win-btns">
          <button data-act="min" aria-label="Свернуть">${ICON.min}</button>
          <button data-act="max" aria-label="Развернуть">${ICON.max}</button>
          <button data-act="close" aria-label="Закрыть">${ICON.close}</button>
        </div></header>
      ${withMenu ? `<nav class="win-menu"><span>Файл</span><span>Правка</span><span>Вид</span><span>Справка</span></nav>` : ""}
      <div class="win-body"></div>
      <footer class="win-status"><span></span><span></span></footer>`;
    const A = area.getBoundingClientRect();
    const W = Math.min(w, A.width - 16), H = Math.min(h, A.height - 16);
    const x = Math.max(8, Math.min(A.width - W - 8, (A.width - W) / 2 + (cascade % 5) * 26 - 52));
    const y = Math.max(8, Math.min(A.height - H - 8, (A.height - H) / 2 + (cascade % 5) * 22 - 44));
    cascade++;
    Object.assign(el.style, { left: x + "px", top: y + "px", width: W + "px", height: H + "px" });
    if (small()) { el.classList.add("max"); el.dataset.automax = "1"; }
    area.appendChild(el);

    const task = document.createElement("button");
    task.className = "btn";
    task.innerHTML = `${icon}<span>${esc(title.split(" — ")[0])}</span>`;
    task.addEventListener("click", () => {
      const active = el.classList.contains("active") && !el.hidden;
      if (active) minimize(id); else { el.hidden = false; focus(id); }
    });
    tasks.appendChild(task);

    const rec = { el, task, body: $(".win-body", el), status: $(".win-status", el) };
    wins.set(id, rec);
    el.addEventListener("pointerdown", () => focus(id));
    $(".win-btns", el).addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.act === "close") close(id);
      if (b.dataset.act === "min") minimize(id);
      if (b.dataset.act === "max" && !small()) el.classList.toggle("max");
    });
    $(".win-bar", el).addEventListener("dblclick", e => { if (!e.target.closest("button") && !small()) el.classList.toggle("max"); });
    makeDraggable(el);
    render(rec);
    focus(id);
    return rec;
  }
  // keep windows usable when the screen rotates or the browser is resized
  addEventListener("resize", () => {
    if (os.hidden) return;
    const A = area.getBoundingClientRect();
    wins.forEach(w => {
      const el = w.el;
      if (el.classList.contains("dlg-win")) {
        el.style.width = Math.min(380, A.width - 16) + "px";
      } else if (small()) {
        if (!el.classList.contains("max")) { el.classList.add("max"); el.dataset.automax = "1"; }
        return;
      } else if (el.dataset.automax) {
        el.classList.remove("max"); delete el.dataset.automax;
      }
      if (el.classList.contains("max")) return;
      if (el.style.width !== "auto") el.style.width = Math.min(parseFloat(el.style.width) || el.offsetWidth, A.width - 16) + "px";
      if (el.style.height !== "auto") el.style.height = Math.min(parseFloat(el.style.height) || el.offsetHeight, A.height - 16) + "px";
      el.style.left = Math.max(8, Math.min(el.offsetLeft, A.width - el.offsetWidth - 8)) + "px";
      el.style.top = Math.max(0, Math.min(el.offsetTop, A.height - el.offsetHeight - 8)) + "px";
    });
  });

  function focus(id) {
    wins.forEach((w, k) => { w.el.classList.toggle("active", k === id); w.task.classList.toggle("on", k === id); });
    const w = wins.get(id); if (w) w.el.style.zIndex = ++z;
  }
  function minimize(id) {
    const w = wins.get(id); w.el.hidden = true; w.el.classList.remove("active"); w.task.classList.remove("on");
  }
  function close(id) {
    const w = wins.get(id); if (!w) return;
    if (w.onClose) w.onClose();
    w.el.remove(); w.task.remove(); wins.delete(id);
  }
  function makeDraggable(el) {
    const bar = $(".win-bar", el);
    let sx, sy, ox, oy, dragging = false;
    bar.addEventListener("pointerdown", e => {
      if (e.target.closest("button") || el.classList.contains("max") || e.button !== 0) return;
      dragging = true; bar.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
    });
    bar.addEventListener("pointermove", e => {
      if (!dragging) return;
      const A = area.getBoundingClientRect();
      const nx = Math.max(80 - el.offsetWidth, Math.min(A.width - 80, ox + e.clientX - sx));
      const ny = Math.max(0, Math.min(A.height - 24, oy + e.clientY - sy));
      el.style.left = nx + "px"; el.style.top = ny + "px";
    });
    const stop = () => { dragging = false; };
    bar.addEventListener("pointerup", stop); bar.addEventListener("pointercancel", stop);
  }
  function status(rec, left, right = "") {
    const s = rec.status.children; s[0].textContent = left; s[1].textContent = right;
  }
  function openDialog(id, title, icon, html) {
    close(id);
    const rec = createWindow(id, title, icon, 380, 200, r => {
      r.body.innerHTML = `<div class="dlg">${icon}<div>${html}</div><div class="acts"><button class="btn primary" data-ok>OK</button></div></div>`;
      r.status.remove();
      $("[data-ok]", r.body).addEventListener("click", () => close(id));
    }, false);
    rec.el.style.height = "auto";
    rec.el.classList.remove("max"); rec.el.classList.add("dlg-win");
    setTimeout(() => { const b = $("[data-ok]", rec.body); b && b.focus(); }, 30);
    return rec;
  }

  // ---- app: whoami ----
  function renderWho(rec) {
    const bars = ME.skills.map(([n, v]) =>
      `<li><span>${esc(n)}</span><span class="bar">[${"#".repeat(v)}${"·".repeat(10 - v)}]</span></li>`).join("");
    rec.body.innerHTML = `<div class="who">
      <pre aria-hidden="true">  .-"""-.
 /  o o  \\
|    ^    |
 \\  '-'  /
  '-...-'</pre>
      <div class="who-main">
        <div class="p">${esc(ME.login)}@${esc(OS.host)}:~$ <b>whoami</b></div>
        <h2>${esc(ME.name)}</h2>
        <p class="role">${esc(ME.role)}${ME.city ? " · " + esc(ME.city) : ""}</p>
        ${ME.about.map(p => `<p>${esc(p)}</p>`).join("")}
        <div class="p">${esc(ME.login)}@${esc(OS.host)}:~$ <b>cat ~/.skills</b></div>
        <ul>${bars}</ul>
        <div class="p">${esc(ME.login)}@${esc(OS.host)}:~$ <b class="cur"></b></div>
      </div></div>`;
    status(rec, "/home/" + ME.login, "tty1");
  }

  // ---- app: files ----
  function renderFiles(rec) {
    let cur = null;          // null = portfolio root, otherwise a project index
    const hist = [];
    const root = `/home/${ME.login}/portfolio`;
    rec.body.innerHTML = `<div class="fm">
      <div class="fm-tools">
        <button class="btn" data-nav="back" aria-label="Назад">◄ Назад</button>
        <button class="btn" data-nav="up" aria-label="Вверх">▲ Вверх</button>
        <div class="fm-path sunken"></div>
      </div>
      <div class="fm-main">
        <div class="fm-tree sunken"></div>
        <div class="fm-view sunken"></div>
      </div></div>`;
    const view = $(".fm-view", rec.body), tree = $(".fm-tree", rec.body), path = $(".fm-path", rec.body);
    const backBtn = $("[data-nav=back]", rec.body), upBtn = $("[data-nav=up]", rec.body);
    backBtn.addEventListener("click", () => { if (hist.length) go(hist.pop(), false); });
    upBtn.addEventListener("click", () => { if (cur !== null) go(null); });
    tree.addEventListener("click", e => {
      const b = e.target.closest("[data-go]"); if (!b) return;
      go(b.dataset.go === "" ? null : +b.dataset.go);
    });

    function go(to, push = true) {
      if (push && to !== cur) hist.push(cur);
      cur = to; draw();
    }
    function draw() {
      const p = cur === null ? null : PROJECTS[cur];
      path.textContent = p ? `${root}/${p.dir}` : root;
      backBtn.disabled = !hist.length; upBtn.disabled = cur === null;
      $(".win-title", rec.el).textContent = `Файлы — ${p ? p.dir : "portfolio"}`;
      tree.innerHTML =
        `<button class="d0">${ICON.folder}/</button><button class="d1">${ICON.folder}home</button>` +
        `<button class="d2">${ICON.folder}${esc(ME.login)}</button>` +
        `<button class="d2 ${cur === null ? "cur" : ""}" data-go="" style="padding-left:34px">${ICON.folder}portfolio</button>` +
        PROJECTS.map((x, i) => `<button class="${cur === i ? "cur" : ""}" data-go="${i}" style="padding-left:46px">${ICON.folder}${esc(x.dir)}</button>`).join("");
      if (!p) {
        view.innerHTML = `<div class="fm-grid">${PROJECTS.map((x, i) =>
          `<button class="os-icon" data-app="${i}">${ICON.folder}<span>${esc(x.dir)}</span></button>`).join("")}</div>`;
        bindIcons($(".fm-grid", view), i => go(+i));
        status(rec, `${PROJECTS.length} объекта`, touchUI ? "Нажми на папку" : "Двойной клик — открыть");
      } else {
        const host = p.url.replace(/^https?:\/\//, "");
        view.innerHTML = `<div class="proj">
          <div class="shot${p.shot ? " " + p.shot.theme : ""}" style="--h:${p.hue || 0}">
            <div class="shot-bar"><i></i><i></i><i></i><span>${esc(host)}</span></div>
            <div class="shot-body">${p.shot
              ? `<small>${esc(p.shot.tagline)}</small><b>${esc(p.title)}</b><em>${esc(p.shot.cta)}</em>`
              : `<b>${esc(p.title)}</b><s></s><s></s>`}</div>
          </div>
          <h3>${esc(p.title)}</h3>
          <dl><dt>Год</dt><dd>${esc(p.year)}</dd><dt>Роль</dt><dd>${esc(p.role)}</dd>
            ${p.stack.length ? `<dt>Стек</dt><dd>${p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</dd>` : ""}</dl>
          <p>${esc(p.desc)}</p>
          ${p.points ? `<ul class="proj-points">${p.points.map(pt => `<li>${Array.isArray(pt) ? `<b>${esc(pt[0])}</b> ${esc(pt[1])}` : esc(pt)}</li>`).join("")}</ul>` : ""}
          <div class="acts"><a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Открыть сайт ↗</a></div>
        </div>`;
        status(rec, `README.txt · screenshot.png · site.url`, p.year);
      }
      view.scrollTop = 0;
    }
    draw();
  }

  // ---- app: mail ----
  function renderMail(rec) {
    const tg = CONTACTS.telegram, me = OS.name;
    rec.body.innerHTML = `<div class="mail">
      <div class="mail-tools"><a class="btn" href="https://t.me/${esc(tg)}" target="_blank" rel="noopener noreferrer">✎ Написать в Telegram</a></div>
      <div class="mail-folders sunken">
        <div class="cur"><span>Входящие</span><span>1</span></div>
        <div><span>Отправленные</span></div><div><span>Черновики</span></div><div><span>Спам</span><span>999</span></div>
      </div>
      <div class="mail-right">
        <div class="mail-list sunken"><table>
          <thead><tr><th>От</th><th>Тема</th><th>Дата</th></tr></thead>
          <tbody><tr class="cur unread"><td>${esc(me)}</td><td>Как со мной связаться</td><td>18.10.2003</td></tr></tbody>
        </table></div>
        <div class="mail-msg sunken">
          <dl class="mail-head"><dt>От:</dt><dd>${esc(me)}</dd><dt>Тема:</dt><dd>Как со мной связаться</dd></dl>
          <div class="mail-text">
            <p>Привет! Если есть проект, вопрос или просто хочешь поболтать, пиши в Telegram. Отвечаю там быстрее всего.</p>
            <dl class="contacts">
              <div class="contact"><dt>Telegram</dt><dd><a href="https://t.me/${esc(tg)}" target="_blank" rel="noopener noreferrer">@${esc(tg)}</a></dd><button class="btn" data-copy="@${esc(tg)}">Копировать</button></div>
              <div class="contact"><dt>Почта</dt><dd class="nomail">Ещё не завёл. Почтовый голубь улетел в 2003 году и до сих пор не вернулся.</dd><span></span></div>
            </dl>
            <p>— ${esc(me)}</p>
          </div>
        </div>
      </div></div>`;
    rec.body.addEventListener("click", e => {
      const c = e.target.closest("[data-copy]");
      if (c) copy(c.dataset.copy, c, rec);
    });
    status(rec, "1 письмо, 1 непрочитанное", "Онлайн");
  }
  function copy(text, btn, rec) {
    const done = () => { btn.textContent = "Скопировано"; setTimeout(() => (btn.textContent = "Копировать"), 1500); status(rec, "Скопировано: " + text, "Онлайн"); };
    const fallback = () => {
      const dd = btn.previousElementSibling, r = document.createRange();
      r.selectNodeContents(dd); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      status(rec, "Текст выделен, нажми Ctrl+C", "Онлайн");
    };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (err) { fallback(); }
  }
  function renderTrash(rec) {
    rec.body.innerHTML = `<div class="dlg paper" style="height:100%">${ICON.trash}<div><p>Корзина пуста.</p><p>Здесь лежали неудачные идеи, но я их уже удалил.</p></div></div>`;
    status(rec, "0 объектов", "");
  }

  // ---- app: browser (the web of 2003, all fictional sites) ----
  const HOME = "http://www.inv1zel.net/";
  const BOOKMARKS = [["Моя страница", HOME], ["Гостевая", "http://www.inv1zel.net/guestbook"], ["Барсик", "http://home.inv1zel.net/~barsik/"], ["Ссылки", "http://www.inv1zel.net/links"]];
  let prizeShown = false;

  function normalize(u) {
    u = String(u || "").trim();
    if (!u) return HOME;
    if (/^about:/i.test(u)) return u.toLowerCase();
    if (!/^[a-z]+:\/\//i.test(u)) u = "http://" + u;
    try { const x = new URL(u); return x.protocol + "//" + x.host + x.pathname + x.search; } catch (err) { return u; }
  }
  function resolve(url) {
    if (url === "about:blank") return { title: "Пустая страница", html: "" };
    let x; try { x = new URL(url); } catch (err) { return pageError(url); }
    const host = x.host, path = x.pathname.replace(/\/+$/, "") || "/";
    if (host === "www.inv1zel.net" || host === "inv1zel.net") {
      if (path === "/") return pageHome();
      if (path === "/guestbook") return pageGuestbook();
      if (path === "/search") return pageSearch(x.searchParams.get("q") || "");
      if (path === "/links") return pageLinks();
    }
    if (host === "home.inv1zel.net" && path.startsWith("/~barsik")) return pageCat();
    return pageError(host);
  }

  function pageHome() {
    return {
      title: "inv1zel.net — Главная",
      html: `<div class="w-marq"><span>*** Добро пожаловать на inv1zel.net! *** Сайт обновлён 18.10.2003 *** Добавь нас в Избранное: Ctrl+D *** Не забудь расписаться в гостевой книге! ***</span></div>
      <div class="w-cols">
        <nav class="w-nav"><b>МЕНЮ</b>
          <a data-href="${HOME}">» Главная</a>
          <a data-app="files">» Портфолио</a>
          <a data-app="who">» Обо мне</a>
          <a data-href="http://www.inv1zel.net/guestbook">» Гостевая книга</a>
          <a data-href="http://home.inv1zel.net/~barsik/">» Страница Барсика</a>
          <a data-app="games">» Игры</a>
          <a data-href="http://www.inv1zel.net/links">» Ссылки</a>
        </nav>
        <div class="w-main">
          <h1 class="w-logo">inv1zel.net</h1>
          <p><i>Мой уголок в Интернете.</i> <span class="w-blink">NEW!</span></p>
          <form class="w-search" data-search><input name="q" aria-label="Поиск" placeholder="Искать в Интернете…"><button class="btn">Найти!</button></form>
          <h2>Новости</h2>
          <dl class="w-news">
            <dt>18.10.2003</dt><dd>Сайт переехал на новый хостинг! Теперь у меня целых 5 МБ места.</dd>
            <dt>02.10.2003</dt><dd>Добавил раздел <a data-app="files">«Портфолио»</a>. Там три проекта, заходите.</dd>
            <dt>14.09.2003</dt><dd>Купил модем на 56 кбит/с. Страницы теперь грузятся всего за минуту.</dd>
            <dt>01.09.2003</dt><dd>Учёные обещают, что к 2010 году у каждого будет гигабайт памяти. Не верю.</dd>
          </dl>
          <div class="w-uc"><span>РАЗДЕЛ «ВИДЕО» В РАЗРАБОТКЕ</span></div>
          <p>Вы посетитель № <span class="w-counter" data-counter></span></p>
          <div class="w-badges"><span class="w-badge">Лучше всего смотреть в 800×600</span><span class="w-badge">Сделано в Блокноте</span>
            <span class="w-badge">Оптимизировано под Сёрфер 4.0</span><span class="w-badge">Без рекламы*</span></div>
          <p><small>* почти</small></p>
        </div>
      </div>`,
      mount(root, nav) {
        $("[data-search]", root).addEventListener("submit", e => {
          e.preventDefault();
          nav("http://www.inv1zel.net/search?q=" + encodeURIComponent(e.target.q.value));
        });
        const cnt = $("[data-counter]", root);
        let n = 13370 + Math.floor(Math.random() * 400);
        const show = () => { cnt.innerHTML = String(n).padStart(7, "0").split("").map(d => `<b>${d}</b>`).join(""); };
        show();
        const iv = setInterval(() => { if (Math.random() < 0.3) { n++; show(); } }, 2500);
        return () => clearInterval(iv);
      },
    };
  }

  function pageSearch(q) {
    const t = esc(q.trim());
    const slug = encodeURIComponent(q.trim().toLowerCase().replace(/\s+/g, "-")).slice(0, 24) || "vse";
    return {
      title: `Поиск: ${q || "пусто"}`,
      html: `<div class="w-results">
        <h2 class="w-logo" style="font-size:28px">inv1zel-поиск</h2>
        <form class="w-search" data-search><input name="q" aria-label="Поиск" value="${t}"><button class="btn">Найти!</button></form>
        ${t ? `<p>Найдено примерно 4 результата за 3,7 секунды (модем же).</p>
        <div class="hit"><a data-href="http://www.free-${slug}.inv/download.exe">${t} — скачать бесплатно, без регистрации и SMS</a><small>www.free-${slug}.inv/download.exe · 700 КБ</small></div>
        <div class="hit"><a data-href="http://referaty.inv/${slug}">Реферат на тему «${t}». Оценка «5»!</a><small>referaty.inv · Скачано 31 337 раз</small></div>
        <div class="hit"><a data-href="http://forum.inv/topic/1337">ПОМОГИТЕ!!! не работает ${t}, что делать???</a><small>forum.inv · 214 ответов · последний: «тоже интересует»</small></div>
        <div class="hit"><a data-app="files">Портфолио inv1zel — лучшие сайты 2003 года</a><small>www.inv1zel.net/portfolio · Рекомендуем!</small></div>`
        : `<p>Введите что-нибудь в строку поиска. Например, «как сделать сайт».</p>`}
      </div>`,
      mount(root, nav) {
        $("[data-search]", root).addEventListener("submit", e => {
          e.preventDefault();
          nav("http://www.inv1zel.net/search?q=" + encodeURIComponent(e.target.q.value));
        });
      },
    };
  }

  function pageLinks() {
    return {
      title: "Ссылки — в разработке",
      html: `<div class="w-err" style="max-width:none;text-align:center">
        <div class="w-uc"><span>UNDER CONSTRUCTION</span></div>
        <h2>Ссылки на сайты друзей</h2>
        <p>Здесь скоро появятся сайты друзей. Пока что друзей нет, но я над этим работаю.</p>
        <p><a data-href="http://ring.inv/prev">« пред.</a> | <b>Кольцо сайтов про компьютеры</b> | <a data-href="http://ring.inv/next">след. »</a></p>
        <div class="w-uc"><span>UNDER CONSTRUCTION</span></div>
      </div>`,
    };
  }

  function pageError(host) {
    return {
      title: "Не удаётся найти сервер",
      html: `<div class="w-err">
        <h2>Не удаётся найти сервер</h2>
        <p>Сёрфер не может открыть страницу <b>${esc(host)}</b>.</p>
        <p>Попробуйте следующее:</p>
        <ul>
          <li>Проверьте, правильно ли набран адрес.</li>
          <li>Убедитесь, что модем подключён, а мама не разговаривает по телефону.</li>
          <li>Подождите до 23:00: ночью Интернет дешевле.</li>
          <li>Вернитесь на <a data-href="${HOME}">домашнюю страницу</a>.</li>
        </ul>
        <hr><small>Ошибка 404. Возможно, этот сайт ещё не придумали.</small>
      </div>`,
    };
  }

  function pageCat() {
    const frames = [
      String.raw`  /\_/\
 ( o.o )
 /> ^ <\
  /   \ `,
      String.raw`  /\_/\
 ( ^.^ )
 \> ^ </
  \   / `,
      String.raw`   /\_/\
  ( -.- )
  /> ^ <\
   |   | `,
    ];
    return {
      title: "Страница Барсика!!!",
      html: `<div class="w-cat">
        <h1>ДОБРО ПОЖАЛОВАТЬ НА СТРАНИЦУ БАРСИКА!!!</h1>
        <pre data-cat></pre>
        <p>Мне 4 года. Я люблю спать на мониторе, потому что он тёплый.</p>
        <p>Мои увлечения: ловить курсор, спать и нажимать на клавиатуру хвостом.</p>
        <p><button class="btn" data-music>▶ Включить музыку (korobeiniki.mid)</button></p>
        <p class="w-blink" style="color:#0f0">Подпишись на мою рассылку!!!</p>
        <p>Мяу: <span class="w-counter"><b>0</b><b>0</b><b>0</b><b>0</b><b>4</b><b>2</b></span></p>
        <p><a data-href="${HOME}">« Назад к хозяину</a></p>
      </div>`,
      mount(root) {
        const pre = $("[data-cat]", root);
        let f = 0; pre.textContent = frames[0];
        const iv = reduceMotion ? 0 : setInterval(() => { f = (f + 1) % frames.length; pre.textContent = frames[f]; }, 380);
        let ac = null;
        const btn = $("[data-music]", root);
        const stop = () => { if (ac) { ac.close(); ac = null; } btn.textContent = "▶ Включить музыку (korobeiniki.mid)"; };
        btn.addEventListener("click", () => {
          if (ac) return stop();
          try {
            ac = new (window.AudioContext || window.webkitAudioContext)();
            const E5 = 659.25, B4 = 493.88, C5 = 523.25, D5 = 587.33, A4 = 440;
            const tune = [[E5,1],[B4,.5],[C5,.5],[D5,1],[C5,.5],[B4,.5],[A4,1],[A4,.5],[C5,.5],[E5,1],[D5,.5],[C5,.5],[B4,1.5],[C5,.5],[D5,1],[E5,1],[C5,1],[A4,1],[A4,2]];
            let t = ac.currentTime + 0.05;
            const beat = 0.24;
            for (let rep = 0; rep < 2; rep++) for (const [f0, d] of tune) {
              const o = ac.createOscillator(), g = ac.createGain();
              o.type = "square"; o.frequency.value = f0;
              g.gain.setValueAtTime(0.045, t); g.gain.setValueAtTime(0, t + d * beat * 0.9);
              o.connect(g).connect(ac.destination); o.start(t); o.stop(t + d * beat);
              t += d * beat;
            }
            btn.textContent = "■ Выключить музыку";
          } catch (err) { btn.textContent = "Звуковая карта не найдена"; }
        });
        return () => { clearInterval(iv); stop(); };
      },
    };
  }

  const GB_SEED = [
    { name: "Админ", text: "Сайт открыт! Пишите свои пожелания.", date: "01.09.2003" },
    { name: "Вася_2003", text: "Классный сайт!!! Заходи ко мне: www.vasya-krutoi.inv", date: "03.09.2003" },
    { name: "Аноним", text: "а где скачать сапёра?", date: "12.10.2003" },
    { name: "Админ", text: "Сапёр лежит в папке «Игры» на рабочем столе :)", date: "12.10.2003" },
  ];
  function pageGuestbook() {
    return {
      title: "Гостевая книга",
      html: `<div class="w-gb">
        <h1>Гостевая книга</h1>
        <p>Оставь запись, мне будет приятно!</p>
        <form data-gb>
          <input name="name" maxlength="30" placeholder="Имя" aria-label="Имя" required>
          <textarea name="text" maxlength="300" rows="3" placeholder="Сообщение" aria-label="Сообщение" required></textarea>
          <div><button class="btn">Добавить запись</button></div>
          <small>Записи видишь только ты: они сохраняются в твоём браузере.</small>
        </form>
        <div data-entries></div>
        <p><a data-href="${HOME}">« На главную</a></p>
      </div>`,
      mount(root) {
        const KEY = "inv1zel-guestbook";
        let mine = [];
        try { mine = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (err) { mine = []; }
        if (!Array.isArray(mine)) mine = [];
        mine = mine.filter(e => e && typeof e === "object").slice(0, 50)
          .map(e => ({ name: String(e.name || "Аноним").slice(0, 30), text: String(e.text || "").slice(0, 300), date: String(e.date || "").slice(0, 10) }));
        const list = $("[data-entries]", root);
        const draw = () => {
          list.innerHTML = [...mine, ...GB_SEED.slice().reverse()].map(e =>
            `<article><b>${esc(e.name)}</b> <small>${esc(e.date)}</small><br>${esc(e.text)}</article>`).join("");
        };
        draw();
        $("[data-gb]", root).addEventListener("submit", e => {
          e.preventDefault();
          const f = e.target, d = new Date();
          mine.unshift({ name: f.name.value.trim() || "Аноним", text: f.text.value.trim(),
            date: `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.2003` });
          try { localStorage.setItem(KEY, JSON.stringify(mine.slice(0, 50))); } catch (err) { /* stays in memory */ }
          f.reset(); draw();
        });
      },
    };
  }

  function renderBrowser(rec) {
    rec.body.innerHTML = `<div class="br">
      <div class="br-tools">
        <button class="btn" data-b="back">◄ Назад</button>
        <button class="btn" data-b="fwd">Вперёд ►</button>
        <button class="btn" data-b="reload">↻ Обновить</button>
        <button class="btn" data-b="home">⌂ Домой</button>
        <div class="br-throb bv-in" aria-hidden="true"><i></i></div>
      </div>
      <form class="br-addr"><label for="brAddr">Адрес:</label><input id="brAddr" spellcheck="false" autocomplete="off"><button class="btn">Переход</button></form>
      <div class="br-marks"><span>Закладки:</span>${BOOKMARKS.map(([n, u]) => `<button data-mark="${esc(u)}">${esc(n)}</button>`).join("")}</div>
      <div class="br-view sunken"></div>
    </div>`;
    const view = $(".br-view", rec.body), addr = $("#brAddr", rec.body), throb = $(".br-throb", rec.body);
    const B = k => $(`[data-b=${k}]`, rec.body);
    const back = [], fwd = [];
    let cur = null, cleanup = null, loadT = 0, doneT = 0;

    function go(url, mode = "push") {
      url = normalize(url);
      if (mode === "push" && cur && url !== cur) { back.push(cur); fwd.length = 0; }
      cur = url;
      try { addr.value = decodeURI(url); } catch (err) { addr.value = url; }
      B("back").disabled = !back.length; B("fwd").disabled = !fwd.length;
      if (cleanup) { cleanup(); cleanup = null; }
      clearTimeout(loadT); clearTimeout(doneT);
      throb.classList.add("busy"); view.classList.remove("loading");
      view.innerHTML = "";
      const host = url.replace(/^[a-z]+:\/\//i, "").split("/")[0];
      status(rec, `Соединение с ${host}…`, "28,8 кбит/с");
      loadT = setTimeout(() => {
        const page = resolve(url);
        view.innerHTML = `<div class="web">${page.html}</div>`;
        view.scrollTop = 0;
        void view.offsetWidth; view.classList.add("loading");
        $(".win-title", rec.el).textContent = `${page.title} — Сёрфер 4.0`;
        status(rec, `Загрузка: ${host}…`, "28,8 кбит/с");
        cleanup = page.mount ? page.mount(view.firstElementChild, u => go(u)) || null : null;
        doneT = setTimeout(() => { throb.classList.remove("busy"); status(rec, "Готово", "Интернет"); }, reduceMotion ? 0 : 1000);
      }, reduceMotion ? 0 : 450 + Math.random() * 450);
    }

    B("back").addEventListener("click", () => { if (back.length) { fwd.push(cur); go(back.pop(), "hist"); } });
    B("fwd").addEventListener("click", () => { if (fwd.length) { back.push(cur); go(fwd.pop(), "hist"); } });
    B("reload").addEventListener("click", () => go(cur, "hist"));
    B("home").addEventListener("click", () => go(HOME));
    $(".br-addr", rec.body).addEventListener("submit", e => { e.preventDefault(); go(addr.value); });
    $(".br-marks", rec.body).addEventListener("click", e => { const b = e.target.closest("[data-mark]"); if (b) go(b.dataset.mark); });
    view.addEventListener("click", e => {
      const a = e.target.closest("[data-href], [data-app]"); if (!a) return;
      e.preventDefault();
      if (a.dataset.app) openApp(a.dataset.app); else go(a.dataset.href);
    });

    const prizeT = prizeShown ? 0 : setTimeout(() => { if (wins.has("browser")) { prizeShown = true; prizePopup(); } }, 8000);
    rec.onClose = () => { clearTimeout(loadT); clearTimeout(doneT); clearTimeout(prizeT); if (cleanup) cleanup(); };
    go(HOME);
  }

  function prizePopup() {
    const rec = createWindow("prize", "ВНИМАНИЕ!!! Вы выиграли!", ICON.info, 340, 220, r => {
      r.body.innerHTML = `<div class="prize"><b class="w-blink">ПОЗДРАВЛЯЕМ!!!</b>
        <p data-prize-text>Вы 1 000 000-й посетитель!<br>Нажмите кнопку, чтобы забрать приз.</p>
        <button class="btn primary" data-prize>Забрать приз</button></div>`;
      r.status.remove();
      const b = $("[data-prize]", r.body);
      let dodges = 0, claimed = false;
      if (!touchUI) b.addEventListener("pointerenter", () => {
        if (claimed || dodges >= 3) return;
        dodges++;
        b.style.transform = `translate(${(Math.random() < .5 ? -1 : 1) * (50 + Math.random() * 60)}px, ${(Math.random() * 2 - 1) * 24}px)`;
      });
      b.addEventListener("click", () => {
        if (claimed) return close("prize");
        claimed = true; b.style.transform = "";
        $("[data-prize-text]", r.body).innerHTML = "Ваш приз: <b style='display:inline;font-size:inherit'>этот сайт</b>.<br>Он уже ваш, пользуйтесь на здоровье.";
        b.textContent = "Спасибо!";
      });
    }, false);
    rec.el.style.height = "auto";
    rec.el.classList.remove("max"); rec.el.classList.add("dlg-win");
  }

  // ---- app: games ----
  function renderGames(rec) {
    rec.body.innerHTML = `<div class="fm-grid paper" style="height:100%;box-sizing:border-box">${["mines", "snake"].map(id =>
      `<button class="os-icon" data-app="${id}">${APPS[id].icon}<span>${APPS[id].label}</span></button>`).join("")}</div>`;
    bindIcons($(".fm-grid", rec.body), id => openApp(id));
    status(rec, "2 объекта", "");
  }

  // Minesweeper first shipped in 1990; the intro compares that to the player's birth year
  const MINES_YEAR = 1990;
  const years = n => { const a = Math.abs(n) % 100, b = a % 10; return n + " " + (a > 10 && a < 20 ? "лет" : b === 1 ? "год" : b > 1 && b < 5 ? "года" : "лет"); };
  function ageVerdict(born) {
    const now = new Date().getFullYear();
    if (born === "secret") return "Возраст засекречен. Сапёр уважает таинственных.";
    if (!(born >= 1900 && born <= now)) return null;
    const d = born - MINES_YEAR;
    if (d > 0) return `Эта игра старше тебя на ${years(d)}. Уважай старших.`;
    if (d === 0) return "Вы с Сапёром ровесники. Можно на «ты».";
    if (born >= 1960) return `Ты старше Сапёра на ${years(-d)}. Покажи ему, кто тут главный.`;
    return `Ты старше Сапёра на ${years(-d)} и помнишь компьютеры размером с комнату. Для тебя это детская забава.`;
  }

  function renderMines(rec) {
    let saved = null;   // a year, "secret", or null when we haven't asked yet
    try { saved = JSON.parse(localStorage.getItem("inv1zel-born")); } catch (err) { saved = null; }
    if (saved !== null && ageVerdict(saved)) return minesGame(rec, ageVerdict(saved));
    const age = new Date().getFullYear() - MINES_YEAR;
    rec.body.innerHTML = `<form class="mines-intro" novalidate>
      <div class="led" style="text-align:center">${age}</div>
      <p>Сапёру уже ${years(age)}.<br>А в каком году родился ты?</p>
      <input id="minesBorn" type="number" inputmode="numeric" min="1900" max="${new Date().getFullYear()}" placeholder="например, 2005" aria-label="Год рождения">
      <p class="note" data-note></p>
      <div class="acts"><button type="button" class="btn" data-skip>Не скажу</button><button class="btn primary">Узнать</button></div>
    </form>`;
    const form = $(".mines-intro", rec.body), note = $("[data-note]", rec.body);
    const finish = born => {
      try { localStorage.setItem("inv1zel-born", JSON.stringify(born)); } catch (err) { /* ask again next time */ }
      const v = ageVerdict(born);
      form.innerHTML = `<p class="verdict">${esc(v)}</p><div class="acts"><button class="btn primary" data-play>Играть</button></div>`;
      $("[data-play]", form).addEventListener("click", () => minesGame(rec, v));
      $("[data-play]", form).focus();
    };
    form.addEventListener("submit", e => {
      e.preventDefault();
      const born = parseInt($("#minesBorn").value, 10);
      if (!ageVerdict(born)) { note.textContent = "Хорошая попытка. Введи настоящий год."; return; }
      finish(born);
    });
    $("[data-skip]", form).addEventListener("click", () => finish("secret"));
    status(rec, "Сапёр, 1990 год выпуска", "");
    setTimeout(() => { const i = $("#minesBorn"); if (i && !touchUI) i.focus(); }, 30);
  }

  function minesGame(rec, verdict) {
    const N = 9, M = 10;
    let cells, started, over, flags, opened, timer, secs, flagMode = false;
    rec.body.innerHTML = `<div class="mines">
      <div class="mines-top sunken"><span class="led" data-left></span><button class="btn face" data-face aria-label="Новая игра">:)</button><span class="led" data-time></span></div>
      <div class="mines-grid sunken"></div>
      ${touchUI ? `<button class="btn" data-mode>Режим: открывать</button>` : ""}
    </div>`;
    const grid = $(".mines-grid", rec.body), left = $("[data-left]", rec.body), time = $("[data-time]", rec.body);
    const face = $("[data-face]", rec.body), modeBtn = $("[data-mode]", rec.body);
    const pad = n => String(Math.max(0, Math.min(999, n))).padStart(3, "0");
    const nb = i => {
      const x = i % N, y = (i / N) | 0, r = [];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if ((dx || dy) && nx >= 0 && ny >= 0 && nx < N && ny < N) r.push(ny * N + nx);
      }
      return r;
    };
    function reset() {
      clearInterval(timer);
      started = over = false; flags = opened = secs = 0;
      cells = Array.from({ length: N * N }, () => ({ mine: false, n: 0, open: false, flag: false }));
      grid.innerHTML = cells.map((_, i) => `<button class="mc" data-i="${i}" aria-label="Клетка ${i % N + 1}, ${((i / N) | 0) + 1}"></button>`).join("");
      face.textContent = ":)"; left.textContent = pad(M); time.textContent = pad(0);
      status(rec, verdict || (touchUI ? "Переключи режим, чтобы ставить флажки" : "ЛКМ — открыть, ПКМ — флажок"), "");
    }
    function plant(safe) {
      const keep = [safe, ...nb(safe)];
      let k = 0;
      while (k < M) { const i = (Math.random() * N * N) | 0; if (cells[i].mine || keep.includes(i)) continue; cells[i].mine = true; k++; }
      cells.forEach((c, i) => { c.n = nb(i).filter(j => cells[j].mine).length; });
    }
    function openCell(i) {
      const c = cells[i]; if (c.open || c.flag || over) return;
      c.open = true; opened++;
      const el = grid.children[i]; el.classList.add("open");
      if (c.mine) return lose(i);
      if (c.n) { el.textContent = c.n; el.dataset.n = c.n; } else nb(i).forEach(openCell);
    }
    function lose(i) {
      over = true; clearInterval(timer); face.textContent = "X(";
      cells.forEach((c, j) => {
        const el = grid.children[j];
        if (c.mine && !c.flag) el.classList.add("open", "mine");
        if (!c.mine && c.flag) { el.classList.remove("flag"); el.textContent = "×"; }
      });
      grid.children[i].classList.add("boom");
      status(rec, "Бум! Нажми на смайлик, чтобы сыграть ещё", "");
    }
    function checkWin() {
      if (over || opened !== N * N - M) return;
      over = true; clearInterval(timer); face.textContent = "B)";
      cells.forEach((c, j) => { if (c.mine) grid.children[j].classList.add("flag"); });
      left.textContent = pad(0);
      status(rec, `Победа за ${secs} с!`, "");
    }
    function act(i, flag) {
      if (over) return;
      const c = cells[i];
      if (flag) {
        if (c.open) return;
        c.flag = !c.flag; flags += c.flag ? 1 : -1;
        grid.children[i].classList.toggle("flag", c.flag); left.textContent = pad(M - flags);
        return;
      }
      if (!started) { started = true; plant(i); timer = setInterval(() => { secs++; time.textContent = pad(secs); }, 1000); }
      if (c.open) { const ns = nb(i); if (c.n && ns.filter(j => cells[j].flag).length === c.n) ns.forEach(openCell); }
      else openCell(i);
      checkWin();
    }
    grid.addEventListener("click", e => { const b = e.target.closest(".mc"); if (b) act(+b.dataset.i, flagMode); });
    grid.addEventListener("contextmenu", e => { e.preventDefault(); const b = e.target.closest(".mc"); if (b) act(+b.dataset.i, !flagMode); });
    grid.addEventListener("pointerdown", e => { if (!over && e.button === 0 && e.target.closest(".mc")) face.textContent = ":O"; });
    const unpress = () => { if (!over) face.textContent = ":)"; };
    addEventListener("pointerup", unpress);
    face.addEventListener("click", reset);
    if (modeBtn) modeBtn.addEventListener("click", () => {
      flagMode = !flagMode; modeBtn.classList.toggle("on", flagMode);
      modeBtn.textContent = flagMode ? "Режим: флажки" : "Режим: открывать";
    });
    rec.onClose = () => { clearInterval(timer); removeEventListener("pointerup", unpress); };
    reset();
  }

  function renderSnake(rec) {
    const G = 20, S = 15, LCD = "#c7d9a7", DIM = "#b9cc98", INK = "#2e3b22";
    rec.body.innerHTML = `<div class="snake">
      <div class="snake-hud"><span>Счёт: <b data-score>0</b></span><span>Рекорд: <b data-best>0</b></span></div>
      <canvas width="${G * S}" height="${G * S}" tabindex="0" aria-label="Игровое поле"></canvas>
      <div class="pad">
        <button class="btn" data-d="0,-1" style="grid-area:1/2" aria-label="Вверх">▲</button>
        <button class="btn" data-d="-1,0" style="grid-area:2/1" aria-label="Влево">◄</button>
        <button class="btn" data-d="0,1" style="grid-area:2/2" aria-label="Вниз">▼</button>
        <button class="btn" data-d="1,0" style="grid-area:2/3" aria-label="Вправо">►</button>
      </div>
    </div>`;
    const cv = $("canvas", rec.body), g = cv.getContext("2d");
    const scoreEl = $("[data-score]", rec.body), bestEl = $("[data-best]", rec.body);
    let best = 0;
    try { best = +localStorage.getItem("inv1zel-snake") || 0; } catch (err) { best = 0; }
    bestEl.textContent = best;
    let snake, dir, nextDir, food, score, state = "idle", timer = 0;

    function reset() {
      snake = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
      dir = nextDir = { x: 1, y: 0 }; score = 0; scoreEl.textContent = 0; placeFood();
    }
    function placeFood() {
      do food = { x: (Math.random() * G) | 0, y: (Math.random() * G) | 0 };
      while (snake.some(p => p.x === food.x && p.y === food.y));
    }
    function draw() {
      g.fillStyle = LCD; g.fillRect(0, 0, G * S, G * S);
      g.fillStyle = DIM;                                   // ghost pixels of the LCD
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) g.fillRect(x * S + 1, y * S + 1, S - 2, S - 2);
      g.fillStyle = INK;
      snake.forEach(p => g.fillRect(p.x * S + 1, p.y * S + 1, S - 2, S - 2));
      g.fillRect(food.x * S + 5, food.y * S + 2, S - 10, S - 4);
      g.fillRect(food.x * S + 2, food.y * S + 5, S - 4, S - 10);
      if (state !== "run") {
        g.fillStyle = "rgba(199,217,167,.9)"; g.fillRect(0, G * S / 2 - 42, G * S, 84);
        g.fillStyle = INK; g.textAlign = "center";
        g.font = "bold 24px 'Pixelify Sans', monospace";
        g.fillText(state === "idle" ? "ЗМЕЙКА" : state === "over" ? "КОНЕЦ ИГРЫ" : "ПАУЗА", G * S / 2, G * S / 2 - 6);
        g.font = "13px 'IBM Plex Mono', monospace";
        g.fillText(touchUI ? "Нажми на поле, чтобы начать" : "Пробел — старт, стрелки — рулить", G * S / 2, G * S / 2 + 22);
      }
    }
    const live = () => { const w = wins.get("snake"); return w && !w.el.hidden && w.el.classList.contains("active") && !os.hidden; };
    function pause() { if (state === "run") { state = "pause"; clearInterval(timer); draw(); } }
    function step() {
      if (!live()) return pause();
      dir = nextDir;
      const h = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (h.x < 0 || h.y < 0 || h.x >= G || h.y >= G || snake.some(p => p.x === h.x && p.y === h.y)) {
        state = "over"; clearInterval(timer);
        if (score > best) { best = score; bestEl.textContent = best; try { localStorage.setItem("inv1zel-snake", best); } catch (err) { /* no record then */ } }
        status(rec, `Конец игры. Счёт: ${score}`, ""); draw(); return;
      }
      snake.unshift(h);
      if (h.x === food.x && h.y === food.y) { score++; scoreEl.textContent = score; placeFood(); run(); }
      else snake.pop();
      draw();
    }
    function run() { clearInterval(timer); timer = setInterval(step, Math.max(60, 150 - score * 4)); }
    function start() {
      if (state === "run") return pause();
      if (state !== "pause") reset();
      state = "run"; status(rec, "Ешь крестики, не врезайся в стены", ""); run(); draw();
    }
    function turn(dx, dy) {
      if (state !== "run") start();
      if (dx === -dir.x && dy === -dir.y) return;
      nextDir = { x: dx, y: dy };
    }
    const KEYS = { ArrowUp: [0, -1], KeyW: [0, -1], ArrowDown: [0, 1], KeyS: [0, 1], ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0] };
    const onKey = e => {
      if (!live()) return;
      if (e.code === "Space") { e.preventDefault(); start(); }
      else if (KEYS[e.code]) { e.preventDefault(); turn(...KEYS[e.code]); }
    };
    addEventListener("keydown", onKey);
    $(".pad", rec.body).addEventListener("click", e => { const b = e.target.closest("[data-d]"); if (b) turn(...b.dataset.d.split(",").map(Number)); });
    let sx = 0, sy = 0;
    cv.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY; });
    cv.addEventListener("pointerup", e => {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) { if (state !== "run") start(); return; }
      if (Math.abs(dx) > Math.abs(dy)) turn(Math.sign(dx), 0); else turn(0, Math.sign(dy));
    });
    rec.onClose = () => { clearInterval(timer); removeEventListener("keydown", onKey); };
    reset(); draw();
    status(rec, touchUI ? "Свайпы или кнопки — рулить" : "Пробел — старт, стрелки или WASD — рулить", "");
  }

  // ---- clock ----
  const clock = $("#osClock");
  const tick = () => { const d = new Date(); clock.textContent = d.toTimeString().slice(0, 5); };
  tick(); setInterval(tick, 10000);

  // ---- boot / exit ----
  const BOOT = [
    `LILO 22.5 boot: <span class='hl'>${OS.host}</span>`,
    `Loading ${OS.host}-2.4.22 ....................`,
    "Uncompressing Linux... Ok, booting the kernel.",
    `Linux version 2.4.22 (root@${OS.host}) (gcc version 3.3.1) #1 Sat Oct 18 03:12:44 MSK 2003`,
    "BIOS-provided physical RAM map: 256MB LOWMEM available.",
    "hda: QUANTUM FIREBALLlct20 20, ATA DISK drive",
    "hdc: CD-ROM 52X, ATAPI CD/DVD-ROM drive",
    "VFS: Mounted root (ext3 filesystem) readonly.",
    "INIT: version 2.85 booting",
    "Checking root filesystem ............... [<span class='ok'>  OK  </span>]",
    "Starting system logger ................. [<span class='ok'>  OK  </span>]",
    "Bringing up interface eth0 ............. [<span class='ok'>  OK  </span>]",
    "Mounting /home/" + ME.login + "/portfolio ......... [<span class='ok'>  OK  </span>]",
    "Starting mail daemon ................... [<span class='ok'>  OK  </span>]",
    `Starting X11 (${OS.wm}) ............... [<span class='ok'>  OK  </span>]`,
  ];
  let booted = false, busy = false, timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  function chime() {
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state !== "running") { ac.close(); return; }
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + i * 0.12;
        o.type = "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.08, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.9);
        o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + 1);
      });
    } catch (err) { /* silent machine */ }
  }

  function boot() {
    if (busy) return;
    busy = true;
    os.hidden = false; os.classList.remove("leaving");
    document.documentElement.style.overflow = "hidden";
    RetroOS.covering = true;
    document.body.classList.add("os-on");
    const step = reduceMotion ? 20 : 140;
    if (booted) { showDesk(); return; }
    desk.hidden = true; bootEl.hidden = false; bootEl.innerHTML = "";
    BOOT.forEach((l, i) => later(() => { bootEl.innerHTML += l + "\n"; }, i * step + (i > 2 ? 300 : 0)));
    const t = BOOT.length * step + 700;
    later(() => { bootEl.innerHTML = ""; bootEl.className = "os-weave"; }, t);
    later(() => { bootEl.className = "os-boot"; bootEl.hidden = true; booted = true; showDesk(); chime(); }, t + (reduceMotion ? 50 : 450));
  }
  function showDesk() {
    desk.hidden = false; busy = false;
    wall.start();
    if (!wins.size) openDialog("welcome", "Добро пожаловать", ICON.info,
      `<p>Это мой компьютер. Здесь всё обо мне: работы лежат в «Файлах», связаться можно через «Почту».</p>
       <p>${touchUI ? "Нажми на иконку, чтобы открыть." : "Двойной клик по иконке открывает программу."}</p>`);
  }
  function exit() {
    timers.forEach(clearTimeout); timers = [];
    wall.stop();
    os.classList.add("leaving");
    RetroOS.covering = false;
    document.body.classList.remove("os-on");
    document.documentElement.style.overflow = "";
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    dispatchEvent(new Event("retro-os-exit"));
    setTimeout(() => { os.hidden = true; busy = false; }, 500);
  }

  const RetroOS = window.RetroOS = { boot, exit, covering: false };
  if (location.hash === "#os") { scrollTo(0, document.documentElement.scrollHeight); setTimeout(boot, 50); }
})();
