import {createStore, applyMiddleware} from 'redux'
import {persistStore} from 'redux-persist'

//middleware
import logger from 'redux-logger'

//redux-thunk is a piece of middleware that allows us to fire functions
import thunk from 'redux-thunk' 

import rootReducer from './root-reducer'

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development'){ //Will either be production, development or test. When we call npm build, it switches NODE_ENV varible to development
    middlewares.push(logger)
}

//createStore takes the root reducer
export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor =  persistStore(store)

export default {store, persistStore }


