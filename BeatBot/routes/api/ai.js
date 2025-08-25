// # /api/ai

import express from 'express';
import { recommend } from '../../controllers/api/ai.js';
const router = express.Router();

router.post('/recommend', recommend); // POST /api/ai/recommend

export default router;
