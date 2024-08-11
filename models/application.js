import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Job from './job.js';
import User from './user.js';

class Application extends Model {}

Application.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
        jobId: {
            type: DataTypes.INTEGER,
            references: {
                model: Job,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Application',
        tableName: 'Application',
        indexes: [
            {
                unique: true,
                fields: ['userId', 'jobId'], // userId와 jobId의 조합이 유일해야 함 -> 동일 채용 공고 중복 지원 방지
            },
        ],
    }
);

export default Application;
