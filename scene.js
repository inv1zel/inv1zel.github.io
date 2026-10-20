(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DESK_Y = 0.77;

  // ---------- grain overlay ----------
  {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const g = c.getContext("2d"); const img = g.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255; img.data[i] = img.data[i+1] = img.data[i+2] = v; img.data[i+3] = 255;
    }
    g.putImageData(img, 0, 0);
    document.getElementById("grain").style.backgroundImage = `url(${c.toDataURL()})`;
  }

  // ---------- renderer / scene ----------
  const canvas = document.getElementById("scene");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const coarse = matchMedia("(hover: none)").matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050506);
  scene.fog = new THREE.FogExp2(0x050506, 0.28);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 30);

  // ---------- helpers ----------
  function canvasTex(w, h, draw, repeat) {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    draw(c.getContext("2d"), w, h);
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
    return t;
  }
  function noise(g, w, h, amt) {
    const img = g.getImageData(0, 0, w, h);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (Math.random() - 0.5) * amt;
      img.data[i] += n; img.data[i+1] += n; img.data[i+2] += n;
    }
    g.putImageData(img, 0, 0);
  }
  function mesh(geo, mat, x, y, z, parent) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    (parent || scene).add(m);
    return m;
  }
  const box = (w, h, d, mat, x, y, z, parent) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent);
  const std = (color, rough = 0.7, metal = 0, extra = {}) =>
    new THREE.MeshStandardMaterial(Object.assign({ color, roughness: rough, metalness: metal }, extra));

  // ---------- materials ----------
  const beige = std(0xcdc3a2, 0.55);          // aged ABS plastic
  const beigeDark = std(0xa99f80, 0.6);
  const blackPlastic = std(0x151515, 0.5);
  const slotBlack = std(0x050505, 0.9);

  const woodTex = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = "#4a2f1c"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) {
      const y = Math.random() * h;
      g.strokeStyle = `rgba(${20 + Math.random()*40},${10 + Math.random()*20},5,${0.15 + Math.random()*0.25})`;
      g.lineWidth = 1 + Math.random() * 3;
      g.beginPath();
      for (let x = 0; x <= w; x += 16) g.lineTo(x, y + Math.sin(x * 0.01 + i) * 6);
      g.stroke();
    }
    noise(g, w, h, 18);
  });
  const wood = std(0xffffff, 0.65, 0, { map: woodTex });

  const wallTex = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = "#3a3d33"; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 32) {          // soviet-flat wallpaper stripes
      g.fillStyle = "rgba(0,0,0,.12)"; g.fillRect(x, 0, 14, h);
      g.fillStyle = "rgba(255,240,200,.04)"; g.fillRect(x + 20, 0, 3, h);
    }
    for (let i = 0; i < 6; i++) {               // water stains
      const gr = g.createRadialGradient(Math.random()*w, Math.random()*h, 0, Math.random()*w, Math.random()*h, 80 + Math.random()*120);
      gr.addColorStop(0, "rgba(60,45,20,.18)"); gr.addColorStop(1, "rgba(60,45,20,0)");
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }
    noise(g, w, h, 14);
  }, [4, 2]);
  const wall = std(0xffffff, 0.95, 0, { map: wallTex });

  const floorTex = canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = "#231c16"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#1b1511";
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if ((x + y) % 2) g.fillRect(x*32, y*32, 32, 32);
    noise(g, w, h, 16);
  }, [10, 10]);
  const floorMat = std(0xffffff, 0.85, 0, { map: floorTex });

  // ---------- room ----------
  const floor = mesh(new THREE.PlaneGeometry(12, 12), floorMat, 0, 0, 0);
  floor.rotation.x = -Math.PI / 2;
  mesh(new THREE.PlaneGeometry(8, 3.2), wall, 0, 1.6, -0.55);
  const leftWall = mesh(new THREE.PlaneGeometry(6, 3.2), wall, -1.7, 1.6, 2.4);
  leftWall.rotation.y = Math.PI / 2;
  // skirting board
  box(8, 0.08, 0.02, std(0x2a1d14, 0.7), 0, 0.04, -0.54);

  // ---------- desk ----------
  box(1.7, 0.04, 0.82, wood, 0, DESK_Y - 0.02, -0.11);
  box(0.03, DESK_Y - 0.04, 0.78, wood, -0.82, (DESK_Y - 0.04) / 2, -0.11);
  box(0.03, DESK_Y - 0.04, 0.78, wood, 0.82, (DESK_Y - 0.04) / 2, -0.11);
  box(1.6, 0.35, 0.02, wood, 0, DESK_Y - 0.22, -0.48);       // modesty panel
  box(0.4, 0.14, 0.7, wood, 0.6, DESK_Y - 0.11, -0.12);      // drawer
  box(0.08, 0.015, 0.02, std(0x8a7a55, 0.3, 0.8), 0.6, DESK_Y - 0.11, 0.235);

  // ---------- CRT monitor ----------
  const monitor = new THREE.Group();
  monitor.position.set(0, DESK_Y, 0.05);
  scene.add(monitor);
  const BODY_Y = 0.245;
  mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.015, 32), beigeDark, 0, 0.0075, -0.12, monitor);
  box(0.09, 0.05, 0.1, beigeDark, 0, 0.04, -0.12, monitor);
  box(0.42, 0.38, 0.07, beige, 0, BODY_Y, 0, monitor);                 // front bezel
  box(0.37, 0.33, 0.2, beige, 0, BODY_Y + 0.005, -0.13, monitor);      // tube housing
  box(0.27, 0.23, 0.14, beige, 0, BODY_Y + 0.015, -0.29, monitor);     // neck
  // rear vents
  for (let i = 0; i < 9; i++) box(0.2, 0.004, 0.002, slotBlack, 0, BODY_Y + 0.11 - i * 0.012, -0.361, monitor);
  // recessed screen frame
  mesh(new THREE.PlaneGeometry(0.36, 0.285), std(0x2a2720, 0.8), 0, BODY_Y + 0.015, 0.0352, monitor);

  // screen texture (live canvas)
  const scr = document.createElement("canvas"); scr.width = 640; scr.height = 480;
  const sg = scr.getContext("2d");
  const screenTex = new THREE.CanvasTexture(scr);
  screenTex.encoding = THREE.sRGBEncoding;
  const SW = 0.33, SH = 0.25;
  const screenGeo = new THREE.PlaneGeometry(SW, SH, 24, 18);
  {
    const pos = screenGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) / (SW / 2), y = pos.getY(i) / (SH / 2);
      pos.setZ(i, 0.011 * (1 - x * x * 0.6) * (1 - y * y * 0.6));
    }
    screenGeo.computeVertexNormals();
  }
  const screen = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: screenTex, color: 0xd8d8d8, toneMapped: false }));
  screen.position.set(0, BODY_Y + 0.015, 0.036);
  monitor.add(screen);
  const SCREEN_WORLD = new THREE.Vector3(0, DESK_Y + BODY_Y + 0.015, 0.05 + 0.036 + 0.011);

  // bezel controls
  const ledMon = new THREE.MeshStandardMaterial({ color: 0x113311, emissive: 0x33ff55, emissiveIntensity: 1.6 });
  box(0.024, 0.012, 0.006, beigeDark, 0.17, BODY_Y - 0.165, 0.036, monitor);
  box(0.006, 0.004, 0.003, ledMon, 0.14, BODY_Y - 0.165, 0.036, monitor);
  for (let i = 0; i < 4; i++) box(0.012, 0.007, 0.004, beigeDark, -0.17 + i * 0.018, BODY_Y - 0.165, 0.036, monitor);
  const badge = canvasTex(256, 32, (g, w, h) => {
    g.fillStyle = "#cdc3a2"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#6b6450"; g.font = "bold 20px Arial"; g.textAlign = "center"; g.fillText("SYNCVIEW 17", w/2, 23);
  });
  mesh(new THREE.PlaneGeometry(0.07, 0.009), new THREE.MeshStandardMaterial({ map: badge, roughness: 0.6 }), 0, BODY_Y - 0.165, 0.0352, monitor);

  // sticky note
  const noteTex = canvasTex(128, 128, (g, w, h) => {
    g.fillStyle = "#e9d65a"; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(0,0,0,.08)"; g.fillRect(0, 0, w, 14);
    g.fillStyle = "#2a3a8a"; g.font = "italic 17px 'Comic Sans MS', cursive";
    ["не забыть:", "залить", "портфолио!!"].forEach((t, i) => g.fillText(t, 10, 42 + i * 26));
  });
  const note = mesh(new THREE.PlaneGeometry(0.065, 0.065), std(0xffffff, 0.9, 0, { map: noteTex }), 0.198, BODY_Y + 0.155, 0.0365, monitor);
  note.rotation.z = -0.18;

  // ---------- keyboard ----------
  const kb = new THREE.Group();
  kb.position.set(-0.03, DESK_Y, 0.2);
  kb.rotation.x = 0.04;
  scene.add(kb);
  box(0.46, 0.028, 0.18, beige, 0, 0.014, 0, kb);
  {
    const keyGeo = new THREE.BoxGeometry(0.023, 0.012, 0.022);
    const keyMat = std(0xffffff, 0.5);
    const keys = [];
    const pitch = 0.0275;
    // function row
    for (let c = 0; c < 13; c++) keys.push([-0.193 + c * 0.03, -0.068, c === 0 ? 1 : 0]);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) keys.push([-0.193 + c * pitch, -0.038 + r * pitch, c === 0 || c === 14 ? 1 : 0]);
    for (const c of [0, 1, 2, 3, 11, 12, 13, 14]) keys.push([-0.193 + c * pitch, -0.038 + 4 * pitch, 1]);
    const inst = new THREE.InstancedMesh(keyGeo, keyMat, keys.length);
    const m4 = new THREE.Matrix4(), col = new THREE.Color();
    keys.forEach(([x, z, mod], i) => {
      m4.makeTranslation(x, 0.034, z); inst.setMatrixAt(i, m4);
      inst.setColorAt(i, col.set(mod ? 0x9e9579 : 0xd6cdae));
    });
    inst.castShadow = inst.receiveShadow = true;
    kb.add(inst);
    box(0.19, 0.012, 0.022, std(0xd6cdae, 0.5), -0.193 + 7 * pitch, 0.034, -0.038 + 4 * pitch, kb); // spacebar
  }

  // ---------- mouse ----------
  box(0.24, 0.004, 0.2, std(0x1d2433, 0.95), 0.36, DESK_Y + 0.002, 0.22);
  const mouse = mesh(new THREE.SphereGeometry(1, 28, 18), beige, 0.36, DESK_Y + 0.006, 0.23);
  mouse.scale.set(0.032, 0.022, 0.055);
  box(0.0015, 0.004, 0.035, beigeDark, 0.36, DESK_Y + 0.026, 0.205);

  const cable = (pts) => mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 64, 0.0028, 6),
    std(0x9a937c, 0.6), 0, 0, 0);
  cable([[0.36, DESK_Y + 0.012, 0.176], [0.35, DESK_Y + 0.004, 0.08], [0.25, DESK_Y + 0.004, -0.14], [-0.05, DESK_Y + 0.004, -0.36], [-0.5, DESK_Y + 0.12, -0.36]]);
  cable([[-0.03, DESK_Y + 0.02, 0.11], [-0.08, DESK_Y + 0.004, 0.0], [-0.3, DESK_Y + 0.004, -0.25], [-0.5, DESK_Y + 0.1, -0.36]]);

  // ---------- tower ----------
  const tower = new THREE.Group();
  tower.position.set(-0.62, DESK_Y, -0.12);
  scene.add(tower);
  box(0.2, 0.44, 0.46, beige, 0, 0.22, 0, tower);
  const F = 0.231;
  box(0.17, 0.042, 0.004, beigeDark, 0, 0.385, F, tower);
  box(0.12, 0.004, 0.003, slotBlack, 0, 0.375, F + 0.002, tower);              // CD tray
  box(0.17, 0.042, 0.004, beigeDark, 0, 0.338, F, tower);
  box(0.1, 0.028, 0.004, beigeDark, 0.02, 0.292, F, tower);
  box(0.075, 0.004, 0.003, slotBlack, 0.02, 0.296, F + 0.002, tower);           // floppy slot
  box(0.012, 0.007, 0.004, beigeDark, 0.055, 0.284, F + 0.002, tower);
  const powerBtnMat = std(0xa99f80, 0.6, 0, { emissive: 0xffb766, emissiveIntensity: 0 });
  const powerBtn = mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.008, 24), powerBtnMat, 0, 0.21, F + 0.002, tower);
  powerBtn.rotation.x = Math.PI / 2;
  const POWER_Z = powerBtn.position.z;
  // generous invisible hit target: the real button is ~12px wide from the chair
  const powerHit = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.02, 12), new THREE.MeshBasicMaterial({ visible: false }));
  powerHit.rotation.x = Math.PI / 2;
  powerHit.position.set(0, 0.21, F + 0.006);
  tower.add(powerHit);
  const ledPower = new THREE.MeshStandardMaterial({ color: 0x113311, emissive: 0x33ff55, emissiveIntensity: 1.8 });
  const ledHdd = new THREE.MeshStandardMaterial({ color: 0x331111, emissive: 0xff3322, emissiveIntensity: 0 });
  box(0.006, 0.006, 0.003, ledPower, -0.02, 0.17, F + 0.002, tower);
  box(0.006, 0.006, 0.003, ledHdd, 0.02, 0.17, F + 0.002, tower);
  for (let i = 0; i < 8; i++) box(0.13, 0.003, 0.002, slotBlack, 0, 0.12 - i * 0.011, F + 0.002, tower);
  const towerBadge = canvasTex(128, 32, (g, w, h) => {
    g.fillStyle = "#2b5aa8"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#e8e8e8"; g.font = "bold 15px Arial"; g.textAlign = "center"; g.fillText("PENTIUM III", w/2, 21);
  });
  mesh(new THREE.PlaneGeometry(0.04, 0.01), new THREE.MeshStandardMaterial({ map: towerBadge, roughness: 0.4 }), 0.055, 0.25, F + 0.003, tower);

  // ---------- speakers ----------
  for (const sx of [-0.31, 0.3]) {
    const sp = new THREE.Group(); sp.position.set(sx, DESK_Y, -0.04); sp.rotation.y = -sx * 0.6; scene.add(sp);
    box(0.09, 0.16, 0.1, beige, 0, 0.08, 0, sp);
    const cone = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.004, 24), std(0x2a2824, 0.95), 0, 0.095, 0.051, sp);
    cone.rotation.x = Math.PI / 2;
    mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.004, 16), std(0x2a2824, 0.95), 0, 0.03, 0.051, sp).rotation.x = Math.PI / 2;
  }

  // ---------- desk clutter ----------
  { // mug
    const mug = new THREE.Group(); mug.position.set(0.58, DESK_Y, 0.08); scene.add(mug);
    mesh(new THREE.CylinderGeometry(0.038, 0.035, 0.095, 28), std(0x7a1f1a, 0.35), 0, 0.0475, 0, mug);
    mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.002, 28), std(0x1a0d06, 0.2), 0, 0.085, 0, mug);
    const h = mesh(new THREE.TorusGeometry(0.025, 0.007, 10, 20, Math.PI), std(0x7a1f1a, 0.35), 0.038, 0.048, 0, mug);
    h.rotation.z = -Math.PI / 2;
  }
  { // floppy stack
    const colors = [0x1b1b1b, 0x2a4e8a, 0x8a2a2a, 0x1b1b1b];
    colors.forEach((c, i) => {
      const f = box(0.09, 0.0032, 0.094, std(c, 0.5), 0.5, DESK_Y + 0.0016 + i * 0.0033, -0.28);
      f.rotation.y = (Math.random() - 0.5) * 0.4;
      box(0.05, 0.0034, 0.03, std(0xa9acb0, 0.3, 0.8), 0, 0, -0.032, f);
    });
  }
  { // CD lying on desk
    const cd = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.0012, 48), std(0xc8ccd8, 0.15, 0.9), -0.33, DESK_Y + 0.001, 0.24);
    mesh(new THREE.CylinderGeometry(0.0075, 0.0075, 0.0014, 24), std(0x0b0b0b, 0.9), 0, 0, 0, cd);
  }

  // ---------- wall calendar ----------
  {
    const calTex = canvasTex(300, 420, (g, w, h) => {
      g.fillStyle = "#e8e2d0"; g.fillRect(0, 0, w, h);
      const sky = g.createLinearGradient(0, 0, 0, 190);
      sky.addColorStop(0, "#1e3b6e"); sky.addColorStop(1, "#d9824a");
      g.fillStyle = sky; g.fillRect(14, 14, w - 28, 180);
      g.fillStyle = "#1c2a1c";
      g.beginPath(); g.moveTo(14, 194); g.lineTo(80, 120); g.lineTo(140, 170); g.lineTo(210, 100); g.lineTo(w - 14, 160); g.lineTo(w - 14, 194); g.fill();
      g.fillStyle = "#8a1d1d"; g.font = "bold 24px Arial"; g.textAlign = "center";
      g.fillText("ОКТЯБРЬ 2003", w / 2, 228);
      g.font = "14px Arial"; g.fillStyle = "#333";
      const days = ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"];
      days.forEach((d, i) => { g.fillStyle = i > 4 ? "#8a1d1d" : "#333"; g.fillText(d, 30 + i * 40, 256); });
      for (let d = 1; d <= 31; d++) {
        const idx = d + 1, col = idx % 7, row = Math.floor(idx / 7);
        g.fillStyle = col > 4 ? "#8a1d1d" : "#333";
        g.fillText(String(d), 30 + col * 40, 284 + row * 26);
        if (d === 18) { g.strokeStyle = "#c22"; g.lineWidth = 2; g.beginPath(); g.arc(30 + col * 40, 279 + row * 26, 13, 0, 7); g.stroke(); }
      }
      noise(g, w, h, 10);
    });
    const cal = mesh(new THREE.PlaneGeometry(0.3, 0.42), std(0xffffff, 0.9, 0, { map: calTex }), -0.68, 1.58, -0.545);
    cal.rotation.z = 0.02;
    mesh(new THREE.SphereGeometry(0.006, 8, 8), std(0xcc2222, 0.4), -0.68, 1.795, -0.54);
  }

  // ---------- hanging bulb ----------
  const bulbPivot = new THREE.Group();
  bulbPivot.position.set(0.36, 3.0, 0.05);
  scene.add(bulbPivot);
  const CORD = 1.34;
  mesh(new THREE.CylinderGeometry(0.003, 0.003, CORD, 6), std(0x111111, 0.6), 0, -CORD / 2, 0, bulbPivot);
  mesh(new THREE.CylinderGeometry(0.018, 0.016, 0.05, 16), std(0x2a2a2a, 0.5, 0.3), 0, -CORD - 0.02, 0, bulbPivot);
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xfff1d8, emissive: 0xffb766, emissiveIntensity: 2, roughness: 0.2 });
  const bulb = mesh(new THREE.SphereGeometry(0.034, 24, 18), bulbMat, 0, -CORD - 0.07, 0, bulbPivot);
  bulb.scale.set(1, 1.25, 1);
  bulb.castShadow = false;

  const lamp = new THREE.PointLight(0xffb766, 1.6, 5, 2);
  lamp.position.set(0, -CORD - 0.07, 0);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(coarse ? 512 : 1024, coarse ? 512 : 1024);
  lamp.shadow.bias = -0.002;
  lamp.shadow.radius = 4;
  lamp.shadow.camera.near = 0.05;
  bulbPivot.add(lamp);

  // ---------- other lights ----------
  scene.add(new THREE.HemisphereLight(0x1c2233, 0x070504, 0.35));
  const screenGlow = new THREE.PointLight(0x9fb8ff, 0.5, 1.6, 2);
  screenGlow.position.copy(SCREEN_WORLD).add(new THREE.Vector3(0, 0, 0.25));
  scene.add(screenGlow);

  // ---------- screen content ----------
  const PROMPT = [
    "RETRO-DOS  Версия 6.22",
    "",
    "C:\\>dir /w PORTFOLIO",
    "",
    " [PROJECT1]   [PROJECT2]   [PROJECT3]",
    " ABOUT.TXT    CONTACT.TXT",
    "        5 файл(ов)",
    "",
  ];
  const POST = [
    "RetroBIOS v4.51PG, (C) 1984-2003",
    "",
    "Main Processor : Pentium III 800MHz",
    "Memory Testing : {MEM}K OK",
    "",
    "Detecting IDE Primary Master ... QUANTUM 20GB",
    "Detecting IDE Primary Slave  ... CD-ROM 52X",
    "",
    "Starting system...",
  ];
  let screenMode = "prompt", postStart = 0;
  let pcOn = true, powerChanged = -1e9, nearBoot = false;
  function drawOff(now) {
    const g = sg, W = scr.width, H = scr.height;
    const t = (now - powerChanged) / 1000;
    g.fillStyle = "#060706"; g.fillRect(0, 0, W, H);
    if (t < 0.22) {                             // picture collapses to a line
      const k = 1 - t / 0.22, bh = Math.max(3, H * k * 0.9);
      g.fillStyle = `rgba(220,235,220,${0.35 + 0.6 * (1 - k)})`;
      g.fillRect(W * 0.04 * (1 - k), (H - bh) / 2, W - W * 0.08 * (1 - k), bh);
    } else if (t < 1.1) {                       // then fades to a dot
      const a = 1 - (t - 0.22) / 0.88;
      const d = g.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 10 + 30 * a);
      d.addColorStop(0, `rgba(240,255,240,${a})`); d.addColorStop(1, "rgba(240,255,240,0)");
      g.fillStyle = d; g.fillRect(0, 0, W, H);
    }
    const r = g.createLinearGradient(0, 0, W, H);
    r.addColorStop(0, "rgba(255,255,255,.05)"); r.addColorStop(0.35, "rgba(255,255,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, W, H);
    screenTex.needsUpdate = true;
  }
  function drawScreen(now) {
    if (!pcOn) { drawOff(now); return; }
    const g = sg, W = scr.width, H = scr.height;
    g.fillStyle = "#0a0d0b"; g.fillRect(0, 0, W, H);
    g.font = "20px 'Courier New', monospace";
    g.fillStyle = "#c4d4c0";
    g.shadowColor = "rgba(180,255,190,.55)"; g.shadowBlur = 6;
    const cursorOn = Math.floor(now / 530) % 2 === 0;
    let lines;
    if (screenMode === "prompt") {
      lines = PROMPT.concat(["C:\\>" + (cursorOn ? "_" : "")]);
    } else {
      const t = Math.max(0, (now - postStart) / 1000);
      const shown = Math.min(POST.length, Math.floor(t * 4.5));
      if (t > POST.length / 4.5 + 1.4 && prog < 0.97) screenMode = "prompt";
      const mem = Math.min(262144, Math.floor(t * 120000 / 1024) * 1024);
      lines = POST.slice(0, shown).map(l => l.replace("{MEM}", String(mem).padStart(6, " ")));
      if (shown >= POST.length && cursorOn) lines.push("_");
    }
    lines.forEach((l, i) => g.fillText(l, 34, 50 + i * 27));
    g.shadowBlur = 0;
    // scanlines
    g.fillStyle = "rgba(0,0,0,.28)";
    for (let y = 0; y < H; y += 3) g.fillRect(0, y, W, 1);
    // tube vignette
    const v = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.65)");
    g.fillStyle = v; g.fillRect(0, 0, W, H);
    // glass reflection
    const r = g.createLinearGradient(0, 0, W, H);
    r.addColorStop(0, "rgba(255,255,255,.06)"); r.addColorStop(0.35, "rgba(255,255,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, W, H);
    // CRT warm-up: picture opens from a horizontal line
    const warm = (now - powerChanged) / 350;
    if (warm < 1) {
      const bh = H * Math.max(0.01, warm);
      g.fillStyle = "#060706";
      g.fillRect(0, 0, W, (H - bh) / 2); g.fillRect(0, (H + bh) / 2, W, H);
    }
    screenTex.needsUpdate = true;
  }

  // ---------- power button ----------
  let actx, pressT = -1e9;
  function sfx(on) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = actx.currentTime;
      const buf = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.03), actx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
      const click = actx.createBufferSource(); click.buffer = buf;
      const cg = actx.createGain(); cg.gain.value = 0.35;
      click.connect(cg).connect(actx.destination); click.start(t0);
      if (on) {                                   // degauss thunk
        const o = actx.createOscillator(); o.type = "sawtooth"; o.frequency.value = 60;
        const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 220;
        const og = actx.createGain();
        og.gain.setValueAtTime(0, t0 + 0.25);
        og.gain.linearRampToValueAtTime(0.2, t0 + 0.3);
        og.gain.exponentialRampToValueAtTime(0.001, t0 + 1.1);
        o.connect(lp).connect(og).connect(actx.destination); o.start(t0 + 0.25); o.stop(t0 + 1.2);
      }
    } catch (err) { /* no audio, no problem */ }
  }
  function setPower(on) {
    pcOn = on;
    powerChanged = performance.now();
    if (on) { screenMode = "post"; postStart = powerChanged + 400; }
    ledPower.emissiveIntensity = on ? 1.8 : 0;
    ledMon.emissive.set(on ? 0x33ff55 : 0xffaa22);   // amber = monitor standby
    ledMon.emissiveIntensity = on ? 1.6 : 1.1;
  }
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function overPower(x, y) {
    ndc.set(x / innerWidth * 2 - 1, -(y / innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObject(powerHit).length > 0;
  }
  addEventListener("pointermove", e => {
    const over = overPower(e.clientX, e.clientY);
    canvas.style.cursor = over ? "pointer" : "";
    powerBtnMat.emissiveIntensity = over ? 0.35 : 0;
  });
  addEventListener("click", e => {
    if (!overPower(e.clientX, e.clientY)) return;
    pressT = performance.now();
    setPower(!pcOn);
    sfx(pcOn);
  });

  // ---------- camera path ----------
  const P0 = new THREE.Vector3(0, 1.1, 2.1);
  const P1 = new THREE.Vector3(0, 1.06, 0.9);
  const P2 = new THREE.Vector3();
  const L0 = new THREE.Vector3(0, 1.1, -0.05);    // level gaze, no pitch
  const tmp = new THREE.Vector3(), look = new THREE.Vector3();

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // tall screens: step back and widen the lens so the whole desk stays in frame
    P0.z = camera.aspect < 1.2 ? 2.5 : 2.1;
    const fit = THREE.MathUtils.radToDeg(2 * Math.atan(0.9 / (P0.z * camera.aspect)));
    camera.fov = Math.min(66, Math.max(42, fit));
    camera.updateProjectionMatrix();
    const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dFitH = (SH / 2) / tanH;
    const dFitW = (SW / 2) / (tanH * camera.aspect);
    P2.set(SCREEN_WORLD.x, SCREEN_WORLD.y, SCREEN_WORLD.z + Math.max(dFitH, dFitW) * 1.04);
  }
  addEventListener("resize", resize);
  resize();

  let target = 0, prog = 0;
  const readScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    target = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  };
  addEventListener("scroll", readScroll, { passive: true });
  readScroll();

  let mx = 0, my = 0, smx = 0, smy = 0;
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth * 2 - 1; my = e.clientY / innerHeight * 2 - 1; });

  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const hint = document.getElementById("hint");
  if (coarse) hint.firstElementChild.textContent = "ЛИСТАЙ ВНИЗ — САДИСЬ ЗА КОМП";

  // ---------- lamp flicker ----------
  let flickerLeft = 0, flickerVal = 1;
  function lampLevel(t, dt) {
    if (reduceMotion) return 1;
    let lvl = 1 + Math.sin(t * 47) * 0.012 + (Math.random() - 0.5) * 0.025;
    if (flickerLeft <= 0 && Math.random() < dt * 0.3) flickerLeft = 0.12 + Math.random() * 0.7;
    if (flickerLeft > 0) {
      flickerLeft -= dt;
      if (Math.random() < 0.35) flickerVal = Math.random() < 0.5 ? 0.08 + Math.random() * 0.25 : 1;
      lvl *= flickerVal;
    } else flickerVal = 1;
    return lvl;
  }

  // ---------- loop ----------
  const clock = new THREE.Clock();
  let hddTimer = 0, lastDraw = 0;
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const now = performance.now();

    prog += (target - prog) * Math.min(1, dt * 5);
    if (Math.abs(target - prog) < 1e-4) prog = target;
    const e = ease(prog);

    // bezier dolly toward the screen
    const a = 1 - e;
    tmp.set(0, 0, 0)
      .addScaledVector(P0, a * a)
      .addScaledVector(P1, 2 * a * e)
      .addScaledVector(P2, e * e);
    smx += (mx - smx) * dt * 3; smy += (my - smy) * dt * 3;
    const par = (1 - e) * (reduceMotion ? 0 : 1);
    tmp.x += smx * 0.04 * par; tmp.y -= smy * 0.02 * par;
    if (!reduceMotion) tmp.y += Math.sin(t * 0.9) * 0.004 * par;   // breathing
    camera.position.copy(tmp);
    look.lerpVectors(L0, SCREEN_WORLD, e);
    camera.lookAt(look);
    // head turn: glance toward the cursor
    camera.rotateY(-smx * 0.09 * par);
    camera.rotateX(-smy * 0.06 * par);

    // lamp
    const lvl = lampLevel(t, dt);
    lamp.intensity = 1.6 * lvl;
    bulbMat.emissiveIntensity = 2.2 * lvl;
    if (!reduceMotion) {
      bulbPivot.rotation.z = Math.sin(t * 0.55) * 0.035;
      bulbPivot.rotation.x = Math.sin(t * 0.41 + 1) * 0.025;
    }

    // HDD activity
    hddTimer -= dt;
    powerBtn.position.z = POWER_Z - (now - pressT < 140 ? 0.004 : 0);
    if (hddTimer <= 0) { ledHdd.emissiveIntensity = pcOn && Math.random() < 0.3 ? 2 : 0; hddTimer = 0.05 + Math.random() * (screenMode === "post" ? 0.1 : 0.9); }

    // screen state: POST kicks in when we're nose-to-glass
    if (prog > 0.97 && !nearBoot) {
      nearBoot = true;
      if (pcOn) { screenMode = "post"; postStart = now; } else setPower(true);
    }
    if (prog < 0.9) nearBoot = false;
    const glowK = pcOn ? Math.min(1, (now - powerChanged) / 400) : 0;
    screenGlow.intensity = (0.45 + Math.sin(t * 60) * 0.02) * (screenMode === "post" ? 0.7 : 1) * glowK;
    const covered = window.RetroOS && window.RetroOS.covering;
    if (!covered && now - lastDraw > 66) { drawScreen(now); lastDraw = now; }

    // POST finished while we're at the glass: hand over to the OS layer
    if (!osShown && pcOn && screenMode === "post" && prog > 0.97 &&
        (now - postStart) / 1000 > POST.length / 4.5 + 0.9) {
      osShown = true;
      window.RetroOS && window.RetroOS.boot();
    }

    hint.style.opacity = String(Math.max(0, 1 - prog * 12));

    if (!(window.RetroOS && window.RetroOS.covering)) renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  let osShown = false;
  addEventListener("retro-os-exit", () => { osShown = false; screenMode = "prompt"; });
  drawScreen(performance.now());
  requestAnimationFrame(frame);
  setTimeout(() => document.getElementById("loader").classList.add("gone"), 300);
})();
