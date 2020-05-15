import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Login = () => {


//Creamos el state que para este componente. Nos permite guardar los datos de sesion
const [usuario, guardarUsuario] = useState({
    email:'',
    password:''
});

//Extraemos de usuario
const {email, password} = usuario;

//declaramos la funcion que se estará ejecutando cada vez que el usuario escriba algo.
const onChangeLogin = (e) => {
    guardarUsuario({
        /*Tomamos una copia de usuario, lo que este en usuario para que no
        re escriba lo que esta en el otro campo en el state*/
        ...usuario, /*y re escrbimos la copia con */
        [e.target.name] : e.target.value 
        /*le pasamos por medio del nombre del input el valor del mismo*/
    })
}
//Validaremos con express que tenga un email valido
//Cuando el usuario quiere iniciar sesion
const onSubmitLogin = (e) => {
    e.preventDefault();

    //Validar que no exitan campos vacios

    //Pasarlo al action

}

    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Inciar sesion</h1>

                <form
                    onSubmit={onSubmitLogin}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Tu Email"
                        onChange={onChangeLogin}/>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Tu password"
                        onChange={onChangeLogin}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesion"/>
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;