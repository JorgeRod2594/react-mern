import React from 'react'
//Le pasamos por medio de props el objeto proyecto desde ListadoProyectos.jsx
const Proyecto = ({proyecto}) => {
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;