import React from 'react'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import {Route} from 'react-router-dom'

import CollectionPage from '../collection/collection.component'


//In our App.js page shoppage is nested in a route, therefore history, match, location are passed as props into ShopPage 
const ShopPage = ({match}) => { //Shop page is the page which displays all types of items include 4 preview sub-items.
    console.log(match)
    return (
        <div className='shop-page'> 
            <Route exact path={`${match.path}`} component={CollectionsOverview}/>
            <Route  path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
      
}

export default ShopPage