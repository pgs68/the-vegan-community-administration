import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseCodes = (code) => {
    switch(code){
        case 'auth/email-already-in-use':
            return 'El email ya está en uso'
        case 'auth/invalid-email':
            return 'El email no tiene un formato válido'
        case 'auth/user-not-found':
            return 'El usuario no existe'
        case 'auth/wrong-password':
            return 'Contraseña incorrecta'
        default:
            console.log(code)
            return 'Ha ocurrido un error'
    }
}

const checkUserRolIsAdmin = (uid) => {
    firebase.firestore().collection("usuarios").where('UID', '==', uid).get()
        .then((snapshot) => {
            if(snapshot.docs[0].data().rol === 'admin'){
                return true
            } else {
                return false
            }
        })
}

const getUserInformation = (uid) => {
    firebase.firestore().collection("usuarios").where('UID', '==', uid).get()
        .then((snapshot) => {
            return snapshot.docs[0].data()
        })
}

const login = (user, setError, setUserInformation, isLoggedInChange) => {
    firebase.firestore().collection("administradores").where('email', '==', user.email).get()
        .then((snapshot) => {
            //Si el email está en la colección de administradores, se prueba a iniciar sesión
            if(snapshot.docs.length > 0){
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        firebase.auth()
                            .signInWithEmailAndPassword(user.email, user.password)
                            .then((userLogged) => {
                                isLoggedInChange(true)
                                setUserInformation({email: userLogged.user.email})
                            })
                            .catch(error => {
                                setError(firebaseCodes(error.code))
                            });
                    })
            } else {
                setError("Acceso permitido sólo para los administradores")
            }
        })
}

const logout = (isLoggedInChange) => {
    firebase.auth()
        .signOut()
        .then(() => {
            isLoggedInChange(false)
        })
}

export {
    login,
    logout,
    checkUserRolIsAdmin,
    getUserInformation
}