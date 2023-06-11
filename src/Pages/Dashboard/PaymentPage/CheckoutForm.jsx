import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './CheckoutForm.css'

const CheckoutForm = ({ paymentClass }) => {
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const naviGate = useNavigate();
  useEffect(() => {
    if (paymentClass?.price > 0) {
      axiosSecure.post('/createPaymentIntent', { price: paymentClass.price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
    }
    else {
      naviGate('/dashboard/mySelectedClasses')
      setCardError('Go and pick your Class Again For Pay')
    }
  }, [axiosSecure, paymentClass, naviGate])

  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setCardError(error.message)
      // console.log('[error]', error)
    }
    else {
      setCardError('')
      // console.log('[paymentMethod]', paymentMethod)
    }
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
          },
        },
      },
    );
    if (confirmError) {
      setCardError(confirmError)
    }
    if (paymentIntent?.status === 'succeeded') {
      setProcessing(false)
      // console.log('console payment intent', paymentIntent);

      const paymentInfo = {
        id: paymentClass.id,
        transactionId:paymentIntent.id,
        email: user?.email,
        name: user?.displayName,
        classImage:paymentClass.classImage,
        instructorName:paymentClass.instructorName,
        seats:paymentClass.seats,
        amount: paymentClass.price,
        className: paymentClass.className,
        date: new Date()
      }
      axiosSecure.put(`/payment`, { paymentInfo })
        .then(res => {
          if (res.data.upsertedCount > 0) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Payment Successful',
              showConfirmButton: false,
              timer: 1500
            })
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Already Payment',
            showConfirmButton: false,
            timer: 1500
          })
          axiosSecure.delete(`/afterPayment/${paymentClass?.id}?email=${user?.email}`)
          .then(res=>{
            if(res.data.deletedCount>0){
              naviGate('/dashboard/mySelectedClasses');
            }
          })
          const instructorEmail={
            email:paymentClass.instructorEmail
          }
          axiosSecure.patch(`/studentAdd`,instructorEmail)
          .then(()=>{})
          axiosSecure.patch(`/updateSeats/${paymentClass?.id}`)
          .then(()=>{})
        })
    }

  }
  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 p-5 rounded">
      <CardElement
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
      <button type="submit" disabled={!stripe || !setClientSecret || processing} className="btn w-full text-white bg-[rgba(1,16,31,.9)] hover:bg-[rgb(1,16,31)]">
        Pay
      </button>
      <p className="text-red-600 font-semibold">{cardError}</p>
    </form>
  );
};

export default CheckoutForm;