// Basic storage wrappers
export const db = {
  async get(store, key) {
    return new Promise((res, rej) => {
      const open = indexedDB.open('personalOS', 1);
      open.onupgradeneeded = () => open.result.createObjectStore(store);
      open.onsuccess = () => {
        const tx = open.result.transaction(store, 'readonly');
        const req = tx.objectStore(store).get(key);
        req.onsuccess = () => res(req.result);
        req.onerror = rej;
      };
      open.onerror = rej;
    });
  },
  async set(store, key, val) {
    return new Promise((res, rej) => {
      const open = indexedDB.open('personalOS', 1);
      open.onupgradeneeded = () => open.result.createObjectStore(store);
      open.onsuccess = () => {
        const tx = open.result.transaction(store, 'readwrite');
        tx.objectStore(store).put(val, key);
        tx.oncomplete = res;
        tx.onerror = rej;
      };
      open.onerror = rej;
    });
  }
};

export const store = {
  get: (k, d) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d)),
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};

// Theme
const themeToggle = document.getElementById('themeToggle');
const currentTheme = store.get('theme', 'light');
if (currentTheme === 'dark') document.documentElement.dataset.theme = 'dark';

themeToggle.onclick = () => {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  if (t === 'dark') document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  store.set('theme', t);
};

// Module loader
const modules = ['tasks','study','creator','budget','focus','resume','skincare','fitness','college','media','portfolio','calendar','prompts','files','settings'];
const nav = document.getElementById('nav');
const palette = document.getElementById('palette');
const paletteInput = document.getElementById('paletteInput');
const paletteList = document.getElementById('paletteList');
const view = document.getElementById('view');

const loaded = {};
const actions = [];

async function initModules(){
  for (const id of modules){
    const manifest = await fetch(`modules/${id}/manifest.json`).then(r=>r.json());
    if(!manifest.enabled) continue;
    const link = document.createElement('a');
    link.href = `#${id}`; link.textContent = manifest.name;
    nav.appendChild(link);
    actions.push({id, name: manifest.name});
  }
}

async function loadModule(id){
  const mod = await import(`./modules/${id}/module.js`);
  const html = await fetch(`modules/${id}/view.html`).then(r=>r.text());
  view.innerHTML = html;
  if(mod.default) mod.default();
  view.focus();
}

window.addEventListener('hashchange',()=>{
  const id = location.hash.slice(1) || modules[0];
  loadModule(id);
});

initModules().then(()=>{
  const id = location.hash.slice(1) || modules[0];
  if(location.hash==='') location.hash = id;
  loadModule(id);
});

// Command palette
function openPalette(){
  palette.classList.remove('hidden');
  paletteInput.value='';
  paletteInput.focus();
  renderPalette(actions);
}
function closePalette(){ palette.classList.add('hidden'); }

function renderPalette(items){
  paletteList.innerHTML='';
  items.forEach(a=>{
    const li=document.createElement('li');
    li.textContent=a.name;
    li.onclick=()=>{location.hash=a.id; closePalette();};
    paletteList.appendChild(li);
  });
}

paletteInput.oninput=()=>{
  const q=paletteInput.value.toLowerCase();
  renderPalette(actions.filter(a=>a.name.toLowerCase().includes(q)));
};

window.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openPalette();}
  if(e.key==='Escape') closePalette();
});

// Notifications
export function notify(msg){
  if(Notification.permission==='granted') new Notification(msg);
  else if(Notification.permission!=='denied') Notification.requestPermission();
}

// Data backup
export async function exportData(){
  const data={};
  for(const storeName of ['tasks','habits','notes','budget','prompts']){
    data[storeName]=await db.get(storeName,'all')||[];
  }
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='backup.json';
  a.click();
}

// Service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}
