import { useState, useContext, FormEvent } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Image from "next/image";
import images from "@/Assets";
import { CartContext } from "@/context/CartContext";
import { OrderContext } from "@/context/OrderContext";
import {trpc} from "@/utils/trpc";

export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { email, setOpenStripe, ShippingForm } = useContext(OrderContext);
    const {  mutate:createOrder } = trpc.createOrder.useMutation();
    const { cart, customerId } = useContext(CartContext);

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        try{
            createOrder({ ShippingForm: ShippingForm.getValues(), cart, customerId });
        }catch(err){
            console.error(err)
            throw new Error('Order Creation Failed')
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/order_successful`,
                receipt_email: email,
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // the `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error?.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

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