import React, { useReducer } from 'react';
import authContext from './authContext'
import authReducer from './authReducer'

import clienteAxios from '../../config/axios'

import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         OBTENER_USUARIO,
         LOGIN_EXITOSO,
         LOGIN_ERROR,
         CERRAR_SESION} from '../../types/index';

const AuthState = props => {

    const initialState = { //Creamos el state inicial
        token: localStorage.getItem('token'),//Almacenamos el token de sesión en localStorage. 
        autenticado: null, //Si el usuario está autenticado
        usuario: null, //Informacion del usuario para ponerlo en el navbar y poder mostrar sus
        //proyectos y tareas utilizando su id.
        mensaje: null //Está relacionado con las alertas.
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    //Funciones

    const registrarUsuario = async datos => {
        try {
            //importamos nuestro cliente de axios para comunicarnos con el back
            //le pasamos en el post la ruta y los datos
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta);//Para saber que valores estamos obteniendo

            dispatch({
                type: REGISTRO_EXITOSO
            })
            
        } catch (error) {
            console.log(error);

            dispatch({
                type: REGISTRO_ERROR
            })
        }
    }
    

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,

                registrarUsuario

            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;