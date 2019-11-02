import React from 'react'
import SHOP_DATA from './shop.data'
import CollectionPreview from './../../components/collection-preview/collection-preview.component'

class ShopPage extends React.Component { //Shop page is the page which displays all types of items include 4 preview sub-items.
    constructor(props){
        super(props)

        this.state = {
            collections: SHOP_DATA //Storing in  separate file
        }
    }

    render(){
        const {collections} = this.state //destructuring an array.
        return (
            <div className='shop-page'> 
                {collections.map(({id, ...otherCollectionProps}) => {
                    return (
                        <CollectionPreview key = {id} {...otherCollectionProps} /> //There will be 5 of these components. One each for Hats, Sneakers, Jackets, Womens, Mens
                    )
                })}
            </div>
        )
    }
}

export default ShopPage