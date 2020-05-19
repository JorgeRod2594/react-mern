import { FORMULARIO_PROYECTO } from '../../types'

export default (state, action) => {
    //El reducer funciona igual que en redux, unicamente cambia el state
    //Evaluamos las acciones medieante casos 
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return {
                ...state, //realizamos una copia del state
                formulario: true //le indicamos que active el formulario
            }

        default: //siempre se retorna un default state
            return state;

    }

}