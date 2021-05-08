import firebase from 'firebase/app'
import 'firebase/firestore'

const TypeActionsAuth = {
    IS_LOGGED_IN_CHANGE: 'IS_LOGGED_IN_CHANGE',
    SET_USER_INFORMATION: 'SET_USER_INFORMATION'
}

const isLoggedInChange = (value) => ({
    type: TypeActionsAuth.IS_LOGGED_IN_CHANGE,
    payload: {
        value
    }
})

const setUserInformation = (user) => ({
    type: TypeActionsAuth.SET_USER_INFORMATION,
    payload: { user }
})

export {
    TypeActionsAuth,
    isLoggedInChange,
    setUserInformation
}