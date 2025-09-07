import { store, notify } from '../../app.js';
export default function(){
  const list = document.getElementById('taskList');
  const form = document.getElementById('taskForm');
  const input = document.getElementById('taskInput');
  let tasks = store.get('tasks', [
    {text:'Sample task', done:false}
  ]);
  function render(){
    list.innerHTML='';
    tasks.forEach((t,i)=>{
      const li=document.createElement('li');
      li.textContent=t.text;
      if(t.done) li.style.textDecoration='line-through';
      li.onclick=()=>{t.done=!t.done;store.set('tasks',tasks);render();notify('Task updated');};
      list.appendChild(li);
    });
  }
  render();
  form.onsubmit=e=>{e.preventDefault();tasks.push({text:input.value,done:false});input.value='';store.set('tasks',tasks);render();};
}
