const Rol = require('../models/roles');
const Usuario = require('../models/usuarios');

//Valida el idrol exista 
const isRolValido = async (idrol = '') => {

    const existeRol = await Rol.findOne({ where: { idrol } })

    if (!existeRol) {

        throw new Error(`El id ${idrol} no es valido`)
    }
}

//Validamos que no se repita el email
const isEmailValido = async (email = '') => {

    const existeEmail = await Usuario.findOne({ where: { email } })

    if (existeEmail) {
        throw new Error(`El correo ${email} ya esta registrado`)
    }
}

//Validamos que no se repita el numero de celular
const isCelularValido = async (celular = '') => {

    const existeCelular = await Usuario.findOne({ where: { celular } })

    if (existeCelular) {
        throw new Error(`El celular ${celular} ya esta registrado`)
    }
}

//Validamos que no se repita el username
const isUsernameValido = async (username = '') => {
    const usuario = await Usuario.findOne({ where: { username } })
    if (usuario) {
        return res.status(400).json({
            msg: `El Username ${username} ya esta registrado`
        })
    }
}

module.exports = {
    isRolValido,
    isEmailValido,
    isCelularValido,
    isUsernameValido
}
