import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

export const ENV = {
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  OLLAMA_MODEL: process.env.OLLAMA_MODEL || 'qwen3:8b',
  PORT: Number(process.env.PORT || 4000),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};
