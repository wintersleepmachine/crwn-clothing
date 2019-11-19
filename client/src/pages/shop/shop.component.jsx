import React from 'react'
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions'

//In our App.js page shoppage is nested in a route, therefore history, match, location are passed as props into ShopPage 
class ShopPage extends React.Component { //Shop page is the page which displays all types of items include 4 preview sub-items.

    componentDidMount(){
        //Old code, before we moved it into our shop.reducer. Now using thunk
        //Whenever the collectionRef updates OR when this code gets run for the first time. this collectionRef will send us a snapshot representing of our collections objects array at the time this code renders
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     updateCollections(collectionsMap)

        //     this.setState({loading: false})
        // })

        const {fetchCollectionsStartAsync} = this.props

        fetchCollectionsStartAsync() //Gets and sets our collections.

    }

    render(){
        const {match} = this.props
        return (
            <div className='shop-page'> 
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
                <Route  path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage)