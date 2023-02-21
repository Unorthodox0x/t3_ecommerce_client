import React, {useEffect, useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import {trpc} from "@/utils/trpc";

export default function Confirmation () {
  const [message, setMessage] = useState<string>('');  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
        const getStatus = async() => {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
            if (!stripe)return;        
            const clientSecret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );
            
            if (!clientSecret) return;
            stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }): void => {
              if (!paymentIntent) return;
              switch (paymentIntent.status) {
                  case "succeeded":
                      setMessage("Payment succeeded!");
                      setLoading(false);
                      localStorage.removeItem("cart");   
                      break;
                  case "processing":
                      setMessage("Your payment is processing.");
                      break;
                  case "requires_payment_method":
                      setMessage("Your payment was not successful, please try again.");
                      setLoading(false);
                      break;
                  default:
                      setMessage("Something went wrong.");
                      setLoading(false);
                      break;
              }
            });
        }
        getStatus();
    }, []);

  return (
    <div className="flex h-full w-full mt-20 items-center justify-around">
      <div className="flex flex-col h-80 w-[1000px] rounded-2xl items-center justify-center bg-red-300">
         <h1 className="text-white text-4xl font-bold">
           { loading && !message? <div>Confirming...</div> : message }
         </h1>
         <span className="text-lg p-8">
           Check your email for information regarding your order
         </span>
      </div>
    </div>
  );
}