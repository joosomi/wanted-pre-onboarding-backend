import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Company from './company.js';

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

export default Job;
