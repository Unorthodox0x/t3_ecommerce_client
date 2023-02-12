import { useContext } from 'react';
import { CartContext } from "@/context/CartContext";
import {Item} from "@/models"
import numeral from "numeral";
import Image from "next/image";
import images from "@/Assets";

/**
 * This commponent takes the cart component and displays information about the customer's order
 *  alongside the Shipping info collection
 */
export default function OrderSummary() {

    const { cart } = useContext(CartContext);

    //need to store the cart items in a cookie or in server side cache to preserve them

	return (
        <div className="flex flex-col justify-start h-[825px] w-96 m-5 bg-white overflow-y-scroll">
            {
                cart.map((item:Item, index:number) => (
                    <div 
                        className="flex h-60 w-full my-4 p-5 items-center justify-center border-b-2 border-black"
                        key={index}
                    >
                        { item && (
                            <>

                                {/* RIGHT */}
                                <div className="flex flex-col w-60 h-60">
                                    {/* TITLE */}
                                    <h1
                                        className="flex text-2xl mb-4 items-start justify-start"
                                    >
                                        {item.name}
                                    </h1>

                                    <Image
                                        src={item.img ? item.img : images.Logo}
                                        className="ml-1"
                                        alt="Item"
                                        height={170}
                                        width={170}
                                    />
                                </div>


                                {/* LEFT */}
                                <div className="flex flex-col h-full w-56">
                                    
                                    {/* INFO CONTAINER */}
                                    <div className="flex h-full w-full mb-6 justify-end items-end">

                                        {/* INFO */}
                                        <div>
                                            {/* QUANTITY */}
                                            <span className="flex w-full justify-end">
                                                Qty: 1
                                            </span>

                                            {/* PRICE */}
                                            <span
                                                className="flex w-full"
                                            >
                                                SubTotal: <u className="ml-1">{numeral(item.price).format("$0.00")}</u>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                               
                            </>
                        )    }
                    </div>
                ) )
            }
        </div>
    );
}