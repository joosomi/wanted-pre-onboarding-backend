const express = require('express');
const router = express.Router();
const Cjob = require('../controllers/Cjob');

// 모든 채용 공고 조회
router.get('/', Cjob.getJobs);

// 채용 상세 페이지 조회
router.get('/:id', Cjob.getJobDetail);

//채용 공고 생성
router.post('/', Cjob.createJob);

// 채용 공고 수정
router.put('/:id', Cjob.updateJob);

// 채용 공고 삭제
router.delete('/:id', Cjob.deleteJob);

module.exports = router;
