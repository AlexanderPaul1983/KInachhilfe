import dotenv from 'dotenv';
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
dotenv.config();

function requireEnv(name) {
  const v = process.env[name];
  if (!v) { throw new Error(`Missing ENV ${name}`); }
  return v;
}

export const ENV = {
  DEEPSEEK_API_KEY: requireEnv('DEEPSEEK_API_KEY'),
  DEEPSEEK_BASE_URL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
  DEEPSEEK_MODEL: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  PORT: Number(process.env.PORT || 4000),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};
