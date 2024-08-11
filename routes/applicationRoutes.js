import express from 'express';
import { applyToJob } from '../controllers/Capplication.js';

const router = express.Router();

// 공고 지원
router.post('/apply', applyToJob);

export default router;
