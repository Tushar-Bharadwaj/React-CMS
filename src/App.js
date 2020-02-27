import React from 'react';
import { Router, Switch } from "react-router-dom";
import { history } from 'helper/history';
import Home from './components/Home';
import Login from './pages/Login/Login';
import './App.css';
import AppRoute from './components/Route/AppRoute';
import DashboardLayout from './components/Layouts/DashboardLayout/DashboardLayout';
import { MainLayout } from './components/Layouts/MainLayout/MainLayout';
import { AuthenticationService } from 'services/AuthenticationService';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }
  componentDidMount() {
    AuthenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x
    }));
  }
  logout = () => {
     AuthenticationService.logout();
     history.push('/login');
  }

  render() {
  return (
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Login} layout={MainLayout}/>
          <AppRoute exact path="/Home" component={Home} layout={DashboardLayout} />
        </Switch>
      </Router>
    );
  }
  
}

export default App;
