import { createContext } from 'react'

/*El contexto en React es una forma de pasar datos que pueden 
considerarse globales a un árbol de componentes sin la necesidad 
de utilizar Redux.*/

//creamos una funcion que herede de context
const proyectoContext = createContext();

export default proyectoContext;
