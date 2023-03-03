import React, { useState, createContext, useEffect } from "react";
import {
    ICartContext, ICartItem,
    defaultCartContext,
} from "@/models"
import {trpc} from "@/utils/trpc"
/**
 * This Context is used to collect shipping information from user
 *     and call server function to 
 * 
 * TOTAL PRICE
 * CHECKOUT BUTTON
 */
export const CartContext = createContext<ICartContext>(defaultCartContext);

export const CartProvider = ({ children }) => {

    const utils = trpc.useContext();
    const [cart, setCart] = useState<ICartItem[]>([]);
    const [totalValue, setTotalValue] = useState<number>(defaultCartContext.totalValue);
    const [openMenu, setOpenMenu] = useState<boolean>(defaultCartContext.openMenu);
    const [clientSecret, setClientSecret] = useState<string>("");
    const [customerId, setCustomerId] = useState<string>("");

    const { data, refetch:refetchStripeIntent } = trpc.StripePaymentIntent.useQuery({ cart },{
        enabled: cart.length > 0 //don't fetch if no items in cart
    });

    useEffect(()=> {
        if(!data || !data?.clientSecret || !data?.customerId) return
        setClientSecret(data?.clientSecret)
        setCustomerId(data?.customerId);
    },[data])    

    //** SET A CONDITIONAL FLAG FOR INDIVIDUAL ITEMS, 
    //** CAN AN ITEM BE ADDED TO CART MORE THAN ONCE
    function addItem(item: ICartItem|undefined):void {
        if (item === undefined) return;
        const filtered: ICartItem[] = cart.filter((el:ICartItem) => el.id === item.id);
        if(filtered.length>0) return;
        setCart((cart): ICartItem[] => [...cart, item]);
        setTotalValue(totalValue + item.price);
        localStorage.setItem("cart", JSON.stringify([...cart, item]));
        refetchStripeIntent()
    }

    function removeItem(cart: ICartItem[], item: ICartItem):void {
        const filtered:ICartItem[] = cart.filter((el:ICartItem) => el.id !== item.id);
        console.log('filtered', filtered)
        setCart(filtered);
        setTotalValue(totalValue - item.price);
        localStorage.setItem("cart", JSON.stringify(filtered));
        refetchStripeIntent()
    }

    function emptyCart():void {
        setCart([]);
        localStorage.removeItem("cart")
        utils.StripePaymentIntent.reset();
        return;
    }

    /**
     * **PRESERVES APP CART STATE**
     * 1. POPULATE CART WITH INFO FROM LOCALSTORAGE ON PAGE REFRESH
     * 2. PRESERVES VALUE OF ALL ITEMS IN CART 
     */
    useEffect(() => {
        const cartData:ICartItem[] = JSON.parse(localStorage.getItem("cart"));
        console.log('cartData', cartData)
        if (cartData) {
            setCart(cartData);
            let value = 0;
            for (const item of cartData){
                value += item.price;
            }
            setTotalValue(value);
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                clientSecret,
                customerId,
                openMenu,
                setOpenMenu,
                cart,
                setCart,
                totalValue,
                setTotalValue,
                addItem,
                removeItem,
                emptyCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )

}