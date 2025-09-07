import { store } from '../../app.js';
export default function(){
  const form=document.getElementById('appForm');
  const school=document.getElementById('appSchool');
  const status=document.getElementById('appStatus');
  const list=document.getElementById('appList');
  let apps=store.get('apps',[{school:'Sample University',status:'Draft'}]);
  function render(){list.innerHTML='';apps.forEach(a=>{const li=document.createElement('li');li.textContent=`${a.school} - ${a.status}`;list.appendChild(li);});}
  render();
  form.onsubmit=e=>{e.preventDefault();apps.push({school:school.value,status:status.value});store.set('apps',apps);form.reset();render();};
}
