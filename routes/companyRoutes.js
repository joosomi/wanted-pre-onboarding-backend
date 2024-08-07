const express = require('express');
const router = express.Router();
const Ccompany = require('../controllers/Ccompany');

// 회사 생성
router.post('/', Ccompany.createCompany);

module.exports = router;
