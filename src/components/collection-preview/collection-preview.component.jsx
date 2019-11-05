import React from 'react'
import './collection-preview.styles.scss'
import CollectionItem from './../collection-item/collection-item.component'


//CollectionPreview component returns the type of item (i.e Hat) and 4 preview items to sell (CollectionItem component). i.e "HAT: Brown brim, blue beanie, brown cowboy, grey brim"
const CollectionPreview = ({title, items}) => { //This component returns each type of clothing + its 4 items.
return (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className = 'preview'>
            {
                items
                    .filter((item, idx) => idx<4) //Only return 4 items.
                    .map(({id, ...otherItemProps}) => {
                    return (
                        <CollectionItem key={id} {...otherItemProps} />
                    )
                })
            }
        </div>
    </div>
)
    
}

export default CollectionPreview