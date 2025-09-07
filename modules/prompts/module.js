import { store } from '../../app.js';
import { complete } from '../../ai/adapter.js';
export default function(){
  const form=document.getElementById('promptForm');
  const text=document.getElementById('promptText');
  const list=document.getElementById('promptList');
  let prompts=store.get('prompts',['Example prompt']);
  function render(){list.innerHTML='';prompts.forEach(p=>{const li=document.createElement('li');li.textContent=p;li.onclick=async()=>{const res=await complete({task:'test',messages:[{role:'user',content:p}]});alert(res.text||res.error);};list.appendChild(li);});}
  render();
  form.onsubmit=e=>{e.preventDefault();prompts.push(text.value);store.set('prompts',prompts);form.reset();render();};
}
