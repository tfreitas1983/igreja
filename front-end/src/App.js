import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AdicionarMembro from "./components/add-membro.component.js"
import Membro from "./components/membro.component"
import MembrosLista from './components/membros-list.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
            <a href="/membros" className="navbar-brand">Igreja</a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/membros"} className="nav-link">
                  Membros
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/adicionar"} className="nav-link">
                  Adicionar
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/membros"]} component={MembrosLista} />
              <Route exact path="/adicionar" component={AdicionarMembro} />
              <Route path="/membros/:id" component={Membro} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;