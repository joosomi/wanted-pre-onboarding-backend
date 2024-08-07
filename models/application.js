const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Job = require('./job');
const User = require('./user');

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

module.exports = Application;
