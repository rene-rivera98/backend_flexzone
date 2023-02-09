

//Validar que sea email
const isEmail = (req, res, next) => {

    const { email } = req.body

    if (email) {
        const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!regEx.test(email)) {
            return res.status(400).json({
                msg: 'Email invalido'
            })
        }
    }

    next()

}
module.exports = { isEmail }