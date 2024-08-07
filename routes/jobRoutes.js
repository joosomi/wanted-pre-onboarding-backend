const express = require('express');
const router = express.Router();
const Cjob = require('../controllers/Cjob');

//채용 공고 생성
router.post('/', Cjob.createJob);

// // 모든 채용 공고 조회
// router.get('/', Cjob.getJobs);

// // 특정 채용 공고 조회
// router.get('/:id', Cjob.getJobById);

module.exports = router;
