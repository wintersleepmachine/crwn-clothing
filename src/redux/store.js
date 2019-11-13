import {createStore, applyMiddleware} from 'redux'
import {persistStore} from 'redux-persist'

//middleware
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middlewares = [logger];

//createStore takes the root reducer
export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor =  persistStore(store)

export default {store, persistor}


