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
    }
);

module.exports = Application;
