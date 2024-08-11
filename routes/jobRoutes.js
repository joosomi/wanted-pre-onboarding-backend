import express from 'express';
import {
    getJobs,
    getJobDetail,
    createJob,
    updateJob,
    deleteJob,
} from '../controllers/Cjob.js';

const router = express.Router();

// 모든 채용 공고 조회
router.get('/', getJobs);

// 채용 상세 페이지 조회
router.get('/:id', getJobDetail);

// 채용 공고 생성
router.post('/', createJob);

// 채용 공고 수정
router.put('/:id', updateJob);

// 채용 공고 삭제
router.delete('/:id', deleteJob);

export default router;
