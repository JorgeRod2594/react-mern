import React, {Fragment, useState, useContext} from 'react'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'
//Una de las grandes ventajas de implemtar esta formad e trabajo es que no
//tenemos que estar pasando props por todos los componentes, es como tener
//toda la complejidad que te da Redux combinado con la sencillez que te da
//context

const NuevoProyecto = () => {

    //Obtenemos qel state del formulario, de esta forma tenemos este componente
    //y podemos consumirlo sin necesidad de pasar props en cualquier parte del
    //arbol de componentes.
    const proyectosContext = useContext(proyectoContext);
    //De esta forma, todo las funciones que se definan en proyectoState podremos
    //implementarlo con la linea de arrbia e importanto el context a utilizar.
    const {formulario} = proyectosContext; //obtenemos el valor del state formulario con destructuring

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

            {formulario
                ?( //si el valor del state es true regresa esto
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
                ): null //si es false no muestres y no regreses nada
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;