import { prisma } from "../prisma";
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import calculateOrderAmount from "@/utils/calculateOrderAmount";
import { ICartItem } from "@/models";
import {v4} from "uuid";

/**
 * This procedure is called after reception of 
 *   webhook type:success from stripe.
 * An order object is created in Prisma DB before
 *   triggering a call to quickbooks to create bill
 * 
 * All orders created have a default payment status of "pending"
 *  this is later updated upon webhook reception from Stripe
 * 
 * //Ids of items are used to get item info && price of items
 */
const createOrderProcedure = publicProcedure
  .input(
    z.object({
      ShippingForm: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email:  z.string().email(),
        country: z.string(),
        state_province: z.string(),
        city: z.string(),
        address_one: z.string(),
        address_two: z.string(),
        zip_code: z.string(),
        payment_method: z.string(),
        customerId: z.string(),
      }),
      cart: z.object({
        id: z.string(),
        name: z.string(),
        img: z.string(),
        price: z.number(),
        quantity: z.number(),
        itemType: z.string(),
        subType: z.string(),
        description: z.string(),
        createdAt: z.string().datetime(),
      }).array(),
      customerId: z.string(),
    }),
  ).mutation( async({input}) => { 
    
    //get ids of all items in cart
    //connect to this order
    const orderId = v4();
    const items:{id?:string, orderId?: string}[] = [];
    input.cart.map((item:ICartItem) => { items.push({id: item.id, orderId: orderId}) })  

    await prisma.order.create({
      data:{
        id: orderId,
        email:input.ShippingForm.email,
        firstName:input.ShippingForm.first_name,
        lastName:input.ShippingForm.last_name,
        country:input.ShippingForm.country,
        stateProvince:input.ShippingForm.state_province,
        city: input.ShippingForm.city,
        addressline:input.ShippingForm.address_one,
        addressline2:input.ShippingForm.address_two,
        zipcode:input.ShippingForm.zip_code,
        paymentMethod: input.ShippingForm.payment_method,
        items: { connect: items },
        totalPrice: calculateOrderAmount(input.cart),
        customerId: input.customerId,
      }
    })

    //function call to update all items in order quantity -= 1
    return;
  });

export default createOrderProcedure;



// id
// name
// img
// price
// itemType
// subType
// quantity
// description
// createdAt