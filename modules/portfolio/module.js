export default function(){
  const form=document.getElementById('portForm');
  const name=document.getElementById('portName');
  const bio=document.getElementById('portBio');
  const dl=document.getElementById('portDownload');
  form.onsubmit=e=>{e.preventDefault();
    const html=`<!DOCTYPE html><html><head><meta charset='utf-8'><title>${name.value}</title><style>body{font-family:sans-serif;padding:1rem;}</style></head><body><h1>${name.value}</h1><p>${bio.value}</p></body></html>`;
    const blob=new Blob([html],{type:'text/html'});
    dl.href=URL.createObjectURL(blob);
    dl.download='portfolio.html';
    dl.textContent='Download portfolio.html';
  };
}
