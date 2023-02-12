import React, { useContext } from "react"
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import images from "@/Assets";
import numeral from "numeral";
import {Item} from "@/models/index";

interface CustomPageProps {
    item: Item
    key: number
}

/**
 * This component hosts an image
 * the image is the main backgroud of the card
 * the add to cart button and price are super imposed over the item
 * the top right of the item has an arrow which can be used to flip
 * 	the item over and display text and item info on the reverse side
 */
export default function GalleryItem(props:CustomPageProps) {
	const { item } = props;
    const { addItem } = useContext(CartContext);

    return (
        <div className="relative h-GalleryItem w-GalleryItem mx-3 rounded-2xl bg-transparent shadow-3xl preserve-3d group-hover:my-rotate-y-180 duration-1000">

			{/* FRONT */}
			<div className="absolute backface-hidden rounded-2xl h-full w-full bg-gray-200">
				{/* MAIN ASSET FR - BACKGROUND */}
				<Image 
					src={item?.img ? item?.img: images.Logo} 
					alt="Item Image" 
					className="absolute backface-hidden"
					height={428}
					width={350}
				/>
				<div className="flex absolute backface-hidden h-full w-full items-start justify-center">
					<h1 className="flex absolute backface-hidden h-10 w-52 my-8 justify-center items-center text-2xl border-2 border-black bg-gray-300">
						{item?.name}
					</h1>
				</div>
			</div>

			{/* BACK */}
			<div className="absolute backface-hidden my-rotate-y-180 w-full border-2 rounded-2xl h-full bg-white">
				
				<div className="absolute rounded-2xl h-full w-full bg-gray-200 opacity-30">
					{/* MAIN ASSET FR - BACKGROUND */}
					<Image src={images.Logo} alt="Item Image" className="absolute h-full w-full"/>
				</div>

				{/* DESCRIPTION */}
				<div className="flex flex-col items-center justify-center">
					<h1 className="flex h-10 w-52 my-8 justify-center items-center text-2xl border-2 border-black bg-gray-300 shadow-lg">
						{item?.name}
					</h1>
					<p className="flex h-[448px] w-90 text-wrap w text-left text-xl bg-gray-300 border border-gray-700 rounded-xl p-3 m-3 bg-opacity-90"> 
						{item?.description}
					</p>
				</div>

				{/*BACK ELEMENTS NESTED IN COMPONENT */}
				<div className="flex absolute w-full items-center justify-center">


					{/* ITEM OPTIONS */}
					<div className="flex w-90 p-3 items-end justify-between border border-gray-700 rounded-xl bg-gray-400 bg-opacity-40">
						
						<p className="flex h-full w-full p-2 max-h-[3rem] max-w-[8rem] bg-black hover:bg-red-600 text-white items-center justify-center rounded-lg">
							price: {numeral(item.price).format("$0,0.00")}
						</p>
						
						<button 
							className="h-10 w-28 bg-purple-700 hover:bg-purple-500 rounded-2xl cursor-pointer"
							onClick={()=> addItem(item) }
						>
							Add to Cart
						</button>
					</div>
				</div>
				
			</div>
			

		</div>
    );
}