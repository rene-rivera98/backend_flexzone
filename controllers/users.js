const { response, request } = require('express')
const Usuario = require('../models/usuarios')
const { v4: uuidv4, validate } = require('uuid');
const bcryptjs = require('bcryptjs')


const usersGet = async (req = request, res = response) => {

    const usuarios = await Usuario.findAll()

    res.status(200).json({
        msg: 'Consulta exitosa',
        usuarios
    })
}


const usersPost = async (req = request, res = response) => {

    const {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        password,
        idrol,
        celular,
        fechaNacimiento,
        email
    } = req.body

    //Generar username
    const nombreLimpio = nombre.trim().replace(/\s+/g, '') + apellidoPaterno.trim().replace(/\s+/g, '');
    const username = `${nombreLimpio}-${Math.floor(Math.random() * 100000000).toString().slice(0, 8)}`

    //Generar ID del usuario
    const idusuario = uuidv4();


    try {

        const usuario = new Usuario({
            idusuario,
            nombre,
            apellidoMaterno,
            apellidoPaterno,
            username,
            password,
            idrol,
            celular,
            fechaNacimiento,
            email
        })


        //Encriptar el password
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardando usuario en la base de datos
        await usuario.save()


        res.status(200).json({
            msg: 'Usuario generado correctamente',
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }
};

//Actualizar usuarios
const usersPut = async (req = request, res = response) => {

    const { idusuario, password, estado, ...resto } = req.body

    try {

        //Validar si el id existe
        const usuario = await Usuario.findOne({ where: { idusuario } })
        if (!usuario) {
            return res.status(404).json({
                error: `No existe un usurio con el id ${idusuario}`
            })
        }


        if (password) {
            //Encriptar el password
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync(password, salt);
        }

        if (estado) {
            return res.status(400).json('Aqui no se puede actulizar el estado')
        }
    
        //Actualizar usuario
        await Usuario.update({
            ...resto  // los campos a actualizar que manden
        }, {
            where: { idusuario }, // el id a buscar
            // returning: true,
        })


        res.status(200).json({
            msg: `Campos actulizados`,
            //Que devuleva los campos actulizados
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }

}


//Eliminar usuarios
const usersDelete = async (req = request, res = response) => {

    const { idusuario } = req.body;

    try {

        //Validar que sea un uuid
        if (!validate(idusuario)) {
            return res.status(400).json({ error: 'ID invalido' });
        }

        //Busca el usuario a elminar por id
        const usuario = await Usuario.findOne({ where: { idusuario } })

        //Validar que exista el usuario a eliminar
        if (!usuario) {
            return res.status(404).json({
                error: `No existe un usurio con el id ${idusuario}`
            })
        }

        //Eliminacion logica del usuario
        await Usuario.update({ estado: false }, {
            where: { idusuario }
        });


        res.status(200).json(
            `El usuario ${usuario.nombre} ha sido elimnado`
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'Error en el servidor'
        })
    }


}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
};