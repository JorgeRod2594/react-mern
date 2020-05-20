import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'

const ListadoProyectos = () => {
    //Este componente lo llamamos en Sidebar.jsx

    //Extraemos proyectos de state inicial mediante destructuring
    const proyectosContext = useContext(proyectoContext);
    //obtenemos la informacion de los proyectos mediante destructuring
    const {proyectos, obtenerProyectos} = proyectosContext;//esto viene desde proyectoState
    //Extraemos también la funcion obtenerProyectos

    //Queremos que la funcion obtenerProyectos se ejecute imediatamente cargue este componente
    //para esto utilizamos useEffect
    useEffect(() => {
        obtenerProyectos();
    },[])//Para que corra una sola vez y obtenga los proyectos usamos un arreglo vacio

    //la primera vez que entra a la base de datos será null, por eso es necesaria esta validancion
    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return null;

    //Ahora queremos que el state

    //En el sidebar tienen que importar este listado de proyectos

    return ( 
        <ul className="listado-proyectos">
            
            {proyectos.map(proyecto => (
               <Proyecto
                key={proyecto.id}
                proyecto={proyecto}
               /> 
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;