/* ═══════════════════════════════════════════════════
   app.js — ChatbotAI 3D · Bilingual Edition
   Idiomas: ES / EN  |  Modelo 3D: GLB via GLTFLoader
   NLP: Xenova/all-MiniLM-L6-v2 (ONNX q8, ~23MB)
═══════════════════════════════════════════════════ */
  
let dia = {
  pasto: 0x000500,
  cielo: 0x4da6ff
}
let noche = {
  pasto: 0x000005,
  cielo: 0x050a1a
}
// ── TEXTOS UI POR IDIOMA ────────────────────────────
const UI_STRINGS = {
  es: {
    welcome:          '¡Hola! Soy Loola, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
    placeholder:      'Escribe un mensaje...',
    noAnswer:         'No tengo información sobre eso todavía.',
    tabChat:          'Chat',
    tabTrain:         'Entrenar',
    tabSettings:      'Ajustes',
    trainLabel:       'Nueva entrada',
    trainQ:           '¿Cuál es el horario de atención?',
    trainQHint:       'Separa variaciones con | para mayor precisión',
    trainA:           'Atendemos lunes a viernes de 8am a 6pm.',
    trainALabel:      'Respuesta',
    trainQLabel:      'Pregunta / Mensaje',
    trainBtn:         'Agregar',
    customLabel:      'Entradas personalizadas',
    emptyEntries:     '¡Aún no has agregado nada. Entrena al asistente!',
    dangerLabel:      'Restaurar base de fábrica',
    restoreBtn:       'Restaurar',
    sectionModel:     'Modelo 3D',
    uploadModel:      'Cargar archivo .glb',
    clearModel:       'Quitar modelo',
    modelHint:        'Formato GLTF/GLB',
    sectionIdentity:  'Identidad',
    nameLabel:        'Nombre del asistente',
    namePlaceholder:  'Ej: Maya, Asistente, Kiosk...',
    roleLabel:        'Rol / descripción',
    rolePlaceholder:  'Ej: Asistente del Restaurante La Palma',
    welcomeLabel:     'Mensaje de bienvenida',
    sectionVoice:     'Voz (TTS)',
    voiceLabel:       'Voz',
    speedLabel:       'Velocidad',
    pitchLabel:       'Tono',
    testVoice:        'Probar voz',
    saveBtn:          'Guardar cambios',
    agentRole:        'Listo para ayudarte',
    statusInit:       'Iniciando...',
  },
  en: {
    welcome:          'Hello! I\'m Loola, your virtual assistant. How can I help you today?',
    placeholder:      'Type a message...',
    noAnswer:         'I don\'t have information about that yet.',
    tabChat:          'Chat',
    tabTrain:         'Train',
    tabSettings:      'Settings',
    trainLabel:       'New entry',
    trainQ:           'What are your business hours?',
    trainQHint:       'Separate variations with | for better accuracy',
    trainA:           'We are open Monday to Friday from 8am to 6pm.',
    trainALabel:      'Answer',
    trainQLabel:      'Question / Message',
    trainBtn:         'Add',
    customLabel:      'Custom entries',
    emptyEntries:     'Nothing added yet. Start training the assistant!',
    dangerLabel:      'Restore factory defaults',
    restoreBtn:       'Restore',
    sectionModel:     '3D Model',
    uploadModel:      'Load .glb file',
    clearModel:       'Remove model',
    modelHint:        'GLTF/GLB format',
    sectionIdentity:  'Identity',
    nameLabel:        'Assistant name',
    namePlaceholder:  'E.g.: Maya, Assistant, Kiosk...',
    roleLabel:        'Role / description',
    rolePlaceholder:  'E.g.: Restaurant La Palma assistant',
    welcomeLabel:     'Welcome message',
    sectionVoice:     'Voice (TTS)',
    voiceLabel:       'Voice',
    speedLabel:       'Speed',
    pitchLabel:       'Pitch',
    testVoice:        'Test voice',
    saveBtn:          'Save changes',
    agentRole:        'Ready to help you',
    statusInit:       'Starting...',
  }
};
 
// ── ESTADO GLOBAL ──────────────────────────────────
const S = {
  lang: localStorage.getItem('cb3_lang') == null ? 'es' : localStorage.getItem('cb3_lang'),
  settings: {
    name: 'Loola', 
    role: '',
    welcome: (localStorage.getItem('cb3_lang') == null || localStorage.getItem('cb3_lang') == 'es') ? UI_STRINGS.es.welcome : UI_STRINGS.en.welcome,
    voiceName: '', 
    rate: 1.0, 
    pitch: 1.0
  },
  customEntries: { es: [], en: [] },
  speaking: false, listening: false,
  activePanel: 'chat', micTarget: 'chat',
  glbModel: null,       // THREE.Group del modelo cargado
  glbMixer: null,       // AnimationMixer si el GLB tiene animaciones
  glbAnimations: [],
};

 
// ── PERSISTENCIA ───────────────────────────────────
function loadStorage() {
  try {
    const cfg  = localStorage.getItem('cb3_settings');
    if (cfg)  Object.assign(S.settings, JSON.parse(cfg));
    const ent  = localStorage.getItem('cb3_entries_es');
    if (ent)  S.customEntries.es = JSON.parse(ent);
    const ent2 = localStorage.getItem('cb3_entries_en');
    if (ent2) S.customEntries.en = JSON.parse(ent2);
    const lang = localStorage.getItem('cb3_lang');
    if (lang) S.lang = lang;
  } catch(e) {console.log(e)}
}
function saveSettings()     { localStorage.setItem('cb3_settings', JSON.stringify(S.settings)); }
function saveEntries(lang)  { localStorage.setItem(`cb3_entries_${lang}`, JSON.stringify(S.customEntries[lang])); }
function saveLang()         { localStorage.setItem('cb3_lang', S.lang); }
 
// ── NLP ────────────────────────────────────────────
window._DATASET = [];
window._DATASET = S.lang === 'es' ? DATASET_ES : DATASET_EN;

const nlp = new NLPEngine();
 
function initNLP() {
  nlp.onStatus = (state, text, pct) => {
    if (state === 'loading')   { 
      setNLPStatus('loading', text); 
      if (pct !== undefined) setModelProgress(pct, 'model'); 
    }else if (state === 'indexing') { 
      setNLPStatus('loading', text); 
      if (pct !== undefined) setModelProgress(pct, 'index'); 
    }else if (state === 'ready')  { 
      setNLPStatus('ready', text); 
      hideModelProgress(); 
    }else if (state === 'error')  { 
      setNLPStatus('error', text + ' (fallback)'); 
      hideModelProgress(); 
    }
  };
 
  nlp.load(window._DATASET);
 
  nlp.ready.then(() => {
    S.customEntries[S.lang].forEach(e => nlp.train(e.question, e.answer));
  });
}
 
// Recargar NLP al cambiar idioma
async function reloadNLP() {
  // Reiniciar el engine creando una nueva instancia
  window.NLPEngine && (window._nlp_reloading = true);
  window._DATASET = S.lang === 'es' ? DATASET_ES : DATASET_EN;
  
  // Recrear instancia (la anterior queda huérfana, GC la recolectará)
  const fresh = new NLPEngine();
  fresh.onStatus = nlp.onStatus;
  Object.assign(nlp, fresh);
  // Reasignar los prototipos
  Object.setPrototypeOf(nlp, Object.getPrototypeOf(fresh));
 
  nlp.load(window._DATASET);
  nlp.ready.then(() => {
    S.customEntries[S.lang].forEach(e => nlp.train(e.question, e.answer));
  });
}
 
async function getAnswer(query) {
  const exactHit = searchExact(query);
  if (exactHit) return exactHit;
  const result = await nlp.process(query);
  if (result && result.answer) return result.answer;
  return t('noAnswer');
}
 
function searchExact(query) {
  const norm = nlp.normalize(query);
  for (const e of S.customEntries[S.lang]) {
    const vars = e.question.split('|').map(v => nlp.normalize(v.trim()));
    if (vars.includes(norm)) return e.answer;
  }
  return null;
}
 
// ── HELPERS DE IDIOMA ──────────────────────────────
function t(key) { return (UI_STRINGS[S.lang] || UI_STRINGS.es)[key] || key; }
 
function applyLangToUI() {
  // Navegación
  document.querySelector('[data-panel="chat"]').textContent   = t('tabChat');
  document.querySelector('[data-panel="train"]').textContent  = t('tabTrain');
  document.querySelector('[data-panel="settings"]').textContent = t('tabSettings');
 
  // Placeholder input
  document.getElementById('chatInput').placeholder = t('placeholder');
 
  // Panel Train
  document.querySelector('.train-new-label').textContent = t('trainLabel');
  document.querySelector('label[for="trainQ"]').textContent = t('trainQLabel');
  document.getElementById('trainQ').placeholder = t('trainQ');
  document.querySelector('.field-hint-train').textContent   = t('trainQHint');
  document.querySelector('label[for="trainA"]').textContent = t('trainALabel');
  document.getElementById('trainA').placeholder = t('trainA');
  document.getElementById('trainBtn').textContent = t('trainBtn');
  document.querySelector('.custom-entries-label').textContent = t('customLabel');
  document.querySelector('.danger-zone span').textContent     = t('dangerLabel');
  document.getElementById('restoreBtn').textContent          = t('restoreBtn');
 
  // Panel Settings
  document.querySelector('.section-model').textContent       = t('sectionModel');
  document.querySelector('label[for="glbInput"]').textContent = t('uploadModel');
  document.getElementById('clearGlbBtn').textContent         = t('clearModel');
  document.querySelector('.glb-hint').textContent            = t('modelHint');
  document.querySelector('.section-identity').textContent    = t('sectionIdentity');
  document.querySelector('label[for="settingName"]').textContent = t('nameLabel');
  document.getElementById('settingName').placeholder         = t('namePlaceholder');
  document.querySelector('label[for="settingRole"]').textContent = t('roleLabel');
  document.getElementById('settingRole').placeholder         = t('rolePlaceholder');
  document.querySelector('label[for="settingWelcome"]').textContent = t('welcomeLabel');
  document.querySelector('.section-voice').textContent       = t('sectionVoice');
  document.querySelector('label[for="voiceSelect"]').textContent = t('voiceLabel');
  document.querySelector('.label-speed').textContent         = t('speedLabel');
  document.querySelector('.label-pitch').textContent         = t('pitchLabel');
  document.getElementById('testVoiceBtn').textContent        = t('testVoice');
  document.getElementById('saveSettingsBtn').textContent     = t('saveBtn');
 
  // Agent role default
  if (!S.settings.role) {
    document.getElementById('agentRole').textContent = t('agentRole');
  }
 
  // STT language
  if (recognition) recognition.lang = S.lang === 'es' ? 'es-MX' : 'en-US';
 
  renderEntries();
}
 
// ── BARRA DE PROGRESO ──────────────────────────────
function setModelProgress(pct, label) {
  let bar = document.getElementById('modelProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'modelProgressBar';
    bar.style.cssText = `position:fixed;bottom:0;left:0;right:0;height:3px;background:rgba(var(--accent-rgb),.15);z-index:200;`;
    bar.innerHTML = `<div id="modelProgressFill" style="height:100%;width:0%;background:var(--accent);transition:width .3s;"></div>`;
    document.body.appendChild(bar);
  }
  document.getElementById('modelProgressFill').style.width = pct + '%';
}
function hideModelProgress() {
  const bar = document.getElementById('modelProgressBar');
  if (bar) { bar.style.opacity = '0'; setTimeout(() => bar.remove(), 600); }
}
function setNLPStatus(state, text) {
  const led = document.getElementById('nlpLed');
  const txt = document.getElementById('nlpStatus');
  if (led) led.className = `status-led${state==='ready'?' ready':state==='error'?' error':''}`;
  if (txt) txt.textContent = text;
}
 
// ── THREE.JS ESCENA ────────────────────────────────
let threeRenderer, threeScene, threeCamera, threeClock;
 
function initScene(data) {
  const canvas = document.getElementById('bg');
  threeRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeRenderer.setClearColor(data.cielo, 1);
  threeRenderer.shadowMap.enabled = true;
  threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  threeRenderer.toneMappingExposure = 1.4;
 
  threeScene  = new THREE.Scene();
  threeScene.fog = new THREE.FogExp2(0xffffff, 0.015);
 
  threeCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  threeCamera.position.set(0, 1.6, 5.5);
  threeClock  = new THREE.Clock();
 
  // ── ILUMINACIÓN BOSQUE ──────────────────────────
  // Luz ambiental cálida suave
  threeScene.add(new THREE.AmbientLight(data.pasto, 1.8));
 
  // Sol diagonal (luz dorada de amanecer) // LUZ GENERAL
  const sunLight = new THREE.DirectionalLight(0xffffff, 3.5);
  sunLight.position.set(8, 12, 6);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width  = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near   = 0.5;
  sunLight.shadow.camera.far    = 60;
  sunLight.shadow.camera.left   = -15;
  sunLight.shadow.camera.right  = 15;
  sunLight.shadow.camera.top    = 15;
  sunLight.shadow.camera.bottom = -15;
  threeScene.add(sunLight);
  threeScene._sunLight = sunLight;
 
  // Luz de relleno verde-azulada (cielo filtrado por el dosel)
  //const skyFill = new THREE.HemisphereLight(0x5a9e3a, 0x3d2a14, 2.0);
  const skyFill = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.0);
  
  threeScene.add(skyFill);
 
  // Punto de luz cálido para iluminar el modelo GLB
  const modelLight = new THREE.PointLight(0xffffff, 8.0, 12);
  modelLight.position.set(0, 4, 2);
  modelLight.castShadow = false;
  threeScene.add(modelLight);
  threeScene._modelLight = modelLight;
 
  // Luz de contorno suave azul-verde desde atrás
  const rimLight = new THREE.PointLight(0xffffff, 2.5, 18);
  rimLight.position.set(-4, 3, -4);
  threeScene.add(rimLight);
 
  // ── SUELO DEL BOSQUE ────────────────────────────
  const groundGeo = new THREE.PlaneGeometry(60, 60, 30, 30);
  // Pequeñas irregularidades en el suelo
  const gPos = groundGeo.attributes.position;
  for (let i = 0; i < gPos.count; i++) {
    if (Math.abs(gPos.getX(i)) > 2 || Math.abs(gPos.getY(i)) > 2) {
      gPos.setZ(i, (Math.random() - 0.5) * 0.18);
    }
  }
  groundGeo.computeVertexNormals();
  const groundMat = new THREE.MeshStandardMaterial({
    color: data.pasto,
    roughness: 0.95,
    metalness: 0.0,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.0;
  ground.receiveShadow = true;
  threeScene.add(ground);
 
  // ── ARBOLES PROCEDUALES ─────────────────────────
  function makeTree(x, z, heightScale = 1.0) {
    const group = new THREE.Group();
 
    // Tronco
    const trunkH = (1.2 + Math.random() * 0.8) * heightScale;
    const trunkR  = 0.08 + Math.random() * 0.04;
    const trunkGeo = new THREE.CylinderGeometry(trunkR * 0.6, trunkR, trunkH, 7);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0.22 + Math.random()*0.06, 0.14, 0.06),
      roughness: 0.95, metalness: 0.0
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkH / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    group.add(trunk);
 
    // Capas de follaje (conos apilados)
    const foliageColors = [data.pasto, data.pasto, data.pasto, data.pasto, data.pasto];
    const layers = 3 + Math.floor(Math.random() * 2);
    for (let l = 0; l < layers; l++) {
      const r = (1.0 - l * 0.18) * (0.55 + Math.random() * 0.2) * heightScale;
      const h = (0.9 + Math.random() * 0.3) * heightScale;
      const coneGeo = new THREE.ConeGeometry(r, h, 8);
      const coneMat = new THREE.MeshStandardMaterial({
        color: foliageColors[Math.floor(Math.random() * foliageColors.length)],
        roughness: 0.85, metalness: 0.0
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.y = trunkH + l * (h * 0.55) - l * 0.1;
      cone.rotation.y = Math.random() * Math.PI;
      cone.castShadow = true;
      cone.receiveShadow = true;
      group.add(cone);
    }
 
    group.position.set(x, -2.0, z);
    group.rotation.y = Math.random() * Math.PI * 2;
    return group;
  }
 
  // Árboles en anillo alrededor de la cámara
  const treePositions = [
    [-3.5, -4], [3.8, -5], [-5, -7], [5.5, -8],
    [-7, -3],   [7, -4],  [-8, -9], [8.5, -9],
    [-2, -11],  [2.5, -10], [-6, -13], [6, -12],
    [-9, -6],   [9, -7],  [0, -13],
    [-4, -15],  [4.5, -14], [-10, -11], [10, -10],
    [-3, -3.5], [3, -4.5],
  ];
 
  treePositions.forEach(([x, z]) => {
    const scale = 0.7 + Math.random() * 0.8;
    threeScene.add(makeTree(x, z, scale));
  });
 
  // ── ARBUSTOS / PLANTAS BAJAS ────────────────────
  function makeBush(x, z) {
    const group = new THREE.Group();
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.18 + Math.random() * 0.15;
      const geo = new THREE.SphereGeometry(r, 7, 5);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.1 + Math.random()*0.1, 0.35 + Math.random()*0.2, 0.08),
        roughness: 0.9
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random()-0.5)*0.4, r*0.6, (Math.random()-0.5)*0.4);
      mesh.castShadow = true;
      group.add(mesh);
    }
    group.position.set(x, -2.0, z);
    return group;
  }
 
  const bushPositions = [
    [-1.8,-2.5],[2.2,-2.8],[-2.8,-1.8],[2.5,-1.5],
    [-1.2,-3.8],[1.8,-3.5],[-3.5,-3],[3,-3.2],
    [0,-4],[-4,-4.5],[4.2,-4.8],
  ];
  bushPositions.forEach(([x,z]) => threeScene.add(makeBush(x, z)));
 
  // ── PARTÍCULAS (luciérnagas / polvo de luz) ─────
  const N = 300, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random()-.5)*20;
    pos[i*3+1] = Math.random() * 5 - 1.5;
    pos[i*3+2] = (Math.random()-.5)*20;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xb8ff80, size: 0.07,
    transparent: true, opacity: 0.7,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(pGeo, pMat);
  threeScene.add(particles);
  threeScene._particles = particles;
 
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    threeRenderer.setSize(w, h, false);
    threeCamera.aspect = w / h;
    threeCamera.updateProjectionMatrix();
  }
  resize(); window.addEventListener('resize', resize);
 
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - .5) * 2;
    my = (e.clientY / window.innerHeight - .5) * 2;
  });
 
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    const delta = threeClock.getDelta();
    t += 0.008;
 
    // Luciérnagas flotando suavemente
    particles.position.y = Math.sin(t * 0.3) * 0.15;
    particles.rotation.y = t * 0.015;
 
    // Cámara sigue al mouse suavemente
    threeCamera.position.x += (mx * 0.8 - threeCamera.position.x) * 0.03;
    threeCamera.position.y += (1.6 + (-my * 0.4) - threeCamera.position.y) * 0.03;
    threeCamera.lookAt(0, 0.5, 0);
    
    // LUCES DEL SOL
    // Pulso suave de la luz del sol
    threeScene._sunLight.intensity = 5.2 + Math.sin(t * 0.5) * 0.3;
    // Luz del modelo parpadea suavemente cuando habla
    threeScene._modelLight.intensity = S.speaking
      ? 5.0 + Math.sin(t * 8) * 1.2
      : 4.0 + Math.sin(t * 1.5) * 0.4;
    

    // GLB: quieto sobre el suelo, sin rotación, solo animaciones propias si tiene
    if (S.glbModel) {
      if (S.glbMixer) {
        S.glbMixer.update(delta);
      }
      // Sin rotación automática, sin flotación — el modelo queda estático
    }
 
    threeRenderer.render(threeScene, threeCamera);
  }
  animate();
}
 
// ── GLB LOADER (desde File) ────────────────────────
function loadGLB(file) {
  const url = URL.createObjectURL(file);
  const loader = new THREE.GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      // Eliminar modelo anterior
      if (S.glbModel) {
        threeScene.remove(S.glbModel);
        S.glbModel = null; S.glbMixer = null;
      }
 
      const model = gltf.scene;
 
      // Centrar y escalar automáticamente
      const box = new THREE.Box3().setFromObject(model);
      const size   = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size); box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 2.5 / maxDim;
      model.scale.setScalar(scale);
 
      // Posicionar sobre el suelo del bosque (y = -2.0)
      model.position.x = -center.x * scale;
      model.position.z = -center.z * scale;
      // La base del bounding box del modelo se apoya en y = -2.0
      const bottomOffset = (box.min.y - center.y) * scale;
      model.position.y = -2.0 - bottomOffset;
 
      // Habilitar sombras en todos los meshes
      model.traverse(child => {
        if (child.isMesh) {
          // Opcional: ajustar propiedades de materialctan visualmente)
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
 
      // Animaciones
      if (gltf.animations && gltf.animations.length > 0) {
        S.glbMixer = new THREE.AnimationMixer(model);
        S.glbAnimations = gltf.animations;
        const action = S.glbMixer.clipAction(gltf.animations[0]);
        action.play();
      }
 
      threeScene.add(model);
      S.glbModel = model;
      URL.revokeObjectURL(url);
 
      // Mostrar nombre del archivo en settings
      document.getElementById('glbFileName').textContent = file.name;
      document.getElementById('clearGlbBtn').style.display = 'inline-flex';
    },
    (progress) => {
      if (progress.total > 0) {
        const pct = Math.round(progress.loaded / progress.total * 100);
        setModelProgress(pct, 'glb');
      }
    },
    (error) => {
      console.error('[GLB] Error loading model:', error);
      hideModelProgress();
    }
  );
}
 
// ── GLB LOADER (desde URL/ruta) ────────────────────
// Cambia AUTO_GLB_URL por la ruta de tu modelo:
//   Relativa:  './models/agente.glb'
//   Absoluta:  'https://tuservidor.com/agente.glb'
// Para desactivar la carga automática pon: const AUTO_GLB_URL = '';
const AUTO_GLB_URL = './LOOLA.glb';
 
function loadGLBFromURL(url, displayName = '') {
  if (!url) return;
  const loader = new THREE.GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      if (S.glbModel) {
        threeScene.remove(S.glbModel);
        S.glbModel = null; S.glbMixer = null;
      }
 
      const model = gltf.scene;
 
      const box    = new THREE.Box3().setFromObject(model);
      const size   = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size); box.getCenter(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 2.5 / maxDim;
      model.scale.setScalar(scale);
      model.position.x = -center.x * scale;
      model.position.z = -center.z * scale;
      const bottomOffset = (box.min.y - center.y) * scale;
      model.position.y = -2.0 - bottomOffset;
 
      model.traverse(child => {
        if (child.isMesh) {
          child.castShadow    = true;
          child.receiveShadow = true;
        }
      });
 
      if (gltf.animations && gltf.animations.length > 0) {
        S.glbMixer = new THREE.AnimationMixer(model);
        S.glbAnimations = gltf.animations;
        S.glbMixer.clipAction(gltf.animations[0]).play();
      }
 
      threeScene.add(model);
      S.glbModel = model;
      hideModelProgress();
 
      if (displayName) {
        document.getElementById('glbFileName').textContent = displayName;
        document.getElementById('clearGlbBtn').style.display = 'inline-flex';
      }
    },
    (progress) => {
      if (progress.total > 0)
        setModelProgress(Math.round(progress.loaded / progress.total * 100), 'glb');
    },
    (error) => {
      console.warn('[GLB] No se pudo cargar el modelo desde:', url, error);
      hideModelProgress();
    }
  );
}
 
function clearGLB() {
  if (S.glbModel) {
    threeScene.remove(S.glbModel);
    S.glbModel = null; S.glbMixer = null; S.glbAnimations = [];
  }
  document.getElementById('glbFileName').textContent = '';
  document.getElementById('clearGlbBtn').style.display = 'none';
  document.getElementById('glbInput').value = '';
}
 
// ── TTS ────────────────────────────────────────────
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt   = new SpeechSynthesisUtterance(text);
  utt.rate    = 1.0//S.settings.rate;
  utt.pitch   = 1.0//S.settings.pitch;
  utt.lang    = S.lang === 'es' ? 'es-MX' : 'en-US';

  utt.onstart = () => { S.speaking = true; };
  utt.onend   = utt.onerror = () => { S.speaking = false; };
  speechSynthesis.speak(utt);
}
 
function loadVoices() {
  const sel = document.getElementById('voiceSelect');
  const fill = () => {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return;
    sel.innerHTML = voices.map(v =>
      `<option value="${v.name}" ${v.name===S.settings.voiceName?'selected':''}>${v.name} (${v.lang})</option>`
    ).join('');
  };
  fill(); speechSynthesis.onvoiceschanged = fill;
}
 
// ── STT ────────────────────────────────────────────
let recognition = null;
function initSTT() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { document.getElementById('micBtn').style.opacity = '.3'; return; }
  recognition = new SR();
  recognition.continuous = false; recognition.interimResults = true;
  recognition.lang = S.lang === 'es' ? 'es-MX' : 'en-US';
  recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    const isFinal    = e.results[e.results.length - 1].isFinal;
    if (S.micTarget === 'train') {
      document.getElementById('trainQ').value = transcript;
      if (isFinal) stopListening();
    } else {
      document.getElementById('chatInput').value = transcript;
      document.getElementById('sttHint').textContent = isFinal ? '' : '🎙 ' + transcript;
      if (isFinal) { stopListening(); sendMessage(); }
    }
  };
  recognition.onerror = recognition.onend = () => stopListening();
}
function startListening(target = 'chat') {
  if (!recognition || S.listening) return;
  window.speechSynthesis.cancel();
  S.listening = true; S.micTarget = target;
  document.getElementById('micBtn').classList.add('listening');
  document.getElementById('sttHint').textContent = S.lang === 'es' ? '🎙 Escuchando...' : '🎙 Listening...';
  recognition.start();
}
function stopListening() {
  S.listening = false;
  document.getElementById('micBtn').classList.remove('listening');
  document.getElementById('sttHint').textContent = '';
  try { recognition && recognition.stop(); } catch(e) {}
}
 
// ── CHAT ───────────────────────────────────────────
function addMsg(text, role) {
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `<div class="msg-inner"><p style="font-size: 18px !important;">${text}</p></div>`;
  log.appendChild(div); log.scrollTop = log.scrollHeight;
  return div;
}
function showSpeechBubble(text) {
  const bubble = document.getElementById('speechBubble');
  document.getElementById('speechText').textContent = text;
  bubble.style.display = 'block';
  clearTimeout(window._bubbleTimer);
  window._bubbleTimer = setTimeout(() => { bubble.style.display = 'none'; }, 5000);
}
 
async function sendMessage() {
  const inp = document.getElementById('chatInput');
  const q   = inp.value.trim();
  if (!q) return;
  inp.value = '';
 
  addMsg(q, 'user');
  const typing = addMsg('', 'bot typing');
  const answer = await getAnswer(q);
  typing.remove();
  addMsg(answer, 'bot');
  showSpeechBubble(answer);
  speak(answer);
}
 
// ── TRAINING ───────────────────────────────────────
async function addTrainEntry() {
  const q = document.getElementById('trainQ').value.trim();
  const a = document.getElementById('trainA').value.trim();
  if (!q || !a) { alert(S.lang === 'es' ? 'Completa la pregunta y la respuesta.' : 'Fill in the question and the answer.'); return; }
 
  await nlp.train(q, a);
  S.customEntries[S.lang].push({ question: q, answer: a });
  saveEntries(S.lang);
  renderEntries();
  document.getElementById('trainQ').value = '';
  document.getElementById('trainA').value = '';
}
 
window.deleteEntry = async function(i) {
  const removed    = S.customEntries[S.lang].splice(i, 1)[0];
  const utterances = removed.question.split('|').map(v => v.trim());
  await nlp.removeCustom(utterances);
  saveEntries(S.lang);
  renderEntries();
};
 
function renderEntries() {
  const list = document.getElementById('entryList');
  const entries = S.customEntries[S.lang];
  document.getElementById('entryCount').textContent = entries.length;
  if (!entries.length) {
    list.innerHTML = `<div class="empty-entries">${t('emptyEntries')}</div>`;
    return;
  }
  list.innerHTML = entries.map((e, i) => `
    <div class="entry-item">
      <div class="entry-body">
        <div class="entry-q">${e.question.split('|')[0].trim()}</div>
        <div class="entry-a">${e.answer}</div>
      </div>
      <button class="entry-del" onclick="deleteEntry(${i})" title="Delete">×</button>
    </div>
  `).join('');
}
 
function restoreFactory() {
  const msg = S.lang === 'es' ? '¿Restaurar todas las entradas personalizadas?' : 'Restore all custom entries?';
  if (!confirm(msg)) return;
  S.customEntries[S.lang] = [];
  nlp.restore();
  saveEntries(S.lang);
  renderEntries();
  speak(S.lang === 'es' ? 'Base de conocimiento personalizada restaurada.' : 'Custom knowledge base restored.');
}

// ── SETTINGS ───────────────────────────────────────
function applySettingsToUI() {

  document.getElementById('agentName').textContent      = S.settings.name;
  document.getElementById('agentRole').textContent      = S.settings.role || t('agentRole');
  document.getElementById('settingName').value          = S.settings.name;
  document.getElementById('settingRole').value          = S.settings.role;
  document.getElementById('settingWelcome').value       = S.settings.welcome;
  document.getElementById('rateSlider').value           = S.settings.rate;
  document.getElementById('rateVal').textContent        = parseFloat(S.settings.rate).toFixed(1);
  document.getElementById('pitchSlider').value          = S.settings.pitch;
  document.getElementById('pitchVal').textContent       = parseFloat(S.settings.pitch).toFixed(1);
  const firstMsg = document.querySelector('#chatLog .msg.bot .msg-inner p');
  if (firstMsg) firstMsg.textContent = S.settings.welcome || t('welcome');
}
 
// ── CAMBIO DE IDIOMA ───────────────────────────────
async function switchLang(lang) {
  if (lang === S.lang) return;
  S.lang = lang;
  saveLang();
 
  // Actualizar botones de idioma
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
 
  // Actualizar textos UI
  applyLangToUI();
 
  // Actualizar mensaje de bienvenida si es el default
  const welcome = S.settings.welcome || t('welcome');
  const firstMsg = document.querySelector('#chatLog .msg.bot .msg-inner p');
  if (firstMsg) firstMsg.textContent = welcome;
 
  // Recargar NLP con el nuevo dataset
  setNLPStatus('loading', S.lang === 'es' ? 'Cambiando idioma...' : 'Switching language...');
  await reloadNLP();
}
 
// ── PANELS ─────────────────────────────────────────
function switchPanel(name) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-panel="${name}"]`).classList.add('active');
  document.getElementById(`panel-${name}`).classList.add('active');
  S.activePanel = name;
}
 
// ── INIT ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async() => {
  
  loadStorage();
  initScene(Math.random() > 0.5 ? dia : noche);
  initSTT();
  loadVoices();
  initNLP();
  applySettingsToUI();
  applyLangToUI();
  renderEntries();
 
  // Cargar modelo GLB automáticamente desde ruta
  loadGLBFromURL(AUTO_GLB_URL, AUTO_GLB_URL.split('/').pop());
 
  // Marcar idioma activo
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === S.lang);
    b.addEventListener('click', () => {
      switchLang(b.dataset.lang);
      window.location.reload();
    })
  });
 
  // Navegación panels
  document.querySelectorAll('.pill').forEach(btn =>
    btn.addEventListener('click', () => switchPanel(btn.dataset.panel))
  );
 
  // Chat
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  document.getElementById('micBtn').addEventListener('click', () =>
    S.listening ? stopListening() : startListening('chat')
  );
 
  // Train
  document.getElementById('trainBtn').addEventListener('click', addTrainEntry);
  document.getElementById('trainA').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) addTrainEntry();
  });
  document.getElementById('micTrainBtn').addEventListener('click', () => startListening('train'));
  document.getElementById('restoreBtn').addEventListener('click', restoreFactory);
 
  // GLB Loader
  document.getElementById('glbInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    loadGLB(file);
    e.target.value = '';
  });
  document.getElementById('clearGlbBtn').addEventListener('click', clearGLB);
 
  // Settings
  document.getElementById('saveSettingsBtn').addEventListener('click', () => {
    S.settings.name      = document.getElementById('settingName').value.trim()    || 'Asistente';
    S.settings.role      = document.getElementById('settingRole').value.trim();
    S.settings.welcome   = document.getElementById('settingWelcome').value.trim() || t('welcome');
    S.settings.voiceName = document.getElementById('voiceSelect').value;
    saveSettings(); applySettingsToUI();
  });
  document.getElementById('rateSlider').addEventListener('input', e => {
    S.settings.rate = parseFloat(e.target.value);
    document.getElementById('rateVal').textContent = S.settings.rate.toFixed(1);
  });
  document.getElementById('pitchSlider').addEventListener('input', e => {
    S.settings.pitch = parseFloat(e.target.value);
    document.getElementById('pitchVal').textContent = S.settings.pitch.toFixed(1);
  });
  document.getElementById('testVoiceBtn').addEventListener('click', () => {
    S.settings.voiceName = document.getElementById('voiceSelect').value;
    speak(S.lang === 'es' ? `Hola, soy Loola. Esta es mi voz.` : `Hello, I'm Loola. This is my voice.`);
  });
 
  setTimeout(() => showSpeechBubble(S.settings.welcome || t('welcome')), 800);
});