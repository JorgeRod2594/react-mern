import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
//Aqui vamos a definir el state que va a tener y las diferentes funciones con dispach 
// hacia los types

//Este es el state incial de toda la administracion del proyecto (creacion, eliminacion,etc..)
const ProyectoState = props => {
    //Definimos el state inicial similiar a redux mediante initialState que siempre es un objeto
    const initialState = {
        //este atributo es para inicializar el componente nuevo proyecto
        formulario: false
    }
    //Cuando utilizamos useReducer es como si utilizaramos useState aplicando destructurin
    //Creamos el dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Aqui de crean las funciones para el CRUD de proyectos


    //Retornamo el provider donde se crearan los datos 
    //Se le pasa props.children para que lo que le los diferentes componentes
    // hijo que sean parte de este provider que son consumer puedan compartirse datos 
    //y en value le pasamos un objeto, nuestro state inicial
    return (
        <proyectoContext.Provider
            value={{
                formulario: state.formulario
            }}
        >
            {props.children} 
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
//Esto lo consumimos en el app.js
