import React, { useContext, useState, useEffect } from 'react'
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
//Este componente sera el formulario de las tareas asociadas aun proyecto
//Con este formulario se utilizará para crear una tarea o modificar una existente.

    //Mostrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyectoselect} = proyectosContext;

    //Obtenemos la funcion del contexto tarea
    const tareasContext = useContext(tareaContext);
    const { errortarea, tareaseleccionada, obtenerTareas, agregarTarea, validarTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada para mostrarla
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada); //Guarda la tarea seleccionada
        } else {
            guardarTarea({
                nombre: '' //Para dejar limpio el formulario
            })
        }
    },[tareaseleccionada])//Aqui va a estar revisando esta dependencia cambia para poder mostrarla

    //State del formulario. tarea es un objeto porque le tenemos que pasar un id y el id al proyecto que pertenece
    const [tarea, guardarTarea] = useState({
        nombre: '',

    });

    //Extraer el nombre del proyecto con destructuring
    const { nombre } = tarea 

    //Si no hay proyecto seleccionado 
    if(!proyectoselect) return null;

    //MAntenemos esta linea para poder aplicarle cambios al array de proyectos y poder agregarlos
    const [proyectoSeleccionado] = proyectoselect;

    //Leer los valores del formulario
    const handleChange = (e) => { //handleChange para poder acceder a e.target.name y .value
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value //Esto se implementa asi porque si queremos incluir más campos
            //a futuro no vamos a tener que medificar nada de esta función.
        })
    }

    //Funcion para agregar la nueva tarea 
    const onSubmit = e => {
        e.preventDefault();

        //Validar el objeto tarea
        if(nombre.trim() === '') {//trim es por si el usuario pone espacios los elimine
            validarTarea();
            return; //Para que detenga la ejecución
        }//Pasar la validacion

        //agregar la nueva tarea al state de tareas
        tarea.proyectoId = proyectoSeleccionado.id; //Al objeto tarea le agregamos el id del proyecto seleccionado
        tarea.estado = false; //Por default todos los proyecto inicializan en false 
        agregarTarea(tarea);
        //Volvemos a obtener las tareas del proyecto seleccionado
        obtenerTareas(proyectoSeleccionado.id);
        //Reiniciamos el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Guardar cambios" : "Agregar tarea" }
                    />
                </div>
            </form>
            {errortarea 
            ? <p className="mensaje error zum">El nombre de tarea es obligatorio</p> 
            : null}
        </div>
     );
}
 
export default FormTarea;