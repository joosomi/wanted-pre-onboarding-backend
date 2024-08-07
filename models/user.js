const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = User;
