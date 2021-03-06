import React, { useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => { //Para hacer la redireccion, porque utilizamos React Router Dom tenemos acceso a history

    //Extraemos los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
    useEffect(() => {
        console.log(autenticado)
        //Si el usuario está autenticado
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje) { //Caso contrario mostramos
            mostrarAlerta(mensaje.msg,'error');
            return;
        }
        
    }, [mensaje, autenticado, props.history])//Dependencias que le pasamos y va a escuchar

    //Creamos el state que para este componente. Nos permite guardar los datos de sesion
    const [nusuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confpassword:''
    });


    //Extraemos de usuario
    const {nombre, email, password, confpassword} = nusuario;

    //declaramos la funcion que se estará ejecutando cada vez que el usuario escriba algo.
    const onChangeLogin = (e) => {
        guardarUsuario({
            /*Tomamos una copia de usuario, lo que este en usuario para que no
            re escriba lo que esta en el otro campo en el state*/
            ...nusuario, /*y re escrbimos la copia con */
            [e.target.name] : e.target.value 
            /*le pasamos por medio del nombre del input el valor del mismo*/
        })
    }
    //Validaremos con express que tenga un email valido
    //Cuando el usuario quiere iniciar sesion
    const onSubmitLogin = (e) => {
        
        e.preventDefault();
        
        //Validar que no exitan campos vacios
        if(nombre.trim() === '' || 
            email.trim() === '' ||
            password === '' || 
            confpassword === ''){
                mostrarAlerta('Todos los campos son obligatorios','error');
                return;
            }

        //Validar password (mínimo 6 caracteres).
        if(password.length < 6){
            mostrarAlerta('El password debe de ser mayor a 6 caracteres','error');
            return;
        }

        //Validar que los dos password sean iguales.
        if(password !== confpassword) {
            mostrarAlerta('Las contraseñas deben coincidir','error');
            return;
        }

        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })

        guardarUsuario({
        nombre:'',
        email:'',
        password:'',
        confpassword:''
        })

    }

    return ( 
        <div className="form-usuario">
            
            <div className="contenedor-form sombra-dark">
                
                <h1>Crear cuenta</h1>

                <form
                    onSubmit={onSubmitLogin}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        placeholder="Tu nombre"
                        onChange={onChangeLogin}/>
                    </div>

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
                        <label htmlFor="confpassword">Confirmar password</label>
                        <input type="password"
                        id="confpassword"
                        name="confpassword"
                        value={confpassword}
                        placeholder="Confirmar password"
                        onChange={onChangeLogin}/>
                    </div>

                    {alerta ? (<div className={`alerta zum ${alerta.categoria}`}>{alerta.msg}</div>): null}

                    <div className="campo-form">

                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesion"/>
                        
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar sesion
                </Link>

            </div>
        </div>
     );
}
 
export default NuevaCuenta;