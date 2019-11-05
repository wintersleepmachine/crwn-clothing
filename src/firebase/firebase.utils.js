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

//This function creates a document to the users collection in firestore if it doesnt already exists.
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; //If they logout, userAuth obj returned an empty object of null, therefore break out of function.

    //A QUERY is a request we make to firestore to give us something from the database.
    //What we get back from that QUERY is two types of objects: Reference or Snapshots. It can come back in the form of document or collection. i.e documentRef, collectionRef, documentSnapshot, collectionSnapshot
    // Firestore will always return us these objects even nothing exists at from that query.

    //Query reference: (queryReference) an object that represents the 'current' place in the database that we are querying. 
    //We get them by calling: firestore.doc('/users/:userId') or firestore.collections('/users')
    //queryRefrence object does not have the actual data of the collection or document. It instead has properties that tell us details
    //about it, or methods to get the Snapshot object which gives us the data we are looking for.

    //Document Reference vs CollectionReference
    //We use documentRef objects to perform CRUD methods. The documentRef methods are .set() .get() .update() .delete()
    //We can also add documents to collections using the collectionRef object using .add() method. EXAMPLE: collectionRef.add({value: prop})
    //We get a snapshot Object from the reference object using the .get() method, i.e documentRef.get() or collectionRef.get()
    //documentRef returns a documentSnapshot object
    //collectionRef returns a querySnapshot object


    const userRef = firestore.doc(`users/${userAuth.uid}`)//QUERY firestore for a document with uid of the person that logged in. This returns a queryReference object, not the actual data. In this case it returns a user document reference.
    // Here we use userRef (queryReference object) to tell firestore to save data or to get data from this location in the database. Again, userRef doesnt have actual data, but gives proprties, like the id, or the path.

    const snapShot = await userRef.get() //snapShot simply represents the data
    
    if(!snapShot.exists){ //IF data doesnt exist in our firestore at this location within the database then we are gonna write to our database.
        const {displayName, email} = userAuth; 
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email, 
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log('error creating user', err.message)
        }
    }

    return userRef //Always return userRef, we might want to use it for somthing else
}



firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()


//Setting up google authentication utility
const provider = new firebase.auth.GoogleAuthProvider() //Give acess to GoogleAuthProvider() class library
provider.setCustomParameters({prompt: 'select_account'}) // Always trigger the google popup whenever we use GoogleAuthProvider() for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider) //This ensures google sign in, not twiitter or FB sign in. This function will be exported and go to sign-in component and will be our onClick Handler for our CustomButton

export default firebase;

//Make sure go to Authentication tab in firebase and ENABLE google sign ins