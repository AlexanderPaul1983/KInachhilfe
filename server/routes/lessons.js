import express from 'express';
import crypto from 'node:crypto';
import { chatCompletion } from '../deepseek.js';
import { buildSystemPrompt, kickoffUserMessage } from '../prompt.js';

const router = express.Router();

// In-Memory Ablage fürs MVP (später DB)
const lessons = new Map(); // id -> { meta, transcript: [{role,content}, ...] }

router.post('/start', async (req, res) => {
  try {
    const { name, age, language, subject, topic } = req.body || {};
    if (!name || !age || !language || !subject || !topic) {
      return res.status(400).json({ error: 'Missing fields: name, age, language, subject, topic' });
    }

    // TODO: Hier später Payment-Check einbauen (captured?)
    const id = crypto.randomUUID();

    const system = buildSystemPrompt({ name, age, language, subject, topic });
    const transcript = [
      { role: 'system', content: system },
      { role: 'user', content: kickoffUserMessage(topic) }
    ];

    const firstAnswer = await chatCompletion({ messages: transcript });

    transcript.push({ role: 'assistant', content: firstAnswer });
    lessons.set(id, { meta: { name, age, language, subject, topic }, transcript });

    return res.json({ lessonId: id, firstAnswer });
  } catch (err) {
    console.error('lesson/start error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

router.post('/message', async (req, res) => {
  try {
    const { lessonId, userMessage } = req.body || {};
    if (!lessonId || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return res.status(400).json({ error: 'Missing lessonId or userMessage' });
    }
    const lesson = lessons.get(lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });

    const messages = [...lesson.transcript, { role: 'user', content: userMessage }];
    const answer = await chatCompletion({ messages });
    messages.push({ role: 'assistant', content: answer });
    lesson.transcript = messages;

    return res.json({ answer });
  } catch (err) {
    console.error('lesson/message error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

export default router;
