import { router } from '../trpc';
import fetchItemsProcedure from "./fetchItemsProcedure";
import StripePaymentIntentProcedure from './StripePaymentIntentProcedure';

export const appRouter = router({
  fetchItems: fetchItemsProcedure,
  StripePaymentIntent: StripePaymentIntentProcedure,
});

// export type definition of API
export type AppRouter = typeof appRouter;