import {UserActionTypes} from './user.types'

//A reducer is just a function that gets two parameters: currentState (obj) and action (obj w/ type and payload)

//Setting an initial state as a default parameter to userReducer
const INITIAL_STATE = {
    currentUser: null
}
//state will be passed from the redux store will pass this reducer whenever an action fires. The state will be whatever the state is in that moment the action is fired.
//All reducers recieved every action, even if it isnt relevant to that reducer. Therefore we want to default return the state.
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default: 
            return state
    }
}

export default userReducer

