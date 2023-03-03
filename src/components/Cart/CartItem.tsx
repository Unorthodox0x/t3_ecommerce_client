import React, { useContext } from "react"
import Image from "next/image"
import numeral from "numeral";
import images from "@/Assets";
import { CartContext } from "@/context/CartContext";

import { Item } from "@/models/index";

interface CustomPageProps {
    item: Item | undefined
    key: number
}
/**
 * This component is nested inside Cart
 * 	Displays info for single Cart Item
 */
const CartItem = (props: CustomPageProps) => {
    const { item } = props;
    const { cart, removeItem } = useContext(CartContext);

    if (cart.length === 0 || item === undefined) return null;
    return (
        <div className="w-full border-b-2 p-4"> 
			{	item && (
                <div className="relative flex h-32 w-full items-center justify-center"> 
						{/* LEFT */}
						<div className="flex w-1/2 items-center justify-center p-2 ml-4">
							<Image
								src={item.img ? item.img : images.Logo}
								className="border-b-2"
								alt="Item"
								height={130}
								width={130}
							/>
						</div>

						{/* RIGHT */}
						<div className="flex flex-col h-full w-1/2">
							{/* TITLE */}
							<h1
								className="flex text-xl items-start justify-end"
							>
								{item.name}
							</h1>

							{/* INFO CONTAINER */}
							<div className="flex h-full w-full justify-start items-end">
								
								{/* INFO */}
								<div>
									{/* QUANTITY */}
									<span className="flex w-full">
										Qty: 1
									</span>
								
									{/* PRICE */}
									<span
										className="flex w-full underline"
									>
										{numeral(item.price).format("$0.00")}
									</span>
								</div>

								{/* REMOVE ITEM */}
								<div
									className="flex w-full justify-end items-center hover:text-red-500 underline cursor-pointer"
									onClick={() => removeItem(cart, item)}
								>
									Remove
								</div>
							
							</div>
						</div>
					</div>
            )	} 
       </div>
    );
}

export default CartItem;