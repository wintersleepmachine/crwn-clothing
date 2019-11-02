import React from 'react';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'



import {Switch, Route} from 'react-router-dom'
//Switch will match the first path it comes across. Helps prevent multiple page rendering at once.


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path = '/shop' component={ShopPage}/>
        <Route exact path = '/signin' component={SignInAndSignOut}/>
      </Switch>
    </div>
  );
}

export default App;
