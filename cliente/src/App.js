import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
//Primero instalamos react-router-dom e importamos el router de arriba
//Todo lo que se coloque dentro de switch sera cada una de las diferentes paginas
//y lo que este fuera pero dentro del router se podrá ver de forma global.

//En <Route exact path="/" component={Proyectos} /> debera estar logeado para
//poder visualizar este componente 

import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'


//Aquí se hace la creacion de las rutas para s paginas
function App() { 

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
            
                <Route exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>  
          </AuthState>
        </AlertaState>       
      </TareaState>
    </ProyectoState>

  );
}

export default App;
