import React, {Fragment, useState} from 'react'

const NuevoProyecto = () => {

    //Definimos el sate de este componente
    //Creamos un objeto para asociarlo con un id y no tener problemas
    //para identificarlo o borrarlo.
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    //Aplicamos destructuring y extraemos el nombre del proyecto
    const {nombre} = proyecto;

    //Lee los contenidos de proyecto
    //esta funcion la agregamos al input donde el usuario escribe
    const onChangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,//tomamos una copia del proyecto
            [e.target.name] : e.target.value //le asignamos el valor
        });
    }

    //Cuando el usuario envia un proyecto nuevo
    const onSubmitProyecto = (e) => {
        //PreventDefault para que no haga la accion default y nos permita
        //hacer las operaciones que necesitemos
        e.preventDefault();

        //Validar los datos

        //Agregar al state

        //reainiciar el form

    }

    //lo importamos al Sidebar donde se utilizará.
    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            >Nuevo proyecto
            </button>

            <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
            >
                <input 
                type="text"
                className="input-text"
                placeholder="Nombre del proyecto"
                onChange={onChangeProyecto}
                value={nombre}
                name="nombre"/>

                <input 
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar proyecto"/>

            </form>
        </Fragment>
     );
}
 
export default NuevoProyecto;