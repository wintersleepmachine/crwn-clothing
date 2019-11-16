import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'

import {updateCollections} from '../../redux/shop/shop.actions'

import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

import WithSpinner from '../../components/with-spinner/with-spinner.component'


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

//In our App.js page shoppage is nested in a route, therefore history, match, location are passed as props into ShopPage 
class ShopPage extends React.Component { //Shop page is the page which displays all types of items include 4 preview sub-items.
   state = {
       loading: true
   }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props

        const collectionRef = firestore.collection('collections');
        
        //Whenever the collectionRef updates OR when this code gets run for the first time. this collectionRef will send us a snapshot representing of our collections objects array at the time this code renders
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     updateCollections(collectionsMap)

        //     this.setState({loading: false})
        // })

        //Same code as above but using promises.
        collectionRef.get().then((snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)

            this.setState({loading: false})
        })


    }

    render(){
        const {match} = this.props
        const {loading} = this.state
        return (
            <div className='shop-page'> 
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
                <Route  path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: (collectionsMap) =>  dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)