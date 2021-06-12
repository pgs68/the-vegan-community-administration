import { combineReducers } from 'redux'

import user from './user'
import product from './product'

const theVeganCommunityReducer = combineReducers({
    user,
    product
})

export default theVeganCommunityReducer