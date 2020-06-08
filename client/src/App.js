import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/logout'/>
            <Route exact path='/register' component={Register}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
