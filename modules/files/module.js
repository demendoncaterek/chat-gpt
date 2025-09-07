export default function(){
  const input=document.getElementById('fileInput');
  const preview=document.getElementById('filePreview');
  input.onchange=()=>{
    const file=input.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=e=>{preview.textContent=e.target.result.slice(0,500);};
    reader.readAsText(file);
  };
}
