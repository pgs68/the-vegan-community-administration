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
import { checkUserRolIsAdmin, getUserInformation } from './common/firebaseFunctions'

const App = ({
  firebase,
  userLogged,
  currentUser,
  isLoggedInChange,
  setUserInformation
}) => {


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setUserInformation({email: user.email})
          isLoggedInChange(true)
        } else {
            // No user is signed in.
            isLoggedInChange(false)
        }
    });    
  }, [userLogged])

  return (
      <div>
        <Header userLogged={userLogged} userLoggedChange={isLoggedInChange}/>
        <Switch>
          <PrivateRoute 
            component={Home}
            path="/"
            isLogedIn={userLogged}
            exact
          />
          <PublicRoute 
            component={(userLogged && currentUser.email !== '') ? () => <Redirect to={"/"} /> : Login}
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
  userLogged: state.user.isLoggedIn,
  currentUser: state.user.currentUser
})

const mapDispatchToProps = {
  isLoggedInChange,
  setUserInformation,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
export { App }
