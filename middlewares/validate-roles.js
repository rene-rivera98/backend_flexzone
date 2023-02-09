

const isAdminRol = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            // error: error.message, 
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const {nombre, idrol} =req.usuario

    if(idrol !== 300){
        return res.status(401).json({
            error: `El usuario ${nombre} NO tienes los permisos necesarios`
        })

    }

    next();
}

module.exports = {isAdminRol};