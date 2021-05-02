import React, { useState, useEffect } from "react"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

}) => {
    const classes = useStyles();
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    async function checkForm(){
        user.name === '' && setErrorName(true)
        user.password === '' && setErrorPassword(true)
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
                        error={errorName}
                        color="secondary"
                        onChange={(e) => {
                            if(e.target.value !== '' && errorName){
                                setErrorName(false)
                            }
                            setUser({...user, name: e.target.value})
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

export default Login