import React, { useState, createContext, useEffect } from "react";
import {
    ICartContext,
    Item,
    defaultCartContext,
} from "../models/index"

/**
 * This Context is used to collect shipping information from user
 *     and call server function to 
 * 
 * TOTAL PRICE
 * CHECKOUT BUTTON
 */
export const CartContext = createContext<ICartContext>(defaultCartContext);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState<Item[]>([]);
    const [totalValue, setTotalValue] = useState<number>(defaultCartContext.totalValue);
    const [openMenu, setOpenMenu] = useState<boolean>(defaultCartContext.openMenu);

    //** SET A CONDITIONAL FLAG FOR INDIVIDUAL ITEMS, 
    //** CAN AN ITEM BE ADDED TO CART MORE THAN ONCE
    function addItem(item: Item|undefined):void {
        if (item === undefined) return;
        const filtered: Item[] = cart.filter((el:Item) => el.id === item.id);
        if(filtered.length>0) return;
        setCart((cart): Item[] => [...cart, item]);
        setTotalValue(totalValue + item.price);
        localStorage.setItem("cart", JSON.stringify([...cart, item]));
    }

    function removeItem(cart: Item[], item: Item):void {
        const filtered:Item[] = cart.filter((el:Item) => el.id !== item.id);
        console.log('filtered', filtered)
        setCart(filtered);
        setTotalValue(totalValue - item.price);
        localStorage.setItem("cart", JSON.stringify(filtered));
    }

    function emptyCart():void {
        setCart([]);
        localStorage.removeItem("cart")
        return;
    }

    /**
     * **PRESERVES APP CART STATE**
     * 1. POPULATE CART WITH INFO FROM LOCALSTORAGE ON PAGE REFRESH
     * 2. PRESERVES VALUE OF ALL ITEMS IN CART 
     */
    useEffect(() => {
        const cartData:Item[] = JSON.parse(localStorage.getItem("cart"));
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