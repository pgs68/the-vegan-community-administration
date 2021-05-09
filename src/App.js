import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css';
import {Redirect, Switch, Link, useLocation} from "react-router-dom";
import PublicRoute from './components/Authentication/PublicRoute'
import PrivateRoute from './components/Authentication/PrivateRoute'
import Header from './components/Header'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


//Scenes
import Home from './scenes/Home'
import Login from './scenes/Login'
import Comments from './scenes/Comments'

import { isLoggedInChange, setUserInformation } from './actions/user'
import { checkUserRolIsAdmin, getUserInformation } from './common/firebaseFunctions'

const useStyles = makeStyles(() => ({
  toolbar: {
      display: 'flex',
      justifyContent: 'start'
  },
  spaceBetweenButtons: {
    marginRight: 40
  }
}));

const App = ({
  firebase,
  userLogged,
  currentUser,
  isLoggedInChange,
  setUserInformation
}) => {
  const classes = useStyles();
  const location = useLocation();

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
        {
          userLogged && 
          <AppBar position="sticky" style={{height: 50}}>
            <Toolbar className={classes.toolbar}>
              <Link to={"/"} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                <Typography 
                  variant="button" 
                  style={{fontWeight: location.pathname === '/' ? 700: 300}} 
                  className={classes.spaceBetweenButtons}
                > 
                    Productos
                </Typography>
              </Link>
              <Link to={"/comments"} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                <Typography 
                  variant="button" 
                  style={{fontWeight: location.pathname === '/comments' ? 700: 300}}
                > 
                  Comentarios
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        }
        <Switch>
          <PrivateRoute 
            component={Home}
            path="/"
            isLogedIn={userLogged}
            exact
          />
          <PrivateRoute 
            component={Comments}
            path="/comments"
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
