import React, { useReducer } from 'react';
// import {v4 as uuid} from "uuid";
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'


const TareaState = (props) => {

    //Definimos el state inicial
    const initialState = {
        tareas: [] //arreglo vacio de tareas
    }

    //Creamos el dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    //Aqui creamos las funciones

    return ( 
        <tareaContext.Provider
        >
            {props.children} 
        </tareaContext.Provider>
     )
}
 
export default TareaState;