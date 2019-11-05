import React from 'react'
import {Link} from 'react-router-dom'
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

//Importing connect which is a HOC which allows react to connect to redux
import {connect} from 'react-redux'

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className="logo-container" to="/">
            <Logo className = 'logo' />
        </Link>

        <div  className='options'>
            <Link className='option' to='/shop' >
                SHOP
            </Link>
            <Link className='option' to='/shop' >
                CONTACT
            </Link>
            {
                currentUser ? 
                    <div className ='option' onClick={() => auth.signOut() /*signs user out from firebase, auth.onAuthStateChanged will send a authUser null obj back and set this.state.currentUser to null */}>
                        SIGN OUT
                    </div> 
                    : 
                    <Link className = 'option' to = '/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
           hidden ? null : <CartDropdown />
        }
        
    </div>
)

//mapStateToProps allows us to access redux state through the rootReducer
//mapStateToProps and connect will be used anywhere we need properties from our reducers
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    hidden: state.cart.hidden
})

export default connect(mapStateToProps)(Header)