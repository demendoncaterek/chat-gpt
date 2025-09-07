import { store } from '../../app.js';
export default function(){
  const form=document.getElementById('txnForm');
  const desc=document.getElementById('txnDesc');
  const amt=document.getElementById('txnAmt');
  const list=document.getElementById('txnList');
  const total=document.getElementById('budgetTotal');
  let txns=store.get('budget',[{desc:'Sample income',amt:100}]);
  function render(){
    list.innerHTML='';
    let sum=0;
    txns.forEach((t,i)=>{sum+=Number(t.amt);const li=document.createElement('li');li.textContent=`${t.desc}: $${t.amt}`;list.appendChild(li);});
    total.textContent='Total: $'+sum;
  }
  render();
  form.onsubmit=e=>{e.preventDefault();txns.push({desc:desc.value,amt:amt.value});store.set('budget',txns);form.reset();render();};
}
