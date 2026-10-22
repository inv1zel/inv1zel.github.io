(() => {
gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const PI = Math.PI;

/* ================= state ================= */
// S is scrubbed by scroll (fold: 0 = open flat, π = closed); I is the one-off intro.
const S = {rotY:-0.38, rotX:0.06, fold:0.18, px:0.35, py:0, cz:10.5, cy:0.45, ly:0, mode:0, glow:1, r:255, g:90, b:31};
const I = {k:0, on:0};

/* ================= three ================= */
const canvas = $('#gl');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
const MOB = matchMedia('(max-width: 760px), (pointer: coarse)').matches;
renderer.setPixelRatio(Math.min(devicePixelRatio, MOB ? 1.5 : 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
{
  const env = new THREE.Scene(); env.background = new THREE.Color(0x060607);
  const panel = (x,y,z,w,h,v) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({color:new THREE.Color(v,v,v), side:THREE.DoubleSide})); m.position.set(x,y,z); m.lookAt(0,0,0); env.add(m); };
  panel(0,7,1,9,6,2.2); panel(-7,2,4,3,7,1.3); panel(7,1.5,-3,3,7,1.0); panel(0,0.5,8,12,1.2,0.7); panel(0,-6,0,10,10,0.08); panel(2,1,-8,6,4,0.6);
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(env, 0.03).texture;
}
const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(-3,6,5); scene.add(key);
const accentLight = new THREE.PointLight(0xff5a1f, 6, 7, 2); scene.add(accentLight);

// rig: pivot (scroll rotation) > inner (recentres as it folds) > R half (fixed), C half and hinge (rotate about the fold axis x=0,z=0)
const pivot = new THREE.Group(); scene.add(pivot);
const inner = new THREE.Group(); pivot.add(inner);
const halfR = new THREE.Group(), halfC = new THREE.Group(), hinge = new THREE.Group();
inner.add(halfR, halfC, hinge);

const lin = (r,g,b) => new THREE.Color(r,g,b);
const FINISH = {
  white: {back: lin(.80,.78,.70), frame: lin(.67,.67,.67)},
  black: {back: lin(.035,.036,.04), frame: lin(.12,.12,.13)},
  blue:  {back: lin(.48,.62,.82), frame: lin(.55,.62,.72)}
};
const M = {
  back:    new THREE.MeshStandardMaterial({color:FINISH.white.back.clone(), metalness:.25, roughness:.6}),
  frame:   new THREE.MeshStandardMaterial({color:FINISH.white.frame.clone(), metalness:.97, roughness:.24}),
  frameHi: new THREE.MeshStandardMaterial({color:0x3a3b3f, metalness:.2, roughness:.6}),
  black:   new THREE.MeshStandardMaterial({color:0x010101, metalness:0, roughness:.45, envMapIntensity:.35}),
  glass:   new THREE.MeshStandardMaterial({color:0xffffff, metalness:1, roughness:0, transparent:true, opacity:.12, depthWrite:false}),
  cam:     new THREE.MeshStandardMaterial({roughness:.35, metalness:0})
};
const MAT_BY = {'apple-material':M.back, 'apple-material-sides':M.frame, 'apple-material-sides-lighter':M.frameHi, 'less-black':M.black, 'black':M.black, 'glass':M.glass, 'screen':M.cam};

/* ================= screens (canvas) ================= */
const mkCanvas = (w,h) => { const c=document.createElement('canvas'); c.width=w; c.height=h; return c; };
// inner display: 3.36 × 2.354 units across both halves
const IW=1280, IH=Math.round(1280*2.354/3.36);
const inC = mkCanvas(IW,IH), ic = inC.getContext('2d'), inC2 = mkCanvas(IW,IH), ic2 = inC2.getContext('2d');
const inTex = new THREE.CanvasTexture(inC); inTex.encoding = THREE.sRGBEncoding; inTex.anisotropy = 8;
const inMat = new THREE.MeshBasicMaterial({map:inTex, toneMapped:false, transparent:true});
function halfPlane(left){
  const g = new THREE.PlaneGeometry(1.68, 2.354); const uv = g.attributes.uv;
  for(let i=0;i<uv.count;i++) uv.setX(i, uv.getX(i)*.5 + (left?0:.5));
  const m = new THREE.Mesh(g, inMat); m.position.set(left?-0.84:0.84, 0, 0.0025); return m;
}
const scrL = halfPlane(true), scrR = halfPlane(false);
// cover display: on the back of the R half
const CW=640, CH=Math.round(640*2.39/1.643);
const cvC = mkCanvas(CW,CH), cc = cvC.getContext('2d');
const cvTex = new THREE.CanvasTexture(cvC); cvTex.encoding = THREE.sRGBEncoding; cvTex.anisotropy = 8;
const cvMat = new THREE.MeshBasicMaterial({map:cvTex, toneMapped:false, transparent:true});
const cover = new THREE.Mesh(new THREE.PlaneGeometry(1.643, 2.39), cvMat); cover.rotation.y = PI; cover.position.set(-0.8757, 0, -0.1085);

function roundRect(x,X,Y,w,h,r,keep){ if(!keep) x.beginPath(); x.moveTo(X+r,Y); x.arcTo(X+w,Y,X+w,Y+h,r); x.arcTo(X+w,Y+h,X,Y+h,r); x.arcTo(X,Y+h,X,Y,r); x.arcTo(X,Y,X+w,Y,r); x.closePath(); }
// r: outer corners (right), rl: corners on the left edge — 0 where the glass meets the hinge square
function frameMask(c,w,h,r,hx,hy,hr,rl=r){ c.save(); c.globalCompositeOperation='destination-out'; c.beginPath(); c.rect(0,0,w,h);
  c.moveTo(rl,0); c.arcTo(w,0,w,h,r); c.arcTo(w,h,0,h,r); if(rl){ c.arcTo(0,h,0,0,rl); c.arcTo(0,0,w,0,rl); } else { c.lineTo(0,h); c.lineTo(0,0); } c.closePath(); c.fill('evenodd'); c.restore(); c.save(); c.fillStyle='#000'; c.beginPath(); c.arc(hx,hy,hr,0,7); c.fill(); c.restore(); }
const rgba = a => `rgba(${S.r|0},${S.g|0},${S.b|0},${a})`;
function wallpaper(c,w,h,t){
  c.fillStyle='#030304'; c.fillRect(0,0,w,h);
  c.globalCompositeOperation='lighter';
  let g=c.createRadialGradient(w*.28+Math.sin(t*.3)*60,h*.92,0,w*.28,h*.92,Math.max(w,h)*.75);
  g.addColorStop(0,rgba(.95)); g.addColorStop(.35,rgba(.35)); g.addColorStop(1,rgba(0)); c.fillStyle=g; c.fillRect(0,0,w,h);
  g=c.createRadialGradient(w*.85,h*.1,0,w*.85,h*.1,Math.max(w,h)*.6); g.addColorStop(0,'rgba(70,60,140,.45)'); g.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=g; c.fillRect(0,0,w,h);
  for(let k=0;k<6;k++){ c.beginPath(); for(let xx=-20;xx<=w+20;xx+=24){ const yy=h*.5+k*h*.045+Math.sin(xx*.0045*(1280/w)+t*.45+k*.7)*h*.08; xx<0?c.moveTo(xx,yy):c.lineTo(xx,yy);} c.strokeStyle=`rgba(255,255,255,${.035+k*.012})`; c.lineWidth=h*.05; c.stroke(); }
  c.globalCompositeOperation='source-over';
}
const clock2 = () => { const d=new Date(); return [String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'), d.toLocaleDateString('en-GB',{weekday:'long', day:'numeric', month:'long'})]; };
function drawLock(c,w,h,t){
  wallpaper(c,w,h,t); const [tm,dt]=clock2();
  c.textAlign='center'; c.fillStyle='rgba(255,255,255,.75)'; c.font='500 30px Geist, sans-serif'; c.fillText(dt, w/2, 150);
  c.fillStyle='rgba(255,255,255,.95)'; c.font='800 230px Archivo, sans-serif'; c.fillText(tm, w/2, 360);
  // widgets across the fold
  [[w*.08,'Weather','18°','Partly cloudy'],[w*.56,'Next up','14:30','Design review']].forEach(([x,k,v,s])=>{ c.fillStyle='rgba(255,255,255,.1)'; roundRect(c,x,h*.62,w*.36,h*.24,28); c.fill();
    c.textAlign='left'; c.fillStyle='rgba(255,255,255,.6)'; c.font='500 22px Geist, sans-serif'; c.fillText(k,x+28,h*.62+44);
    c.fillStyle='#fff'; c.font='800 64px Archivo, sans-serif'; c.fillText(v,x+26,h*.62+120); c.fillStyle='rgba(255,255,255,.7)'; c.font='500 20px Geist, sans-serif'; c.fillText(s,x+28,h*.62+156); });
}
function tc(f){ const FF=f%24, s=Math.floor(f/24), ss=s%60, m=Math.floor(s/60)%60, hh=Math.floor(s/3600); return [hh,m,ss,FF].map(n=>String(n).padStart(2,'0')).join(':'); }
const CLIPS=[[[0,.22,0],[.24,.3,0],[.56,.18,0],[.76,.24,0]],[[.1,.26,1],[.4,.34,1],[.8,.18,1]],[[.05,.15,2],[.32,.12,2],[.6,.28,2]]];
function drawSplit(c,w,h,t){
  c.fillStyle='#0b0b0e'; c.fillRect(0,0,w,h);
  const half=w/2, pad=26;
  // left app: viewer + timeline
  c.save(); roundRect(c,pad,pad+30,half-pad*1.5,h*.42,18); c.clip(); c.translate(pad,pad+30); wallpaper(c,half,h*.42,t*1.6); c.restore();
  c.fillStyle='rgba(255,255,255,.75)'; c.font='500 16px "Geist Mono", monospace'; c.textAlign='left'; c.fillText('CLIP_0412 · 4K · HDR', pad+18, pad+30+h*.42-18);
  const ty=h*.58, tw=half-pad*1.5, cols=[rgba(.85),'#5b7cff','#9b6bff'];
  CLIPS.forEach((row,r)=>{ const yy=ty+r*58; c.fillStyle='#16161b'; roundRect(c,pad,yy,tw,48,8); c.fill();
    row.forEach(([s,l,ci])=>{ c.fillStyle=cols[ci]; c.globalAlpha=.85; roundRect(c,pad+s*tw+2,yy+3,l*tw-4,42,7); c.fill(); c.globalAlpha=1; }); });
  const ay=ty+3*58; c.fillStyle='#16161b'; roundRect(c,pad,ay,tw,48,8); c.fill(); c.fillStyle='#3ddc84';
  for(let xx=0;xx<tw;xx+=6){ const a=Math.abs(Math.sin(xx*.03)*Math.sin(xx*.007+1))*18+3; c.fillRect(pad+xx, ay+24-a, 3, a*2); }
  const ph=pad+((t*50)%tw); c.fillStyle='#fff'; c.fillRect(ph, ty-10, 2, 4*58+4);
  // right app: export panel
  const ix=half+pad*.5, iw=half-pad*1.5; c.fillStyle='#15151a'; roundRect(c,ix,pad+30,iw,h-pad*2-30,22); c.fill();
  c.fillStyle='rgba(255,255,255,.5)'; c.font='500 18px Geist, sans-serif'; c.fillText('EXPORT', ix+30, pad+80);
  c.fillStyle='#fff'; c.font='700 32px Archivo, sans-serif'; c.fillText('4K ProRes · Log', ix+30, pad+124);
  c.font='500 72px "Geist Mono", monospace'; c.fillText(tc(2*60*24+41*24+Math.floor(t*24)), ix+26, pad+230);
  const p=(t*.05)%1; c.fillStyle='#26262d'; roundRect(c,ix+30,pad+268,iw-60,16,8); c.fill(); c.fillStyle=rgba(1); roundRect(c,ix+30,pad+268,(iw-60)*p+16,16,8); c.fill();
  c.fillStyle='rgba(255,255,255,.55)'; c.font='500 18px Geist, sans-serif'; c.fillText(`${Math.round(p*100)}% · ${Math.max(1,Math.round((1-p)*60))} s left`, ix+30, pad+318);
  [['Frames / s', String(Math.round(58+Math.sin(t*3)*2))],['Neural Engine', Math.round(62+Math.sin(t*1.3)*9)+' %'],['Temperature', 'Cool']].forEach(([k,v],i)=>{
    const yy=pad+400+i*62; c.fillStyle='#24242b'; c.fillRect(ix+30,yy-36,iw-60,1);
    c.fillStyle='rgba(255,255,255,.5)'; c.textAlign='left'; c.font='500 20px Geist, sans-serif'; c.fillText(k, ix+30, yy); c.fillStyle='#fff'; c.textAlign='right'; c.font='500 20px "Geist Mono", monospace'; c.fillText(v, ix+iw-30, yy); });
  c.textAlign='left';
}
function drawFlex(c,w,h,t){
  // half-open: a video call on one side, controls on the other
  c.fillStyle='#06070b'; c.fillRect(0,0,w,h);
  const half=w/2;
  c.save(); roundRect(c,22,22,half-44,h-44,26); c.clip(); c.translate(22,22); wallpaper(c,half-44,h-44,t*1.2);
  c.fillStyle='rgba(255,255,255,.9)'; c.beginPath(); c.arc((half-44)/2,(h-44)*.42,90,0,7); c.fill();
  c.fillStyle=rgba(.9); c.font='800 80px Archivo, sans-serif'; c.textAlign='center'; c.fillText('MK', (half-44)/2, (h-44)*.42+28);
  c.fillStyle='#fff'; c.font='600 30px Geist, sans-serif'; c.fillText('Maya K.', (half-44)/2, (h-44)*.42+160);
  c.fillStyle='rgba(255,255,255,.7)'; c.font='500 22px "Geist Mono", monospace'; c.fillText(tc(Math.floor(t*24)+24*125).slice(3,8), (half-44)/2, (h-44)*.42+200);
  c.restore();
  c.textAlign='left'; c.fillStyle='rgba(255,255,255,.5)'; c.font='500 20px Geist, sans-serif'; c.fillText('FLEX MODE · 92°', half+40, 80);
  c.fillStyle='#fff'; c.font='800 150px Archivo, sans-serif'; c.fillText('92°', half+34, 240);
  const btn=[['Mute','#2a2b33'],['Camera','#2a2b33'],['Share','#2a2b33'],['End',rgba(1)]];
  btn.forEach(([l,col],i)=>{ const x=half+40+(i%2)*((half-100)/2+20), y=320+Math.floor(i/2)*150; c.fillStyle=col; roundRect(c,x,y,(half-100)/2,120,30); c.fill(); c.fillStyle='#fff'; c.font='600 26px Geist, sans-serif'; c.fillText(l,x+30,y+70); });
  c.beginPath(); for(let xx=0;xx<=half-80;xx+=6){ const v=.5+.35*Math.sin(xx*.03-t*4)*Math.sin(xx*.007+t); c.lineTo(half+40+xx, h-80-v*60);} c.strokeStyle=rgba(.9); c.lineWidth=4; c.stroke();
}
function drawBattery(c,w,h,t){
  wallpaper(c,w,h,t);
  const bw=Math.min(380,w*.6),bh=bw*.42,bx=w/2-bw/2,by=h/2-bh/2-40;
  c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=8; roundRect(c,bx,by,bw,bh,bh*.22); c.stroke();
  c.fillStyle='rgba(255,255,255,.9)'; roundRect(c,bx+bw+10,by+bh/2-bh*.16,14,bh*.32,6); c.fill();
  c.fillStyle=rgba(1); roundRect(c,bx+16,by+16,bw-32,bh-32,bh*.14); c.fill();
  c.textAlign='center'; c.fillStyle='#fff'; c.font=`800 ${Math.round(bw*.32)}px Archivo, sans-serif`; c.fillText('100%', w/2, by+bh+bw*.38);
  c.fillStyle='rgba(255,255,255,.7)'; c.font=`500 ${Math.round(bw*.065)}px Geist, sans-serif`; c.fillText('Up to 30 hr of video', w/2, by+bh+bw*.52);
}
function drawCover(c,w,h,t){
  if(S.mode>=2.5){ drawBattery(c,w,h,t); }
  else { wallpaper(c,w,h,t); const [tm,dt]=clock2(); c.textAlign='center'; c.fillStyle='rgba(255,255,255,.75)'; c.font='500 26px Geist, sans-serif'; c.fillText(dt, w/2, 150); c.fillStyle='#fff'; c.font='800 150px Archivo, sans-serif'; c.fillText(tm, w/2, 290); }
  frameMask(c,w,h,74,w*.86,h*.055,20,0);
}
const MODES=[drawLock, drawSplit, drawFlex, drawBattery];
function drawInner(t){
  const m=Math.max(0,Math.min(MODES.length-1,S.mode)), a=Math.floor(m), f=m-a;
  MODES[a](ic,IW,IH,t);
  if(f>0.01 && MODES[a+1]){ MODES[a+1](ic2,IW,IH,t); ic.globalAlpha=f; ic.drawImage(inC2,0,0); ic.globalAlpha=1; }
  frameMask(ic,IW,IH,72,IW*.955,IH*.07,18);
  inTex.needsUpdate=true;
}

/* ================= model ================= */
let ready=false;
(async () => {
  try {
    const res = await fetch('duo.bin'); if (!res.ok) throw new Error(res.status);
    const buf = await res.arrayBuffer(), hl = new DataView(buf).getUint32(0, true);
    const head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 4, hl)));
    const off = 4 + hl + ((4 - (hl + 4) % 4) % 4);
    const camTex = new THREE.TextureLoader().load('duo-cam.jpg'); camTex.encoding = THREE.sRGBEncoding; camTex.anisotropy = 8; camTex.flipY = true;
    M.cam.map = camTex; M.cam.needsUpdate = true;
    for (const e of head.parts) {
      const [grp, mat, tag] = e.name.split('|');
      if (mat === 'screen' && (tag === 'fold' || tag === 'cover')) continue;   // replaced by live canvases
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(buf, off + e.pos, e.count * 3), 3));
      g.setAttribute('normal', new THREE.BufferAttribute(new Int8Array(buf, off + e.nor, e.count * 3), 3, true));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(buf, off + e.uv, e.count * 2), 2));
      g.setIndex(new THREE.BufferAttribute(e.u32 ? new Uint32Array(buf, off + e.ind, e.icount) : new Uint16Array(buf, off + e.ind, e.icount), 1));
      const mesh = new THREE.Mesh(g, MAT_BY[mat] || M.frame);
      if (mat === 'glass') mesh.renderOrder = 2;
      ({R:halfR, C:halfC, H:hinge})[grp].add(mesh);
    }
    halfR.add(scrL, cover); halfC.add(scrR);
    ready = true;
  } catch (err) { console.warn('Model failed to load:', err); }
})();

// floor glow, always facing the camera
function glowTex(){ const c=mkCanvas(256,256), x=c.getContext('2d'); const g=x.createRadialGradient(128,128,0,128,128,128); g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(.35,'rgba(255,255,255,.35)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); }
const glowMat = new THREE.MeshBasicMaterial({map:glowTex(), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, toneMapped:false});
const glow = new THREE.Mesh(new THREE.PlaneGeometry(9,2.4), glowMat); scene.add(glow);

/* ================= callouts ================= */
const ANCHORS=[
  [halfC, new THREE.Vector3(0.95,1.27,-0.05)],  // top side button
  [halfC, new THREE.Vector3(1.76,-0.55,-0.05)], // outer frame
  [halfC, new THREE.Vector3(1.77,0.5,-0.05)],   // action button
  [hinge, new THREE.Vector3(0,0.95,-0.02)],
  [halfR, new THREE.Vector3(-0.4,-0.6,0.01)],
  [halfC, new THREE.Vector3(1.2,-1.05,0.0)]
];
const coEls = $$('.co'); const v3 = new THREE.Vector3();

/* ================= render ================= */
let vw=0, vh=0;
function resize(){ vw=innerWidth; vh=innerHeight; renderer.setSize(vw,vh,false); camera.aspect=vw/vh; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const clock = new THREE.Clock(); const root=document.documentElement;
let stageOn = true, lastDraw = -1;
new IntersectionObserver(([e]) => { stageOn = e.isIntersecting; }).observe($('#stage'));
const nR = new THREE.Vector3(), toCam = new THREE.Vector3(), wp = new THREE.Vector3();
const facing = (obj, group, z) => { obj.getWorldPosition(wp); toCam.copy(camera.position).sub(wp); return nR.set(0,0,z).transformDirection(group.matrixWorld).dot(toCam) > 0; };
function render(){
  if (!stageOn) return;
  const t = clock.getElapsedTime(); const mob = vw < 760;
  camera.position.set(0, S.cy + (mob ? 0.4 : 0), mob ? Math.max(S.cz, 9.5) * 2.15 : S.cz);  // no screen dive on phones camera.lookAt(0, S.ly + (mob ? -0.6 : 0), 0);
  const fold = PI - (PI - S.fold) * I.k;
  halfC.rotation.y = -fold; hinge.rotation.y = -fold/2;
  inner.position.x = 0.86 * fold / PI;
  pivot.rotation.set(S.rotX, S.rotY + (reduce?0:Math.sin(t*.5)*.02), 0);
  pivot.position.set(mob ? 0 : S.px, S.py + (mob ? 1.25 : 0) + (reduce?0:Math.sin(t*.8)*.02), 0);  // phones: lift the model above the copy
  const on = I.on; inMat.color.setScalar(on); cvMat.color.setScalar(on);
  const col = new THREE.Color(S.r/255, S.g/255, S.b/255);
  root.style.setProperty('--accent', `rgb(${S.r|0},${S.g|0},${S.b|0})`);
  glowMat.color.copy(col).multiplyScalar(0.9 * S.glow * (0.3 + 0.7*I.on));
  accentLight.color.copy(col); accentLight.intensity = 5 * I.on;
  scene.updateMatrixWorld();
  glow.position.set(pivot.position.x, pivot.position.y - 1.4, -1.2); glow.quaternion.copy(camera.quaternion); glow.scale.set(mob ? 0.5 : 1, mob ? 0.8 : 1, 1);
  accentLight.position.set(pivot.position.x, pivot.position.y - 1.3, 1.8);
  // screens redraw at ~30 fps, and only the ones the camera can see
  if (ready && on > 0.01 && t - lastDraw > 1/30) { lastDraw = t;
    if (fold < 3.0 && (facing(scrL, halfR, 1) || facing(scrR, halfC, 1))) drawInner(t);
    if (facing(cover, halfR, -1)) { drawCover(cc,CW,CH,t); cvTex.needsUpdate = true; } }
  for(const el of coEls){ if(!(parseFloat(el.parentElement.style.opacity)>0)) continue; const [g,p]=ANCHORS[+el.dataset.a]; v3.copy(p); g.localToWorld(v3); v3.project(camera);
    el.style.transform = `translate(${(v3.x+1)/2*vw}px, ${(1-v3.y)/2*vh}px)`; }
  renderer.render(scene, camera);
}
gsap.ticker.add(render);

/* ================= smooth scroll ================= */
let lenis = null;
if(!reduce && window.Lenis){ lenis = new Lenis({lerp:0.085, wheelMultiplier:0.9}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }

/* ================= scroll timeline (0 → 100) ================= */
const tl = gsap.timeline({defaults:{ease:'none'}, scrollTrigger:{trigger:'#track', start:'top top', end:'bottom bottom', scrub:reduce?true:0.9}});
const HIDE = {autoAlpha:0, y:50, '--b':14, '--ab':10};
const SHOW = {autoAlpha:1, y:0, '--b':0, '--ab':0};
const kids = sel => `${sel} .fx, ${sel} .copy, ${sel} .row, ${sel} .specs, ${sel} .swatches, ${sel} .meta`;
const inn = (sel, at, d=3) => tl.fromTo(kids(sel), {...HIDE}, {...SHOW, duration:d, stagger:.35, ease:'power2.out'}, at);
const out = (sel, at, d=2.5) => tl.to(`${kids(sel)}, ${sel} > .hero-in`, {autoAlpha:0, y:-40, '--b':14, '--ab':10, duration:d, stagger:.15, ease:'power1.in'}, at);
const move = (o, at, d=7) => tl.to(S, {...o, duration:d, ease:'power2.inOut'}, at);
const tint = (rgb, at, d=4) => tl.to(S, {r:rgb[0], g:rgb[1], b:rgb[2], duration:d}, at);
const fmt = (v, dec) => dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
const count = (sel, to, at, d=7, dec=0) => { const el=$(sel), o={v:0}; tl.fromTo(o, {v:0}, {v:to, duration:d, ease:'power1.out', onUpdate:()=>el.textContent=fmt(o.v,dec)}, at); };
const show = (sel, a, b) => { tl.fromTo(sel, {autoAlpha:0}, {autoAlpha:1, duration:1.5}, a); tl.to(sel, {autoAlpha:0, duration:1.5}, b); };

// 1 — hero: open, three-quarter
out('.p-hero', 7); out('.p-hero-meta', 7);
tl.to('.bigword', {yPercent:-40, opacity:0, '--b':18, duration:5, ease:'power1.in'}, 8);

// 2 — design: edge-on, slightly folded so the hinge reads
move({rotY:-1.32, rotX:0.14, fold:0.55, px:1.15, cz:8.6, cy:0.4, ly:0}, 9);
tint([214,218,226], 10);
inn('.p-design', 13); count('#n-thick', 5.6, 13, 8, 1);
show('#co-side', 16.5, 25.5);
out('.p-design', 26);

// 3 — display: flat and square to camera, then dive into the split view
move({rotY:0, rotX:0.02, fold:0, px:1.2, cz:10.2, cy:0.35, ly:0}, 27);
tint([255,190,110], 28);
inn('.p-display1', 31); count('#n-nits', 3000, 31, 7);
out('.p-display1', 38);
move({cz:6.9, cy:0.1, ly:0.05, px:0.72}, 38, 6);
tl.to(S, {mode:1, duration:2.5}, 39.5);
inn('.p-display2', 41.5);
out('.p-display2', 46.5);

// 4 — hinge: warm orb hands over to blue, phone stands in flex mode
tl.fromTo('.orb', {autoAlpha:0, scale:.3}, {autoAlpha:1, scale:1.1, duration:3, immediateRender:false}, 47);
tl.to('.orb', {autoAlpha:0, scale:2.2, duration:3}, 50.5);
move({cz:9.4, cy:0.7, ly:0, px:-1.1, rotY:-0.15, rotX:0.18, fold:1.45}, 47);
tint([64,112,255], 49);
tl.to(S, {mode:2, duration:2}, 49);
inn('.p-hinge', 52); count('#n-folds', 200000, 52, 7);
show('#co-hinge', 55, 62.5);
out('.p-hinge', 63);

// 5 — finishes: closed, camera side towards us
move({fold:PI, rotY:0.42, rotX:0.08, px:1.15, cz:8.4, cy:0.35, ly:0}, 64);
tint([196,190,176], 65);
inn('.p-finish', 68);
out('.p-finish', 77);

// 6 — battery: spin to the cover display, the big word returns, light cycles
move({rotY:PI-0.32, rotX:0.06, px:0, cz:8.8, cy:0.35, ly:0}, 78);
tl.to(S, {mode:3, duration:2}, 80);
tint([255,90,31], 79, 3);
tl.fromTo('.bigword', {yPercent:40, opacity:0, '--b':18}, {yPercent:0, opacity:1, '--b':0, duration:5, ease:'power2.out', immediateRender:false}, 80);
inn('.p-batt-num', 83); count('#n-hours', 30, 83, 6);
inn('.p-batt-title', 84); inn('.p-batt-cta', 85);
tint([236,236,242], 88, 2); tint([255,178,40], 92, 2); tint([61,220,132], 96, 3);
tl.to('#stage', {opacity:.35, duration:3}, 97);
tl.set({}, {}, 100);

/* ================= intro: closed → unfolds ================= */
const intro = gsap.timeline({delay:.2});
intro.to('.boot', {autoAlpha:0, duration:.8, ease:'power1.out'})
  .to(I, {on:1, duration:reduce?0:.9, ease:'power2.out'}, .4)
  .to(I, {k:1, duration:reduce?0:2.2, ease:'power3.inOut'}, .9)
  .from('.bigword', {yPercent:25, opacity:0, '--b':24, duration:reduce?0:1.6, ease:'power3.out'}, 1.4)
  .from('.hero-in', {autoAlpha:0, y:40, '--b':12, duration:reduce?0:1.1, stagger:.12, ease:'power2.out'}, 2.4);
gsap.set('.hero-in', {'--b':0});
$$('.hero-in').forEach(el=>el.style.filter='blur(calc(var(--b,0)*1px))');

/* ================= compare scramble ================= */
function scramble(el, delay){
  const fin=el.dataset.v, len=fin.length; let n=0;
  gsap.fromTo(el, {'--b':10, '--ab':8}, {'--b':0, '--ab':0, duration:.9, delay, ease:'power2.out'});
  el.classList.add('fx');
  setTimeout(function tick(){ n++; if(n>16){ el.textContent=fin; return; }
    el.textContent=[...fin].map((ch,i)=>/\d/.test(ch)&&i>=n/16*len?String(Math.random()*10|0):ch).join(''); setTimeout(tick,45); }, delay*1000);
}
ScrollTrigger.create({trigger:'#compare', start:'top 70%', once:true, onEnter(){
  gsap.fromTo('#cmp-title', {'--b':12,'--ab':10, y:30, autoAlpha:0}, {'--b':0,'--ab':0, y:0, autoAlpha:1, duration:1, ease:'power2.out'});
  $$('.val').forEach((el,i)=>scramble(el, .15+(i%5)*.06+Math.floor(i/5)*.08));
}});

/* ================= interactions ================= */
const toPos = p => { const tr=$('#track'); return tr.offsetTop + (tr.offsetHeight-innerHeight)*p/100; };
const go = y => lenis ? lenis.scrollTo(y,{duration:2}) : scrollTo({top:y, behavior:reduce?'auto':'smooth'});
$$('[data-go]').forEach(a=>a.addEventListener('click', e=>{ e.preventDefault(); go(toPos(+a.dataset.go)); }));
$$('a[href="#compare"]').forEach(a=>a.addEventListener('click', e=>{ e.preventDefault(); go($('#compare').offsetTop); }));
$$('.sw').forEach(b=>b.addEventListener('click', ()=>{
  $$('.sw').forEach(x=>x.setAttribute('aria-pressed', String(x===b)));
  const f=FINISH[b.dataset.finish], d=reduce?0:.9;
  gsap.to(M.back.color, {r:f.back.r, g:f.back.g, b:f.back.b, duration:d, ease:'power2.inOut'});
  gsap.to(M.frame.color, {r:f.frame.r, g:f.frame.g, b:f.frame.b, duration:d, ease:'power2.inOut'});
}));
const toast=$('#toast'); let tt;
$$('.js-buy').forEach(b=>b.addEventListener('click', ()=>{ toast.classList.add('on'); clearTimeout(tt); tt=setTimeout(()=>toast.classList.remove('on'), 2200); }));
document.fonts && document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
