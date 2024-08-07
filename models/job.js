const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Company = require('./company');

class Job extends Model {}

Job.init(
    {
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reward: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER,
            references: {
                model: Company,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Job',
        tableName: 'Job',
    }
);

Job.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Job;
