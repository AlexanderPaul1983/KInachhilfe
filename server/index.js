import express from 'express';
import cors from 'cors';
import { ENV } from './env.js';
import lessonsRouter from './routes/lessons.js';

const app = express();
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/lesson', lessonsRouter);

// (Optional) Platzhalter für Zahlungen – später implementieren
// import paymentsRouter from './routes/payments.js';
// app.use('/api/payments', paymentsRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});
