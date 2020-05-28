import React, { useReducer } from 'react';
// import {v4 as uuid} from "uuid";
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'

import { TAREAS_PROYECTO, 
         AGREGAR_TAREA_P,
         VALIDAR_TAREA_P,
         ELIMINAR_TAREA_P,
         ESTADO_TAREA_P,
         TAREA_SELECCIONADA,
         ACTUALIZAR_TAREA_P } from '../../types';

const TareaState = (props) => {

    //Definimos el state inicial
    const initialState = {
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir plataformas de pago', estado: true, proyectoId: 3},
            {id: 4, nombre: 'Elegir hosting', estado: false, proyectoId: 4},
            {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 2},
            {id: 6, nombre: 'Elegir colores', estado: false, proyectoId: 2},
            {id: 7, nombre: 'Elegir plataformas de pago', estado: true, proyectoId: 4},
            {id: 8, nombre: 'Elegir hosting', estado: false, proyectoId: 1},
        ], //arreglo vacio de tareas
        tareasproyecto: null, //Esta es la vista default para no seleccionar ninguna tarea
        //hasta que seleccione el usuario
        errortarea: false,
        tareaseleccionada: null
    }

    //Creamos el dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    /////////////////////Aqui creamos las funciones//////////////////////////

    //Obtener las tareas del asociadas a un proyecto
    const obtenerTareas = (proyectoId) => {
        dispatch ({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    //Agregar tarea a un proyecto seleccionado
    const agregarTarea = (tarea) => {
        dispatch({
            type: AGREGAR_TAREA_P,
            payload: tarea
        })
    }
    
    //Validamos la tarea creada y mostramos el error 
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA_P
        })
    }
    
    //Eliminar la tarea seleccionada del proyecto por su id
    const eliminarTarea = (id) => {
        dispatch({
            type: ELIMINAR_TAREA_P,
            payload: id
        })
    }
    
    //Modifica el estado de una tarea del proyecto seleccionado
    const cambiarEstadoTarea = (tarea) => {
        dispatch({
            type: ESTADO_TAREA_P,
            payload: tarea
        })
    }
    
    //Extraer una tarea seleccionada para editarla
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_SELECCIONADA,
            payload: tarea
        })
    }

    //Edita o modifica una tarea seleccionada
    const actualizarTarea = (tarea) => {
        dispatch({
            type: ACTUALIZAR_TAREA_P,
            payload: tarea
        })
    }
    
    

    return ( 
        <tareaContext.Provider
            value = {{
                tareas: state.tareas, //Le pasamos el arreglo de taraes
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,

                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children} 
        </tareaContext.Provider>
     )
}
 
export default TareaState;