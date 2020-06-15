import React, {useReducer} from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index';

const AlertaState = props => {
    const initialState = {//necesario para el useReducer que importamos
    alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    //Agregamos las funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload:  {//Mandamos un objeto con el mensaje y la categoria
                msg: msg,
                categoria: categoria
                //También podriamos utilizar el object literal engadment
            }
        });

        setTimeout(() => {//Ocultamos la alerta despues de 5 segundos
            dispatch({
                type:OCULTAR_ALERTA,
            })
        }, 5000); 
    }
    

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )

}


export default AlertaState;
