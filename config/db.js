const { Sequelize } = require('sequelize');

// SQLite 데이터베이스 설정
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

module.exports = sequelize;
