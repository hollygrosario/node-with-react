import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'

class Payments extends Component {
  render () {
    return (
      <StripeCheckout
        name='node-with-react'
        description='$5 for 5 email credits'
        amount={500}
        token={token => console.log('token:', token)}
        stripeKey='pk_test_51L58x8AtSg8Cfs26xnm5Jo8KPsA3ZrcEYNECUehfvFrDboRDCt2EgejFcanfHXMdSPLWlq5dXuv0iXuSkuXr3KUU004xKDWtcT'
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    )
  }
}

export default Payments
