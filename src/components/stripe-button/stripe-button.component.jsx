import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_WLR7CJToQvIZjSGpWjUPvVW8007ZtKNgLl'; //This API lets our application connect to stripe API
    const onToken = token => {
        console.log(token) //upon suscessful checkout stripe generates this token with all the payers information and send this token to the backend.
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton