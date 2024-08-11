import Application from '../models/application.js';
import Job from '../models/job.js';
import User from '../models/user.js';
import { sendCreatedResponse } from '../utils/responseHandler.js';
import { NotFoundError, BadRequestError } from '../middleware/errorHandler.js';

export const applyToJob = async (req, res, next) => {
    try {
        const { jobId, userId } = req.body;

        // 사용자와 채용공고 존재 여부 확인
        const job = await Job.findByPk(jobId);
        const user = await User.findByPk(userId);

        if (!job) {
            throw new NotFoundError('채용공고를 찾을 수 없습니다.');
        }

        if (!user) {
            throw new NotFoundError('사용자를 찾을 수 없습니다.');
        }

        // 기존에 지원한 사용자인지 확인
        const existingApplication = await Application.findOne({
            where: { jobId, userId },
        });

        if (existingApplication) {
            throw new BadRequestError('이미 해당 채용공고에 지원하였습니다.');
        }

        const application = await Application.create({ jobId, userId });

        sendCreatedResponse(res, application, '채용공고에 지원 완료');
    } catch (error) {
        next(error);
    }
};
