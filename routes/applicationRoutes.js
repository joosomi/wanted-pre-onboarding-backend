const express = require('express');
const router = express.Router();
const Capplication = require('../controllers/Capplication');

// 공고 지원
router.post('/apply', Capplication.applyToJob);

module.exports = router;
