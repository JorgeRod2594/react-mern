import React from 'react'
import Proyecto from './Proyecto'

const ListadoProyectos = () => {
    //Este componente lo llamamos en Sidebar.jsx

    const proyectos = [
        {nombre:'Tienda virtual'},
        {nombre: 'Intranet'},
        {nombre: 'Diseño de sitios web'}
    ];
    //En el sidebar tienen que importar este listado de proyectos

    //El listado de proyectos contiene un componente proyecto donde
    //se mostrará la informacion de cada proyecto.

    return ( 
        <ul className="listado-proyectos">
            
            {proyectos.map(proyecto => (
               <Proyecto
                proyecto={proyecto}
               /> 
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;