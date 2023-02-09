const  { Sequelize }  = require('sequelize');

const sequelize = new Sequelize('flex', 'root', 'sdcd99xd', {
    host:'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = sequelize