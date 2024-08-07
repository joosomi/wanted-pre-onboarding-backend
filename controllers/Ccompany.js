const Company = require('../models/company');

exports.createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
