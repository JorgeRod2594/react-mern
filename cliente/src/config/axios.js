import axios from 'axios'

//Creamos el cliente axios para poder hacer las peticiones al back end 
const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
    /*El baseURL podemos modificarlo cuando pasemos a produccion y asi no modificar nada.*/
});

export default clienteAxios;