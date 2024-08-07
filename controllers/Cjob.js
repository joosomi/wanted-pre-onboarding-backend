const { Op } = require('sequelize');
const Job = require('../models/job');
const Company = require('../models/company');
const {
    sendSuccessResponse,
    sendCreatedResponse,
    sendNoContentResponse,
} = require('../utils/responseHandler');
const { NotFoundError } = require('../middleware/errorHandler');

exports.createJob = async (req, res) => {
    try {
        const { company_id, position, reward, description, skills } = req.body;
        const job = await Job.create({
            companyId: company_id,
            position: position,
            reward: reward,
            description: description,
            skills: skills,
        });
        sendCreatedResponse(res, job, '채용공고 등록 완료');
    } catch (error) {
        next(error);
    }
};

exports.updateJob = async (req, res, next) => {
    try {
        const { position, reward, description, skills } = req.body;
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            throw new NotFoundError('채용공고를 찾을 수 없습니다.');
        }

        // 채용 공고에서 수정된 값이 있을 경우 수정
        if (position !== undefined) job.position = position;
        if (reward !== undefined) job.reward = reward;
        if (description !== undefined) job.description = description;
        if (skills !== undefined) job.skills = skills;

        await job.save();

        sendSuccessResponse(res, job, '채용공고 수정 완료');
    } catch (error) {
        next(error);
    }
};

exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            throw new NotFoundError('채용공고를 찾을 수 없습니다.');
        }

        await job.destroy();
        sendNoContentResponse(res, '채용 공고 삭제 완료');
    } catch (error) {
        next(error);
    }
};

exports.getJobs = async (req, res, next) => {
    try {
        // 검색 - 쿼리 파라미터 가져오기
        const { search } = req.query;

        // 검색 옵션
        let searchOptions = {
            include: [
                {
                    model: Company,
                    attributes: ['name', 'country', 'location'],
                },
            ],
        };

        // 검색 - 회사 이름, position, skills에서만
        if (search) {
            searchOptions.where = {
                [Op.or]: [
                    {
                        '$Company.name$': {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        position: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        skills: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            };
        }

        // 검색 쿼리 실행
        const jobs = await Job.findAll(searchOptions);

        if (jobs.length === 0) {
            return sendSuccessResponse(res, [], '검색 결과가 없습니다.');
        }

        const jobList = jobs.map((job) => ({
            job_id: job.id,
            company_name: job.Company.name,
            country: job.Company.country,
            location: job.Company.location,
            position: job.position,
            reward: job.reward,
            skills: job.skills,
        }));

        sendSuccessResponse(res, jobList, '채용공고 목록 조회 완료');
    } catch (error) {
        next(error);
    }
};

// 채용 상세 페이지 조회
exports.getJobDetail = async (req, res, next) => {
    try {
        const jobId = req.params.id;

        // 채용 공고 상세 정보 조회
        const job = await Job.findOne({
            where: { id: jobId },
            include: [
                {
                    model: Company,
                    attributes: ['name', 'country', 'location'],
                },
            ],
        });

        if (!job) {
            throw new NotFoundError('채용공고를 찾을 수 없습니다.');
        }

        // 해당 회사 다른 채용 공고 조회
        const otherJobs = await Job.findAll({
            where: {
                companyId: job.companyId,
                id: { [Op.ne]: jobId }, // 현재 채용 공고를 제외
            },
            attributes: ['id'], // 다른 채용 공고의 ID만
        });

        const otherJobIds = otherJobs.map((otherJob) => otherJob.id);

        const jobDetail = {
            job_id: job.id,
            company_name: job.Company.name,
            country: job.Company.country,
            location: job.Company.location,
            position: job.position,
            reward: job.reward,
            skills: job.skills,
            description: job.description,
            otherJobs: otherJobIds, // 다른 채용 공고 ID 리스트
        };

        sendSuccessResponse(res, jobDetail, '채용공고 상세 페이지 조회 완료');
    } catch (error) {
        next(error);
    }
};
