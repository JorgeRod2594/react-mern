import React from 'react'

const Bar = () => {


//Este componente contiene El nombre de usuario que ingreso y un boton
//para cerrar sesion
    return ( 
        <header className="app-header">
            <a href="!#" className="nombre-usuario">Hola<span> Jorge Rojas</span></a>

            <nav className="nav-principal">
                <a href="!#">Cerrar sesion</a>
            </nav>
        </header>
     );
}
 
export default Bar;