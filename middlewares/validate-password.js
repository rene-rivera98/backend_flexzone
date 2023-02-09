const { response, request } = require('express')

//Validar que sea un password seguro
const passwordSeguro = async (req = request, res = response, next) => {

    const { password } = req.body
    
    if (password) {
        
        const exReg = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/

        if (!exReg.test(password)) {
            return res.status(400).json({
                error: `No es una contraseña segura. Debe de incluir lo siguente:
            1.- Al menos una letra mayúscula
            2.- Al menos un carácter especial
            3.- Al menos un número
            4.- Al menos 8 caracteres`
            })
        }
    }


    next()
}


module.exports = {
    passwordSeguro
}