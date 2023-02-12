import "../styles/globals.css";
import "tailwindcss/tailwind.css"
import {NavBar} from "@/components/index";
import {CartProvider} from "@/context/CartContext";
import { trpc } from '@/utils/trpc';
import type { AppType,  AppProps } from 'next/app'

const MyApp:AppType = ({ Component, pageProps }: AppProps ) => {
  return (
    <div className="h-full w-full min-h-screen bg-red-900">
      <CartProvider>
        <NavBar />
        <Component {...pageProps} />
      </CartProvider>
    </div>
  );
}

export default trpc.withTRPC(MyApp);