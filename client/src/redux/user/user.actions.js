import {UserActionTypes} from './user.types'

//Action creators is an function that returns an action object
export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})
