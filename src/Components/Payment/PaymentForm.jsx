import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { baseURL } from '../../../config';


const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      const { data } = await axios.post(`${baseURL}/api/create-payment-intent`, {
        amount,
        postal_code: postalCode, 
      });

      const { clientSecret } = data;
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
        },
      });

      if (paymentMethodReq.error) {
        console.error(paymentMethodReq.error);
        alert('Failed to create payment method. Please try again later.');
        return;
      }
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: 'Test User', 
            email: 'test@example.com', 
            address: {
              postal_code: postalCode, 
            },
          },
        },
      });

      if (error) {
        console.error(error);
        alert('Payment failed. Please try again later.');
      } else {
        if (paymentIntent.status === 'succeeded') {
          setPaymentStatus('succeeded');
          setTimeout(() => {
            window.location.href = '/success'; 
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process payment. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <CardNumberElement
          className="input-field"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
        <CardExpiryElement
          className="input-field"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CVC</label>
        <CardCvcElement
          className="input-field"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="input-field"
          style={{  borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <button type="submit" className="btn rounded mt-4" disabled={!stripe}>
        Donate
      </button>
    </form>
  );
};

export default PaymentForm;
