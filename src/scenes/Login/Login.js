import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorMessage from '../../components/ErrorMessage'
import { login } from '../../common/firebaseFunctions'
import { setUserInformation, isLoggedInChange } from '../../actions/user'

const useStyles = makeStyles(() => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    },
    row:{
        display: 'flex',
        flexDirection: 'row'
    },
    column:{
        display: 'flex',
        flexDirection: 'column'
    },
    title:{
        textAlign: 'center',
        marginBottom: 15
    },
    form: {
        width: 400,
        margin: 10,
    }
}));

const Login = ({
    setUserInformation,
    isLoggedInChange
}) => {
    const classes = useStyles();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const checkForm = () => {
        var isValid = true
        if(user.email === ''){
            setErrorEmail(true)
            isValid = false
            setErrorMessage('Faltan campos por rellenar')
        }
        if(user.password === ''){
            setErrorPassword(true)
            isValid = false
            setErrorMessage('Faltan campos por rellenar')
        }
        isValid && login(user, setErrorMessage, setUserInformation, isLoggedInChange)
    }

    return (
        <div className={classes.root}>
            <div className={classes.column}>
                <Typography variant="h5" className={classes.title}>
                    Iniciar sesión
                </Typography>
                <form className={classes.column}>
                    <TextField
                        variant="outlined"
                        label="Email"
                        className={classes.form}
                        error={errorEmail}
                        color="secondary"
                        onChange={(e) => {
                            if(e.target.value !== '' && errorEmail){
                                setErrorEmail(false)
                            }
                            setUser({...user, email: e.target.value})
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        label="Contraseña"
                        type="password"
                        className={classes.form}
                        error={errorPassword}
                        color="secondary"
                        onChange={(e) => {
                            if(e.target.value !== '' && errorPassword){
                                setErrorPassword(false)
                            }
                            setUser({...user, password: e.target.value})
                        }}
                    />
                    {
                        (errorMessage !== '') &&
                        <ErrorMessage message={errorMessage} />
                    }
                    <Button 
                        color="primary"
                        onClick={() => {
                            checkForm()
                        }}
                    >
                        Iniciar sesión
                    </Button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userLogged: state.user.isLoggedIn
})

const mapDispatchToProps = {
    setUserInformation,
    isLoggedInChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
export { Login }