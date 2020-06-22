import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         OBTENER_USUARIO,
         LOGIN_EXITOSO,
         LOGIN_ERROR,
         CERRAR_SESION} from '../../types/index';

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
            
            //Recordar que la respuesta nos va a dar un token 
            localStorage.setItem('token', action.payload.token); //Colocamos el localstorage el token

            return {
                ...state, //Hacemos una copia del state
                autenticado: true,//Marcamos como autenticado al usuario
                mensaje: null //Esto sirve para mandar mensajes de alerta

            }

        case REGISTRO_ERROR:
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }

        default:
            return state;
    }
}