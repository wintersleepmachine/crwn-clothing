import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' //A component that we wrap around our App component, gives our App component all the functionality of routing that BrowserRouter provides.

ReactDOM.render(
    <BrowserRouter>
         <App />
    </BrowserRouter>, 
    document.getElementById('root')
);


