
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Overview from './Overview.js'
import Projects from './Projects.js'
import Employees from './Employees.js'
import Teams from './Teams.js'
import NotFound from './NotFound.js'


class App extends Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Overview title="Overview" />
        )}/>
        <Route exact path='/projects' render={() => (
          <Projects title="Projects" />
        )}/>
        <Route exact path='/employees' render={() => (
          <Employees title="Employees" />
        )}/>
        <Route exact path='/teams' render={() => (
          <Teams title="Teams" />
        )}/>
        <Route render={() => (
          <NotFound title="Not Found" />
        )}/>
      </Switch>
    )

  }
}

export default App;