export default function(){
  const input=document.getElementById('srtInput');
  const btn=document.getElementById('exportSrt');
  input.value='1\n00:00:00,000 --> 00:00:02,000\nSample caption';
  btn.onclick=()=>{const blob=new Blob([input.value],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='captions.srt';a.click();};
}
