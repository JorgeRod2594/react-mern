import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTOS } from '../../types'

export default (state, action) => {
    //El reducer funciona igual que en redux, unicamente cambia el state
    //Evaluamos las acciones medieante casos 
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return {
                ...state, //realizamos una copia del state
                formulario: true //le indicamos que active el formulario
            }
        
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload //le pasamos el payload que generamos en proyectoState
            }

        case AGREGAR_PROYECTOS:
            return {
                ...state,//REalizamos una copia del state
                proyectos: [...state.proyectos, action.payload],//Y al arreglo de objetos (proyectos), le agregamos el nuevo objetvo (el nuevo proyecto).
                formulario:false //Agregamos false en el formulario para ocultarlo despues de agregar y en NuevoProyecto reiniciamos el form.
            }

        default: //siempre se retorna un default state
            return state;

    }

}