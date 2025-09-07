import { store } from '../../app.js';
export default function(){
  const list=document.getElementById('calList');
  const tasks=store.get('tasks',[]);
  const apps=store.get('apps',[]);
  list.innerHTML='';
  tasks.forEach(t=>{const li=document.createElement('li');li.textContent=`Task: ${t.text}`;list.appendChild(li);});
  apps.forEach(a=>{const li=document.createElement('li');li.textContent=`Application: ${a.school} (${a.status})`;list.appendChild(li);});
}
