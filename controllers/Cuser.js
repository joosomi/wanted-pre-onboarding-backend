import User from '../models/user.js';
import { sendCreatedResponse } from '../utils/responseHandler.js';
import { BadRequestError } from '../middleware/errorHandler.js';

export const createUser = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        // 이메일 중복 확인
        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestError('이미 등록된 이메일입니다.');
        }

        const user = await User.create({ username, email });
        sendCreatedResponse(res, user, '사용자 등록 완료');
    } catch (error) {
        next(error);
    }
};
