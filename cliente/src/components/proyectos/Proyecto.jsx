import React, { useContext } from 'react'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'

//Le pasamos por medio de props el objeto proyecto desde ListadoProyectos.jsx
const Proyecto = ({proyecto}) => {

//Obtenemos qel state del formulario, de esta forma tenemos este componente
    //y podemos consumirlo sin necesidad de pasar props en cualquier parte del
    //arbol de componentes.
    const proyectosContext = useContext(proyectoContext);

    const { proyectoSelect } = proyectosContext;

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => proyectoSelect(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;