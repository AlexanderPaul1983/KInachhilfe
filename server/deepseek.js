import fetch from 'node-fetch';
import { ENV } from './env.js';

function stripThink(content) {
  if (typeof content !== 'string') return '';
  return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

export async function chatCompletion({ messages, temperature = 0.3 }) {
  const res = await fetch(`${ENV.OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: ENV.OLLAMA_MODEL,
      messages,
      stream: false,
      options: { temperature }
    })
  });
  if (!res.ok) throw new Error(`Ollama error ${res.status}`);
  const data = await res.json();
  return stripThink(data.message?.content);
}
