import React from 'react'
import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component'

import {selectCartItems} from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'

import {withRouter} from 'react-router-dom'

import {toggleCartHidden} from '../../redux/cart/cart.actions'

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items" >
            {
                cartItems.length ?
                cartItems.map(cartItem => <CartItem key = {cartItem.id} item={cartItem}/>)
                :
                <span className = 'empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() =>  {
            history.push('/checkout')
            dispatch(toggleCartHidden())
            } /*we get access to history through withRouter*/ }>GO TO CHECKOUT</CustomButton>
    </div>
)


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

//WithRouter will be what passes the match history and location objects inro the component that is being wrapped.
//with router will allow the component to have access to history and location objects.

//connect passes disptch() into our component as a prop if we dont have a second argument.
export default withRouter(connect(mapStateToProps)(CartDropdown))