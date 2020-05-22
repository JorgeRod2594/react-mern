import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTOS,
         VALIDAR_FORMULARIO,
         PROYECTO_SELECCIONADO,
         ELIMINAR_PROYECTO } from '../../types'

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
                formulario:false, //Agregamos false en el formulario para ocultarlo despues de agregar y en NuevoProyecto reiniciamos el form.
                errorformulario:false //Si contiene algo el formulario para crear proyecto oculta el mensaje y lo guarda.
            }
        
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }

        case PROYECTO_SELECCIONADO:
            return {
                ...state,//hacemos una copia de state
                proyectoselect: state.proyectos.filter((proyecto) => (
                        proyecto.id === action.payload //Si proyecto.id dentro del arreglo de proyecto es igual 
                        //al payload (pryecto seleccionado) lo extrae y crea un nuevo arreglo que se llamará proyecto.
                    )
                )
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,//
                proyectos: state.proyectos.filter((proyecto) => ( //Hacemos la operacion inversa a la anterior
                        proyecto.id !== action.payload//Mandamos a la copia del state todos lo proyecto disferentes al de id para eliminar.
                    )
                ),
                proyectoselect: null
            }

        default: //siempre se retorna un default state
            return state;

    }

}