const Job = require('../models/job');

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
        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { position, reward, description, skills } = req.body;
        const job = await Job.findByPk(req.params.id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // 채용 공고에서 수정된 값이 있을 경우 수정
        if (position !== undefined) job.position = position;
        if (reward !== undefined) job.reward = reward;
        if (description !== undefined) job.description = description;
        if (skills !== undefined) job.skills = skills;

        await job.save();

        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};
