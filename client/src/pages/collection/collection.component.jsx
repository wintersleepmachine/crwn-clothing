import React, {useEffect} from 'react'

import CollectionItem from '../../components/collection-item/collection-item.component'

import {connect} from 'react-redux'

import {selectCollection} from '../../redux/shop/shop.selectors'

import './collection.styles.scss'
import { firestore } from '../../firebase/firebase.utils'

const CollectionPage = ({collection}) => {

    //Utilizing useEffect as a componentWillUnmount
   useEffect(() => {
       console.log('I am subscribing')
       const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot))
       
       //The only thing useEffect will return is a function and it is called a cleanup function. All the code in here will act before the component unmounts from the DOM
       return () => {
           console.log('I am unsubscribing!')
           unsubscribeFromCollections()
       }
   }, [])

    const {title, items} = collection;

    return (
        <div className = 'collection-page'>
            <h2 className="title">{title}</h2>
            <div className = "items">
                {
                    items.map(item => (<CollectionItem key={item.id} item={item}/>))
                }
            </div>
        </div>
    )
}
  
   
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)