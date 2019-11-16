import React from 'react';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import {auth, createUserProfileDocument} from './firebase/firebase.utils'
//We want to store the state of the user in our App.

import {Switch, Route, Redirect} from 'react-router-dom'
//Switch will match the first path it comes across. Helps prevent multiple page rendering at once.

import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'

//Selectors
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'



//App component will only display the Header and our routes. Therefore the Header component will always be displayed.
class App extends React.Component {



  unsubscribeFromAuth = null //Initially set to null, but after auth.onAuthStateChanged() -> Gives us back a function and this function will close the subscription or close the open connection when the person closes the window for example.

  componentDidMount(){
    const {setCurrentUser} = this.props
    
    

    //We want to know when firebase realizes that the authentication state has changed i.e whenver someone signs in Or signs out, we want to be aware of that change.
    //When we call auth.onAuthChanged(callback), the call back takes an paramter which is the user state is of the auth in our firebase project
    //onAuthChanged() establishes an open connection as long as our application is open on the DOM.
    // onAuthChanged() is an open messaging system between our application and our firebase. Whenever changes occur on firebse related to authentication (someone signing in)
    // firebase sends out message to our app that the authState as changed; the user has updated (user signed in or signed out)
    //Becaause it is an open subscription, we also have to close subscription when the application unmounts to prevent memory leaks.
    

    //Everytime we refresh the function will fire again because auth.onAuthStateChanged() is always persisting.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
        // console.log(userAuth)
      

      if(userAuth){//If a user signs in we get a userAuth object back from firebase
        const userRef = await createUserProfileDocument(userAuth)
        //createUserProfileDocument(userAuth) pretty much checks using the uid from the userAuth to check if there is already a document within the users collections with that id.
        // If there isnt, then we write to the database
        //If there is already a document there with same uid, then simply return the userRef object.

        
        //Next we subscribe or listen to this userRef object for any changes to the data with userRef.onSnapshot(callback).
        // if there is a change we will get back the state of that data which is the first parameter of the callback 'snapshot'
        //then we take the paramter 'snapshot' and set OUR redux store with the snapShot id and the data.
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,    //
              ...snapShot.data() //Spreading createdAt, displayName, email
            })
        })
      } //If the user logs out then userAuth will be null and we set our redux store user.currentUser to null.
        setCurrentUser(userAuth)
        
      
    }) 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth() //This will close the subscription or close the open connection.
  }

  render(){

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path = '/shop' component={ShopPage}/>
          <Route exact path = '/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage/>}/>
          <Route exact path = '/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
 
}

const mapStateToProps =  createStructuredSelector({
  currentUser: selectCurrentUser
})


 const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
