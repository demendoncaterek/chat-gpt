export async function complete({task, system, messages}){
  // simple mock: echo last user message
  const last = messages && messages.length ? messages[messages.length-1].content : '';
  return {text: `Mock response for ${task}: ${last}`};
}
