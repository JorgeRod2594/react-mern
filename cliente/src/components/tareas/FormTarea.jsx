import React from 'react'

const FormTarea = () => {

//Este componente sera el formulario de las tareas asociadas aun proyecto
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