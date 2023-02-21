import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

//TODO: PASS SUPABASE EQUIVALENT TO CREATE CONTEXT RETURN session
// const session = await getSession({ req: opts.req });
// return {
//   session,
// };


export const createContext = async ({
	req,
	res,
}: trpcNext.CreateNextContextOptions) => {
	return {
		req,
		res,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

/** * Unprotected procedure **/
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
