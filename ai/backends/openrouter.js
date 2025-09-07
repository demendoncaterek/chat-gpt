export async function complete(opts,cfg){
  const key = cfg.keys?.openrouter;
  if(!key) return {error:'No OpenRouter key'};
  try{
    const res = await fetch((cfg.baseUrl||'https://openrouter.ai/api/v1/chat/completions'),{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
      body: JSON.stringify({
        model: cfg.model||'gpt-3.5-turbo',
        messages: opts.messages,
        max_tokens: opts.maxTokens||200
      })
    });
    const json = await res.json();
    return {text: json.choices?.[0]?.message?.content||''};
  }catch(e){
    return {error:e.message};
  }
}
