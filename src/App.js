import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'


import {Switch, Route} from 'react-router-dom'
//Switch will match the first path it comes across. Helps prevent multiple page rendering at once.


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path = '/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
