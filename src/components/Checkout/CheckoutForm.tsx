import { useState, useEffect, useContext } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Image from "next/image";
import images from "@/Assets";
import { OrderContext } from "@/context/OrderContext";
import { CartContext } from "@/context/CartContext";

export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { ShippingForm, setOpenStripe, createOrder } = useContext(OrderContext);
    const { emptyCart } = useContext(CartContext);
    const { reset } = ShippingForm;

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }): void => {
            if (!paymentIntent) return;
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/order_successful`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error?.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        //reset all data
        //Form
        reset();
        //Client_State + Cookie
        localStorage.setItem("cart", JSON.stringify([]));
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
      <form 
        className="absolute bg-red-300 p-10 rounded-2xl"
        id="payment-form" 
        onSubmit={(e)=> handleSubmit(e)}
      >
        {/* Close Modal */}
        <div className="flex justify-end h-full w-full">
          <div 
            className="flex justify-center w-10 rounded-[50%] border-2 p-1.5 mb-2 cursor-pointer" 
            onClick={()=> setOpenStripe(false)}
          >
            <Image src={images.Cross} alt="X" width={30} height={30}/>
          </div>
        </div>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button 
          className="w-full h-full bg-blue-600 mt-5 py-2 text-white font-bold"
          disabled={isLoading || !stripe || !elements} 
          id="submit"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    );
}