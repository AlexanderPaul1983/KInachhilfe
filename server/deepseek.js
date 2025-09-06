import fetch from 'node-fetch';
import { ENV } from './env.js';

export async function chatCompletion({ messages, temperature = 0.3 }) {
  const res = await fetch(`${ENV.DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ENV.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: ENV.DEEPSEEK_MODEL, messages, temperature })
  });
  if (!res.ok) throw new Error(`DeepSeek error ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}
