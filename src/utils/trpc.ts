import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers/index';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {

    // optional: use SSG-caching for each rendered page (see caching section for more details)
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
    );

    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      queryClientConfig: { defaultOptions: { queries: { staleTime: Infinity } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,

});