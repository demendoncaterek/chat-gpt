import { store } from '../../app.js';
import { complete } from '../../ai/adapter.js';
export default function(){
  const list=document.getElementById('ideaList');
  const form=document.getElementById('ideaForm');
  const title=document.getElementById('ideaTitle');
  const platform=document.getElementById('ideaPlatform');
  const captionBtn=document.getElementById('captionBtn');
  const captionOut=document.getElementById('captionOut');
  let ideas=store.get('ideas',[{title:'Sample video',platform:'TikTok'}]);
  function render(){list.innerHTML='';ideas.forEach(i=>{const li=document.createElement('li');li.textContent=`${i.title} (${i.platform})`;list.appendChild(li);});}
  render();
  form.onsubmit=e=>{e.preventDefault();ideas.push({title:title.value,platform:platform.value});store.set('ideas',ideas);render();form.reset();};
  captionBtn.onclick=async()=>{
    const res=await complete({task:'caption',messages:[{role:'user',content:title.value||'Give me a caption'}]});
    captionOut.textContent=res.text||res.error;
  };
}
