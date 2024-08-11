import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Company extends Model {}

// 회사 - 회사명, 국가, 지역
Company.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Company',
        tableName: 'Company',
    }
);

export default Company;
