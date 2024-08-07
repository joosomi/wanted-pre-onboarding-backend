const Job = require('../models/job');
const Company = require('../models/company');
const {
    sendSuccessResponse,
    sendCreatedResponse,
    sendNoContentResponse,
} = require('../utils/responseHandler');

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

exports.updateJob = async (req, res) => {
    try {
        const { position, reward, description, skills } = req.body;
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            return res
                .status(404)
                .json({ error: '채용공고를 찾을 수 없습니다.' });
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
            res.status(404);
            return next(new Error('채용공고를 찾을 수 없습니다.'));
        }

        await job.destroy();
        sendNoContentResponse(res, '채용 공고 삭제 완료');
    } catch (error) {
        next(error);
    }
};

exports.getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.findAll({
            include: [
                {
                    model: Company,
                    attributes: ['name', 'country', 'location'],
                },
            ],
        });

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
