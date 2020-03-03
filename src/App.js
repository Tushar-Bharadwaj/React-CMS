import React from 'react';
import { Router, Switch } from "react-router-dom";
import { history } from 'helper/history';
import Home from './pages/UserManagement/Home';
import Genre from './pages/NewsComponents/GenreManagement/Genre';
import Login from './pages/Login/Login';
import Locality from './pages/NewsComponents/LocalityManagement/Locality';
import Language from './pages/NewsComponents/LanguageManagement/Language';
import Tags from './pages/NewsComponents/TagManagement/Tags';
import './App.css';
import AppRoute from './components/Route/AppRoute';
import PrivateRoute from './components/Route/PrivateRoute';
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
     history.push('/');
  }

  render() {
  return (
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Login} layout={MainLayout}/>
          <PrivateRoute exact path="/home" component={Home} layout={DashboardLayout} />
          <PrivateRoute exact path="/genre" component={Genre} layout={DashboardLayout} />
          <PrivateRoute exact path="/locality" component={Locality} layout={DashboardLayout} />
          <PrivateRoute exact path="/language" component={Language} layout={DashboardLayout} />
          <PrivateRoute exact path="/tags" component={Tags} layout={DashboardLayout} />



        </Switch>
      </Router>
    );
  }
  
}

export default App;
