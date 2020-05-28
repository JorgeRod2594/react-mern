import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group' //importamos la libreria que añadimos con npm i react-transition-group
//Este componente se muestra en Proyectos


const ListadoTareas = () => {
//El objetivo de este componente es que al dar clic en algun proyecto, la información
//del mismo se muestre en este componente para poder editarlo y en caso de querer crear
//una tarea para un proyecto sirva para crear la misma.

    //creamos una constante que le pasamos la funcion useContext con parametro proyectoConttext
    const proyectosContext = useContext(proyectoContext);
    //obtenemos la informacion de los proyectos mediante destructuring
    const {proyectoselect, proyectoDeleted} = proyectosContext;//esto viene desde proyectoState
    //Extraemos el proyecto seleccionado

    //Obtenemos las tareas del proyecto seleccionado
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;

    //Si no hay proyecto seleccionado 
    if(!proyectoselect) return <h2>Selecciona un proyecto.</h2>;

    //En caso contrario, aplicamos array destructuring para extraer el proyecto seleccionado
    const [proyectoSeleccionado] = proyectoselect;

    //Eliminar un proyecto
    const onClickEliminarP = () => {
        proyectoDeleted(proyectoSeleccionado.id)
        
    }

    //estos datos son temporales, sirven para verificar el funcionamiento del componente
    //El primer key es el nombre de la tarea y el segudo si esta terminado o no.
    // const tareasProyecto = []; sustituimos por tareasproyecto que viene del state

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoSeleccionado.nombre}</h2> 

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 //utilizamos un ternario para mostrar la información
                    ? (<li className="tarea"><p>No hay tareas</p></li>)

                    : <TransitionGroup>{
                        tareasproyecto.map(tarea => ( //damos por implicito el return del componente tarea
                            <CSSTransition
                                key={tarea.id}//Lo movemos aquí porque map es el primer hijo de tareasproyecto
                                timeout={600} //Esta el laduración de la animación
                                classNames="tarea"
                            >
                                <Tarea 
                                    tarea={tarea}
                                /> 
                            </CSSTransition>
                        ))}
                      </TransitionGroup>
                }
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminarP}
            >Eliminar proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;