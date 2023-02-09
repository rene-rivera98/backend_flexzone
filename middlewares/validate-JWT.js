const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('authorization');

    //Se verifica que el usuario haya mandado el token
    if (!token) {

        return res.status(401).json({
            error: 'No hay token'
        })
    }

    try {

        //Se verifica que el token sea valido y se estrae el id del usuario
        const { idusuario } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findOne({ where: { idusuario } })

        // Validar que el usuario exista
        if (!usuario) {
            return res.status(404).json({
                // error: error.message,
                msg: 'Usuario NO existe'
            })
        }

        //Se manda el alumno en la request
        req.usuario = usuario

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: error.message,
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}