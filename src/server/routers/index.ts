import { router } from '../trpc';
import fetchItemsProcedure from "./fetchItemsProcedure";
import StripePaymentIntentProcedure from './StripePaymentIntentProcedure';
import createOrderProcedure from './createOrderProcedure';

export const appRouter = router({
  fetchItems: fetchItemsProcedure,
  StripePaymentIntent: StripePaymentIntentProcedure,
  createOrder: createOrderProcedure,
});

// export type definition of API
export type AppRouter = typeof appRouter;