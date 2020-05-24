import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AdicionarMembro from "./components/add-membro.component.js"
import Membro from "./components/membro.component"
import MembrosLista from './components/membros-list.component';
import TemploLista from './components/templo-list.component';
import AdicionarTemplo from './components/add-templo.component';
import Templo from './components/templo.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
            <a href="/membros" className="navbar-brand">Igreja</a>
            <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to={"/templo"} className="nav-link">
                  Templo
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/membros"} className="nav-link">
                  Membros
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/relatorios"} className="nav-link">
                  Relatórios
                </Link>
              </li>
              
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/membros"} component={MembrosLista} />
              <Route exact path="/adicionar" component={AdicionarMembro} />
              <Route exact path="/templo" component={TemploLista} />
              <Route exact path="/templo/adicionar" component={AdicionarTemplo} />
              <Route exact path="/templo/:id" component={Templo} />
              <Route path="/membros/:id" component={Membro} />
              
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;