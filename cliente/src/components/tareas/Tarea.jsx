import React, { useContext } from 'react'
//Este componente se muestra en ListadoTareas
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const Tarea = ({tarea}) => {

    //Obtenemos el proyecto seleccionado
    const proyectosContext = useContext(proyectoContext);
    const {proyectoselect} = proyectosContext;
    //Le aplicamos destructuring
   

    //Obtenemos las tareas del proyecto seleccionado
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea,obtenerTareas } = tareasContext;

    //Funcion que se ejecuta cuando el usuario da clic en el botón eliminar tarea
    const deleteTarea = (id) => {
        eliminarTarea(id);
        obtenerTareas(proyectoselect[0].id);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ?(
                        <button
                            type="button"
                            className="completo"
                        >Completo</button>
                    )
                    :(
                        <button
                            type="button"
                            className="incompleto"
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deleteTarea(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;