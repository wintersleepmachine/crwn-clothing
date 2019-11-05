//The root-reducer is the base reducer object that represnts all of our state of the application.
//Combines all of our other states together.
//All of the other reducers we write will go into this root-reducer

//Function that will combine the reducers and make up our redux store/state
import {combineReducers} from 'redux'

//Importing userReducer
import userReducer from './user/user.reducer'

//Remeber that our full state is one big object. The keys that represent the individual slices of state are the actual reducers that we write.
//We pull the reducer with its state and combine it into one big object.
export default combineReducers({
    user: userReducer
})



