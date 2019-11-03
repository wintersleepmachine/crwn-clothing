import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAPbGEtL35_7KQ6kf4fopM4xfpr7kpiOYw",
    authDomain: "crwn-db-1e8ce.firebaseapp.com",
    databaseURL: "https://crwn-db-1e8ce.firebaseio.com",
    projectId: "crwn-db-1e8ce",
    storageBucket: "crwn-db-1e8ce.appspot.com",
    messagingSenderId: "831904365370",
    appId: "1:831904365370:web:4bb124858d4ae045f36e03",
    measurementId: "G-Y11PB909FM"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'}) // Always triggers google popup whenever we use GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider) //This ensures google sign in, not twiitter or FB sign in

export default firebase;