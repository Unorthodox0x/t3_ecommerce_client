import stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const accountId = process.env.STRIPE_ACCOUNT_ID || "";
export const stripeClient = new stripe(stripeSecret, { 
        stripeAccount: accountId,
        apiVersion: "2022-11-15"
});