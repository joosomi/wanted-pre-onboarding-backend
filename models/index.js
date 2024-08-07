const sequelize = require('../config/db');
const Company = require('./company');
const Job = require('./job');
const Application = require('./application');
const User = require('./user');

// 모델 간의 관계 설정
Company.hasMany(Job, { foreignKey: 'companyId' });
Job.belongsTo(Company, { foreignKey: 'companyId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    Company,
    Job,
    Application,
    User,
};
