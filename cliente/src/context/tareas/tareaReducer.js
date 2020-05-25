import { TAREAS_PROYECTO 
} from '../../types';

export default (state, action) => {
    switch(action.type){

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
                //Extrae todas las tareas que sean iguales al id del proyecto.
            }

        default: //siempre se retorna un default state
            return state;
    }
}