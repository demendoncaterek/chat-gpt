import { store } from '../../app.js';
export default function(){
  const form=document.getElementById('workForm');
  const name=document.getElementById('workName');
  const reps=document.getElementById('workReps');
  const list=document.getElementById('workList');
  let workouts=store.get('workouts',[{name:'Push Ups',reps:10}]);
  function render(){list.innerHTML='';workouts.forEach(w=>{const li=document.createElement('li');li.textContent=`${w.name} - ${w.reps} reps`;list.appendChild(li);});}
  render();
  form.onsubmit=e=>{e.preventDefault();workouts.push({name:name.value,reps:reps.value});store.set('workouts',workouts);form.reset();render();};
}
