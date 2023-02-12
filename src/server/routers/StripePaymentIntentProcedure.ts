import { publicProcedure } from '../trpc';
import { z } from 'zod';
import calculateOrderAmount from "@/utils/calculateOrderAmount";
import { stripeClient } from "../stripe";
// import { checkPrime } from 'crypto';

//need to take the ids of all items in the cart, 
//use this id to confirm items in database and their status[not sold] && price 
//add price of objects from id, make/return stripe checkout session

const StripePaymentIntentProcedure = publicProcedure
  .input(
    z.object({
      cart: z.object({
        id: z.string(),
        name: z.string(),
        img: z.string().nullable(),
        imgLocation: z.string().nullable().optional(),
        price: z.number(),
        quantity: z.number(),
        itemType: z.string(),
        subType: z.string(),
        description: z.string(),
        createdAt: z.string().datetime({ message: "Invalid datetime string! Must be UTC." })
      }).array()
    })
  ).mutation( async({ input }):Promise<string|null> => {

    console.log('input', input)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: calculateOrderAmount(input.cart),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log('paymentIntent', paymentIntent)

    return paymentIntent.client_secret;
  });


export default StripePaymentIntentProcedure;