import { store } from '../../app.js';
export default function(){
  const form=document.getElementById('profileForm');
  const name=document.getElementById('name');
  const summary=document.getElementById('summary');
  const exportBtn=document.getElementById('exportResume');
  const prof=store.get('resume',{name:'Student',summary:'Aspiring professional'});
  name.value=prof.name;summary.value=prof.summary;
  form.onsubmit=e=>{e.preventDefault();store.set('resume',{name:name.value,summary:summary.value});alert('Saved');};
  exportBtn.onclick=()=>{const blob=new Blob([JSON.stringify({name:name.value,summary:summary.value},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='resume.json';a.click();};
}
