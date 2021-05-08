import { Actions } from '../../actions/user'
import { fullfilled, rejected, pending } from '../utils'

const isLoggedInChange = (state, { payload }) => {
    if(payload.value){
        return {
            ...state,
            isLoggedIn: payload.value
        }
    } else {
        return {
            ...state,
            isLoggedIn: payload.value,
            currentUser: {}
        }
    }
    
}

const setUserInformation = (state, { payload }) => ({
    ...state,
    currentUser: payload.user
})

const Auth = {
    [Actions.IS_LOGGED_IN_CHANGE]: isLoggedInChange,
    [Actions.SET_USER_INFORMATION]: setUserInformation,
}

export default Auth