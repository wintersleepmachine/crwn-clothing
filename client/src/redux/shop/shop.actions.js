import ShopActionTypes from './shop.types'
import {firestore, convertCollectionsSnapshotToMap}  from '../../firebase/firebase.utils'


//Thunks are actions creators that returns a function that gets a dispatch (similar to the mapDispatchToProps)
//If redux-thunk middleware id enabled, anytime you attempt to dispatch a function instead of an object, the middleware will call that function with dispatch method itself as the first argument.



//This will switch our isFetching state to true
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})


//This is a asynchrounouse action creator. Using redux-thunk anytime and action Createor returns a function (as opposed to normally returning an object)
// thunk middleware will give that returns function the dispatch function as a paramater so we can use it inside the returned function.
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');

        dispatch(fetchCollectionsStart()) //Changes isFetching to true
        
        collectionRef.get().then((snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap)) //Sets our collection store to collectionsMap
    
        }).catch((err) => dispatch(fetchCollectionsFailure(err.message))) //If fails we dispatch this function.
    }
}

