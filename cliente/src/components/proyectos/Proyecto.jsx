import React, { useContext } from 'react'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


//Le pasamos por medio de props el objeto proyecto desde ListadoProyectos.jsx
const Proyecto = ({proyecto}) => {

//Obtenemos qel state del formulario, de esta forma tenemos este componente
    //y podemos consumirlo sin necesidad de pasar props en cualquier parte del
    //arbol de componentes.
    const proyectosContext = useContext(proyectoContext);
    const { proyectoSelect } = proyectosContext;

    //Obtenemos la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    //función para agregar el proyecto actual
    const seleccionarProyecto = (id) => {
        proyectoSelect(id)//Fijasmos un proyecto actual
        obtenerTareas(id) //Extraemos las tareas del proyecto actualal hacer clic
    }

    return ( 
        <li className="fade-in">
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;