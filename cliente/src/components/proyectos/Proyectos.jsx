import React from 'react';
import Sidebar from '../layout/Sidebar'
import Bar from '../layout/Bar'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'


const Proyectos = () => {
    //Este es el contenedor principal

    //La idea es que del lado izq. en aside estará el formulario donde podemos
    //crear nuevos proyectos y listarlos y el área principal es donde podemos 
    //administrar nuestras tareas 
    return ( 
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <Bar />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;