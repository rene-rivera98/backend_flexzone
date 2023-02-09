const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Usuario = sequelize.define('Usuario', {

    idusuario: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true,
    },
    idrol: {
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidoMaterno: {
        type: DataTypes.STRING,
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
    },
    celular: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
    },

})

module.exports = Usuario;