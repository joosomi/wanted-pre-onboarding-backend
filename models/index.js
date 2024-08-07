const sequelize = require('../config/db');
const Company = require('./company');
const Job = require('./job');
const Application = require('./application');
const User = require('./user');

/* 모델 간의 관계 설정
 Company - Job: 1 대 다 => 하나의 회사 여러 채용 공고 가능
 Job - Application : 1대 다 => 하나의 채용 공고는 여러 지원서 받을 수 있음
 User - Application:  한 사용자는 여러 채용 공고에 지원 가능 
     동일한 채용 공고에는 1번만 지원 가능
*/
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
