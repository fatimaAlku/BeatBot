import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import checkToken from './config/checkToken.js';
import ensureLoggedIn from './config/ensureLoggedIn.js';
import userRoutes from './routes/api/users.js';
import aiRoutes from './routes/api/ai.js';
import submissionRoutes from './routes/api/submissions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use((_, res, next) => { res.locals.data = {}; next(); });

// ✅ health
app.get('/health', (_, res) => res.status(200).json({ ok: true }));

// ✅ make req.user available
app.use(checkToken);

// API routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes); // guests allowed; saves only if req.user exists
app.use('/api/submissions', ensureLoggedIn, submissionRoutes);

// Static
const staticDir = process.env.NODE_ENV === 'production' ? 'dist' : 'public';
const indexPath = process.env.NODE_ENV === 'production' ? 'dist/index.html' : 'index.html';
app.use(express.static(staticDir));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API endpoint not found' });
  res.sendFile(path.resolve(path.join(__dirname, indexPath)));
});

export default app;
