import React, { useReducer } from 'react';
import {v4 as uuid} from "uuid";
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
//Aqui vamos a definir el state que va a tener y las diferentes funciones con dispach 
// hacia los types
import { FORMULARIO_PROYECTO,
         OBTENER_PROYECTOS,
         AGREGAR_PROYECTOS,
         VALIDAR_FORMULARIO,
         PROYECTO_SELECCIONADO,
         ELIMINAR_PROYECTO } from '../../types'; //extraemos formulario proyecto de types. 

//Este es el state incial de toda la administracion del proyecto (creacion, eliminacion,etc..)
const ProyectoState = props => {

    //Lo cambiamos aqui porque simula la insercion de la base de datos
    const proyectos = [
        {id: 1, nombre:'Tienda virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño de sitios web'},
        {id: 4, nombre: 'Diseño de sitios admin'}
    ]

    //Definimos el state inicial similiar a redux mediante initialState que siempre es un objeto
    const initialState = {
        //este atributo es para inicializar el componente nuevo proyecto
        formulario: false,
        proyectos: [],
        errorformulario: false, //Esta es una bandera para revisar errores en el formulario para registrar proyecto.
        //pasamos esto al state
        proyectoselect: null //Este parametro es para seleccionar el proyecto y poder visualizar sus tareas
    }
    //Cuando utilizamos useReducer es como si utilizaramos useState aplicando destructurin
    //Creamos el dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)
    

    //Aqui de crean las funciones para el CRUD de proyectos
    /*En esta parte podemos ver la importancia del dispatch porque le pasamos 
    un type (FORMULARIO_PROYECTO) y va a estar asociado con algun caso en el
    switch de proyectoReducer para poder cambiar el state.*/
    const mostrarFormulario = () => {//Esta parte llama las funciones del reducer
        dispatch({//LE indicamos que el type que evaluara el switch del reducer
            type: FORMULARIO_PROYECTO //sera formulario proyecto.Tambien lo importamos en proyectoReducer
        })
    }

    //Obtener los proyectos y los mandamos al reducer para verificar el case
    //Siempre lo que toma mi funcion como parametro sera mi payload en cualquier caso
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    //Agregar un nuevo proyecto y le agregamos un id para poder identificarlo
    const agregarProyecto = (proyecto) => {
        proyecto.id = uuid();//Le agregamos un id
        //y lo insertamos en el state
        dispatch({
            type: AGREGAR_PROYECTOS,
            payload: proyecto
        })
    }

    //Valida el formulario por errrores
    const mostrarErrorFormulario = () => {
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }
    
    //Selecciona el proyecto que el usuario de clic por medio se su id
    const proyectoSelect = (proyectoId) => {
        dispatch({
            type: PROYECTO_SELECCIONADO,
            payload: proyectoId
        })
    }
    
    //Emiliminar el proyecto que el usuario selecciona por medio de su id
    const proyectoDeleted = (proyectoId) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }
    

    //Retornamo el provider donde se crearan los datos 
    //Se le pasa props.children para que lo que le los diferentes componentes
    // hijo que sean parte de este provider que son consumer puedan compartirse datos 
    //y en value le pasamos un objeto, nuestro state inicial
    return (
        /*Recomendacion: El state mantelo de una sola palabra todo en minusculas y las 
        funciones mantenlas de dos palabras con una mayuscula en la segunda palabras para
        poder identificarlos mejor.*/
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyectoselect: state.proyectoselect,

                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarErrorFormulario,
                proyectoSelect,
                proyectoDeleted
            }}
        >
            {props.children} 
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
//Esto lo consumimos en el app.js
