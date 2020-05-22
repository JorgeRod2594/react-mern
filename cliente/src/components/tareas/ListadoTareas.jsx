import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'
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
    const tareasProyecto = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir colores', estado: false},
        {nombre: 'Elegir plataformas de pago', estado: true},
        {nombre: 'Elegir hosting', estado: false},
    ];

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoSeleccionado.nombre}</h2> 

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 //utilizamos un ternario para mostrar la información
                    ? (<li className="tarea"><p>No hay tareas</p></li>)

                    : tareasProyecto.map(tarea => ( //damos por implicito el return del componente tarea
                            <Tarea 
                                //falta el key
                                tarea={tarea}
                            /> //como prop hacia el componente.
                    ))
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