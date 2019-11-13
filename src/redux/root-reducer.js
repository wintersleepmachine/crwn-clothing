//The root-reducer is the base reducer object that represnts all of our state of the application.
//Combines all of our other states together.
//All of the other reducers we write will go into this root-reducer

//Function that will combine the reducers and make up our redux store/state
import {combineReducers} from 'redux'

//Importing userReducer, cartReducer
import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

import {persistReducer} from 'redux-persist'

//get back the local storage object on our window object
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',    //At what point do we want to start storing everything.. At the root
    storage,        //represents local stores, could also put "sessions"
    whitelist:  ['cart']    //An array of string names of the reducers we want to store/persist
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

//Remeber that our full state is one big object. The keys that represent the individual slices of state are the actual reducers that we write.
//We pull the reducer with its state and combine it into one big object.
export default persistReducer(persistConfig, rootReducer)



// {
//     user: {currentUser: {...}},
//      cart:  {hidden: true}
// }
