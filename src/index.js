import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' //A component that we wrap around our App component, gives our App component all the functionality of routing that BrowserRouter provides.

//Provider is a component that is the parent to EVERYTHING inside our application. Because it is the parent it allows us to get access to all the things related to the store that we are gonna put on our redux state.
import {Provider} from 'react-redux'

//Importing redux store
import {store, persistor} from './redux/store'

//
import {PersistGate} from 'redux-persist/integration/react'



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>  
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);


