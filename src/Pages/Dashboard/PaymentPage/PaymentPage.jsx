import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_stript_Pk)
const PaymentPage = () => {
    const {paymentClass} = useContext(AuthContext);
    return (
        <div className="w-1/2 mx-auto">
            <h3 className="text-2xl mb-8 font-semibold">Your Payment Amount ${paymentClass?.price}</h3>
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentClass={paymentClass} />
            </Elements>
        </div>
    );
};

export default PaymentPage;