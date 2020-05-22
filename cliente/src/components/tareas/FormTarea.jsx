import React, { useContext } from 'react'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'

const FormTarea = () => {
//Este componente sera el formulario de las tareas asociadas aun proyecto
//Con este formulario se utilizará para crear una tarea o modificar una existente.

    //Mostrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyectoselect} = proyectosContext;

    //Si no hay proyecto seleccionado 
    if(!proyectoselect) return null;

    //MAntenemos esta linea para poder aplicarle cambios al array de proyectos y poder agregarlos
    const [proyectoSeleccionado] = proyectoselect;

    return ( 
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Tarea"
                        name="nombre"
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar tarea"
                    />
                </div>
            </form>
        </div>
     );
}
 
export default FormTarea;