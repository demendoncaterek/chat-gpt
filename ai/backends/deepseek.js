export async function complete(opts,cfg){
  const key = cfg.keys?.deepseek;
  if(!key) return {error:'No DeepSeek key'};
  try{
    const res = await fetch((cfg.baseUrl||'https://api.deepseek.com/v1/complete'),{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
      body: JSON.stringify({
        model: cfg.model||'deepseek-chat',
        prompt: opts.messages.map(m=>m.content).join('\n'),
        max_tokens: opts.maxTokens||200
      })
    });
    const json = await res.json();
    return {text: json.choices?.[0]?.text||''};
  }catch(e){
    return {error:e.message};
  }
}
