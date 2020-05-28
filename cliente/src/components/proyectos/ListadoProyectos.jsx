import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import { CSSTransition, TransitionGroup } from 'react-transition-group' //importamos la libreria que añadimos con npm i react-transition-group
//importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext'

const ListadoProyectos = () => {
    //Este componente lo llamamos en Sidebar.jsx

    //creamos una constante que le pasamos la funcion useContext con parametro proyectoConttext
    const proyectosContext = useContext(proyectoContext);
    //obtenemos la informacion de los proyectos mediante destructuring
    const {proyectos, obtenerProyectos} = proyectosContext;//esto viene desde proyectoState
    //Extraemos también la funcion obtenerProyectos

    //Queremos que la funcion obtenerProyectos se ejecute imediatamente cargue este componente
    //para esto utilizamos useEffect
    useEffect(() => {
        obtenerProyectos();
    },[])//Para que corra una sola vez y obtenga los proyectos usamos un arreglo vacio

    //la primera vez que entra a la base de datos será null, por eso es necesaria esta validancion
    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;

    //Ahora queremos que el state

    //En el sidebar tienen que importar este listado de proyectos

    return ( 
        <ul className="listado-proyectos">
            
            <TransitionGroup>{
                proyectos.map(proyecto => (
                    <CSSTransition
                    key={proyecto.id}
                    timeout={200} //Esta el laduración de la animación
                    classNames="proyecto"
                    >
                        <Proyecto      
                            proyecto={proyecto}
                        /> 
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;