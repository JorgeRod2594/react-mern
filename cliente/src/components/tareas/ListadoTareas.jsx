import React, { Fragment } from 'react'
import Tarea from './Tarea'
//Este componente se muestra en Proyectos

const ListadoTareas = () => {
//El objetivo de este componente es que al dar clic en algun proyecto, la información
//del mismo se muestre en este componente para poder editarlo y en caso de querer crear
//una tarea para un proyecto sirva para crear la misma.

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
            <h2>Proyecto: Tienda virtual</h2> 

            <ul className="listado-tareas">
                {tareasProyecto.length === 0 //utilizamos un ternario para mostrar la información
                    ? (<li className="tarea"><p>No hay tareas</p></li>)

                    : tareasProyecto.map(tarea => ( //damos por implicito el return del componente tarea
                            <Tarea 
                                tarea={tarea}
                            /> //como prop hacia el componente.
                    ))
                }
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
            >Eliminar proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;