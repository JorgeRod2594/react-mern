import { TAREAS_PROYECTO,
         AGREGAR_TAREA_P,
         VALIDAR_TAREA_P,
         ELIMINAR_TAREA_P } from '../../types';

export default (state, action) => {
    switch(action.type){

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
                //Extrae todas las tareas que sean iguales al id del proyecto.
            }

        case AGREGAR_TAREA_P:
            return {
                ...state,
                tareas: [action.payload, ...state.tareas],//creamos un nuevo arreglo de tareas + la nueva tarea a guardar
                errortarea: false
            }

        case VALIDAR_TAREA_P:
            return {
                ...state,
                errortarea: true
            }

        case ELIMINAR_TAREA_P:
            return {
                ...state,
                tareas: state.tareas.filter((tarea) => tarea.id !== action.payload)
            }

        default: //siempre se retorna un default state
            return state;
    }
}