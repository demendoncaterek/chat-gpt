import * as mock from './backends/mock.js';
import * as deepseek from './backends/deepseek.js';
import * as openrouter from './backends/openrouter.js';
import { store } from '../app.js';

const backends = { mock, deepseek, openrouter };

export async function complete(opts){
  const cfg = store.get('ai', {backend:'mock', keys:{}});
  const backend = backends[cfg.backend] || mock;
  return backend.complete(opts, cfg);
}
