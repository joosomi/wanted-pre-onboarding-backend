import express from 'express';
import { createCompany } from '../controllers/Ccompany.js';

const router = express.Router();

// 회사 생성
router.post('/', createCompany);

export default router;
