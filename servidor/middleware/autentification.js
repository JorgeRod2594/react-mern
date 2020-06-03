const JWT = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Leer el token del header
    //x-auth-token: En cada request se tiene que enviar
    const token = req.header('x-auth-token');
    console.log(token)

    //Revisar si no hay token
    if(!token) {
        return res.status(401).json({ msg: "No hay token. Necesita iniciar sesión primero." })
    }

    //Validar el token
    try {
        //Nos va a permitir verificar el token
        const cifrado = JWT.verify(token, process.env.PSECRETA);  
        //Si la verificación es correcta, añadimos al request el usuario logueado
        req.usuario = cifrado.usuario;
        //Cuando creamos un usuario (usuarioController) le pasamos en el payload el usuario
        //es por eso que agregamos cifrado.usuario y con esto poder acceder al id del usuario.
        next();//Para que vaya al siguiente middleware (proyectoController.crearProyecto) en proyectos
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'})
    }
}