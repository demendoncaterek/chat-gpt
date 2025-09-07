import { store } from '../../app.js';
export default function(){
  const backend=document.getElementById('aiBackend');
  const deepseek=document.getElementById('deepseekKey');
  const openrouter=document.getElementById('openrouterKey');
  const save=document.getElementById('saveSettings');
  const cfg=store.get('ai',{backend:'mock',keys:{}});
  backend.value=cfg.backend;deepseek.value=cfg.keys.deepseek||'';openrouter.value=cfg.keys.openrouter||'';
  save.onclick=()=>{
    store.set('ai',{backend:backend.value,keys:{deepseek:deepseek.value,openrouter:openrouter.value}});
    alert('Saved settings');
  };
}
