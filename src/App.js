import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css';
import {Redirect, Switch, Link} from "react-router-dom";
import PublicRoute from './components/Authentication/PublicRoute'
import PrivateRoute from './components/Authentication/PrivateRoute'
import Header from './components/Header'


//Scenes
import Home from './scenes/Home'
import Login from './scenes/Login'

import { isLoggedInChange, setUserInformation } from './actions/user'

const App = ({
  firebase,
  userLogged,
  isLoggedInChange,
  setUserInformation
}) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setUserInformation(firebase.auth().currentUser.uid)
            isLoggedInChange(true)
        } else {
            // No user is signed in.
            isLoggedInChange(false)
        }
    });    
  }, [userLogged])

  return (
      <div>
        <Header userLogged={userLogged}/>
        <Switch>
          <PrivateRoute 
            component={Home}
            path="/"
            isLogedIn={userLogged}
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
  isLoggedInChange,
  setUserInformation,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
export { App }
