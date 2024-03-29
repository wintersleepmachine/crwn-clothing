import React from 'react'
import './cart-icon.styles.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import {connect} from 'react-redux'
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'


//action creator
import {toggleCartHidden} from '../../redux/cart/cart.actions'

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className = "cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon" />
        <span className ="item-count">{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

//Adding up quanity of every items quanity in the shopping cart
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

//Another way to do this is just 


export default connect(mapStateToProps,mapDispatchToProps)(CartIcon)