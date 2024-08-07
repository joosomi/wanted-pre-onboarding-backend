const Company = require('../models/company');
const { sendCreatedResponse } = require('../utils/responseHandler');

exports.createCompany = async (req, res, next) => {
    try {
        const company = await Company.create(req.body);
        sendCreatedResponse(res, company, '회사 등록 완료');
    } catch (error) {
        next(error);
    }
};
