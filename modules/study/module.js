import { store } from '../../app.js';
export default function(){
  const subjSel=document.getElementById('subjectSelect');
  const cardList=document.getElementById('cardList');
  const reviewBtn=document.getElementById('reviewBtn');
  const data=store.get('study',{subjects:{
    Chemistry:['Atoms','Bonds'],
    Geometry:['Triangles'],
    'Global History':['Renaissance']
  }});
  Object.keys(data.subjects).forEach(s=>{
    const opt=document.createElement('option');opt.value=s;opt.textContent=s;subjSel.appendChild(opt);
  });
  function render(){
    cardList.innerHTML='';
    const subj=data.subjects[subjSel.value]||[];
    subj.forEach(c=>{
      const li=document.createElement('li');li.textContent=c;cardList.appendChild(li);
    });
  }
  subjSel.onchange=render;render();
  reviewBtn.onclick=()=>alert('Review session logged!');
}
