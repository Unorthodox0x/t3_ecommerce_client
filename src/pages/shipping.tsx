import { OrderContextProvider } from "@/context/OrderContext";
import { ShippingMain } from "@/components";

export default function Shipping() {

  return (
     <div className="flex h-full w-full justify-center pt-20">
      <OrderContextProvider>
        <ShippingMain />
      </OrderContextProvider>
    </div>
  );
}