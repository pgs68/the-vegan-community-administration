import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route, Link} from "react-router-dom";
import PublicRoute from './components/Authentication/PublicRoute'
import PrivateRoute from './components/Authentication/PrivateRoute'

//Scenes
import Home from './scenes/Home'
import Login from './scenes/Login'

const App = ({
  firebase
}) => {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <PrivateRoute 
            component={Home}
            path="/"
            isLogedIn={true}
            exact
          />
          <PublicRoute 
            component={Login}
            path="/login"
            exact
          />
          <PrivateRoute
            component={() => <Redirect to={"/"} />}
            path="/"
            isLogedIn={true}
          />        
        </Switch>
      </div>
  );
}

const mapStateToProps = state => ({
  userLogged: state.user.isLoggedIn
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
export { App }
