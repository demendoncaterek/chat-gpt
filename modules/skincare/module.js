import { store } from '../../app.js';
export default function(){
  const form=document.getElementById('skinForm');
  const list=document.getElementById('skinList');
  let logs=store.get('skinLogs',[]);
  function render(){list.innerHTML='';logs.forEach(l=>{const li=document.createElement('li');li.textContent=`${l.date}: ${l.note} (${l.rating}/10)`;list.appendChild(li);});}
  render();
  form.onsubmit=e=>{e.preventDefault();logs.push({date:skinDate.value,note:skinNote.value,rating:skinRating.value});store.set('skinLogs',logs);form.reset();render();};
}
