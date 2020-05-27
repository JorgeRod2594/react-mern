import { TAREAS_PROYECTO,
         AGREGAR_TAREAS_P
                         } from '../../types';

export default (state, action) => {
    switch(action.type){

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
                //Extrae todas las tareas que sean iguales al id del proyecto.
            }

        case AGREGAR_TAREAS_P:
            return {
                ...state,
                tareas: [...state.tareas, action.payload]//creamos un nuevo arreglo de tareas + la nueva tarea a guardar
            }

        default: //siempre se retorna un default state
            return state;
    }
}