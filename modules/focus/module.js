import { store } from '../../app.js';
export default function(){
  const display=document.getElementById('timerDisplay');
  const start=document.getElementById('startPom');
  const notes=document.getElementById('focusNotes');
  const exportBtn=document.getElementById('exportNotes');
  notes.value=store.get('focusNotes','');
  let remaining=1500; let timer;
  function render(){const m=Math.floor(remaining/60).toString().padStart(2,'0');const s=(remaining%60).toString().padStart(2,'0');display.textContent=`${m}:${s}`;}
  render();
  start.onclick=()=>{clearInterval(timer);timer=setInterval(()=>{if(--remaining<0){clearInterval(timer);alert('Done!');remaining=1500;}render();},1000);};
  notes.oninput=()=>store.set('focusNotes',notes.value);
  exportBtn.onclick=()=>{const blob=new Blob([notes.value],{type:'text/markdown'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='notes.md';a.click();};
}
