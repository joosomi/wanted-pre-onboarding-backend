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
        res.status(400).json({ error: error.message });
    }
};

// exports.getJobs = async (req, res) => {
//     try {
//         const jobs = await Job.findAll({
//             include: [{
//                 model: Company,
//                 attributes: ['name', 'country', 'location']
//             }]
//         });
//         res.status(200).json(jobs);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// exports.getJobById = async (req, res) => {
//     try {
//         const job = await Job.findByPk(req.params.id, {
//             include: [{
//                 model: Company,
//                 attributes: ['name', 'country', 'location']
//             }]
//         });

//         if (!job) {
//             return res.status(404).json({ error: 'Job not found' });
//         }

//         res.status(200).json(job);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
