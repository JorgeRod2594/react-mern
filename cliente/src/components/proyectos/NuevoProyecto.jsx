import React, {Fragment} from 'react'

const NuevoProyecto = () => {
    //lo importamos al Sidebar donde se utilizará.
    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            >Nuevo proyecto
            </button>

            <form
                className="formulario-nuevo-proyecto"
            >
                <input 
                type="text"
                className="input-text"
                placeholder="Nombre del proyecto"
                name="nombreproy"/>

                <input 
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar proyecto"/>

            </form>
        </Fragment>
     );
}
 
export default NuevoProyecto;