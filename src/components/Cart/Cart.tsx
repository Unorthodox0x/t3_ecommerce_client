import React, { useContext, FC } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Router from 'next/router';
import numeral from "numeral";

import { CartItem } from "@/components";
import images from "@/Assets";
import {Item} from "@/models";

/**
 * This component is a side menu
 * 	that opens when a user clicks The icon
 * 
 * @TODO CONDITIONALLY REDIRECT IF CART.LENGTH>0
 */

const Cart: FC = () => {

    const { cart, totalValue, openMenu, setOpenMenu } = useContext(CartContext);
    
    function redirect(cart:Item[]):void {
		if(cart.length>0) Router.push(`/shipping`)
			else return;
    }

    return (
        <div className="flex fixed top-0 right-0"> 
			{ openMenu && (
				<div className="flex flex-col flex-end items-end w-96 h-screen bg-white p-3 overflow-y-scroll">
					
					{/*MENU TOP*/}
					<div className="flex w-full items-start border-b-2 border-black py-3 justify-between">

						{/*TOTAL PRICE*/}
						<div className="mt-4 text-xl font-bold">
							<h1>Shopping Cart</h1>
						</div>

						{/* Close Menu */}
						<div 
							className="rounded-[50%] border-2 p-1.5 mb-2 cursor-pointer" 
							onClick={()=> setOpenMenu(false)}
						>
							<Image src={images.Cross} alt="X" width={30} height={30}/>
						</div>
					</div>

					{/* Menu Column */}
					{/* Display LIST LOGIC */}
					{ cart.map((object:Item, i:number) => (
						<CartItem 
							item={object} 
							key={i}
						/> 
					) ) }		
						
					{/*CART BOTTOM */}
					<div className="flex flex-col h-24 w-[22rem] fixed bottom-0 my-8 pt-2 border-t-2 border-black">
						
						{/*PRICE*/}
						<span className="text-xl my-3">
							SubTotal: {numeral(totalValue).format("$0.00")}
						</span>

						{/*CHECKOUT BUTTON*/}
						<div className="flex w-full justify-end">
							<p
								className="flex h-12 w-full p-2 rounded-lg items-center justify-center bg-red-400 text-xl text-black hover:-translate-y-0.5 hover:translate-x-0.5 cursor-pointer"
								onClick={() => redirect(cart)}
							>
								Checkout &rarr;
							</p>
						</div>					
						
					</div>
				</div>
			) }
		</div>
    );
}

export default Cart;