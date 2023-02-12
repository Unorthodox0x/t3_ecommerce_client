import React, { useContext, useState } from "react"
import { CartContext } from "@/context/CartContext";
import "tailwindcss/tailwind.css"

import { Cart } from './index';
import images from "@/Assets";

import Popup from "reactjs-popup";
import Image from "next/image";
import Link from "next/link";
import useWindowSize from "@/utils/userWindowSize";
import {MobileMenu} from "@/components";


const NavBar: React.FunctionComponent = () => {
    //User Context
    const { cart, openMenu, setOpenMenu } = useContext(CartContext);
	const [openMobile, setOpenMobile] = useState<boolean>(false);
	const size = useWindowSize();

    const menuItems = [{
        name: "Gallery",
        link: "/"
    }, {
		name: "Gemstones",
		link: "/gemstones"
	}, {
		name: "Contact",
		link: "/contact"
	}]

	console.log('openMobile', openMobile)

    return (
        <div className="flex h-32 w-full mx-auto p-5 bg-black shadow-xl justify-between">

			{/* LEFT SECTION */}
			<div className="grid grid-cols-3 items-center justify-center gap-1">
				
				{/* Logo Image */}
				<div className="flex items-center ml-4">
					<Link href="/">
						<Image src={images.Logo} alt="logo" width={70} height={70}/>
					</Link>
				</div>

				{/* Menu Items */}
				<div
					className = {
						size.width !== undefined && size?.width >= 680 
							? "flex items-center justify-between gap-10"
							: "hidden"
						}
				>	
					{menuItems.map((el, i) => (
						<Link
							key={i+1}
							href={{ pathname: `${el.link}` }}
						>
							<p className="text-2xl text-white">{el.name}</p>
						</Link>
						))}
				</div>
			</div>

			{/* RIGHT SECTION */}
			<div className="flex h-full items-center justify-center mt-4 mr-12">
				{/* Cart */}
				<div 
					className=" cursor-pointer" 
					onClick={()=> {setOpenMenu(true)}}
				>
					<Image src={images.Cart} alt="logo" className="relative" width={50} height={50}/>
					{ cart.length > 0 && (
						<div className="flex relative text-white w-8 p-1 items-center justify-center left-8 bottom-2 rounded-[50%] bg-red-500">
							{ cart.length }
						</div>
					)	}
				</div>

				{/* HAMBURGER MENU */}
				{size.width !== undefined && size?.width <= 680 ?
					<Image
						onClick={() => setOpenMobile(true)}
						width={50} 
						height={50}
						src={images.Hamburger} 
						alt="logo" 
						className="mb-7 ml-6 cursor-pointer" 
					/>
				: null}

			</div>

			{/* POPUP CART MENU */}
			{openMenu && (
				<Popup
					open={openMenu}
					className=""
					closeOnEscape={true}
					onClose={() => (
						setOpenMenu(false)
					)}
				>
					<Cart />
				</Popup>
			)}

			{/* POPUP MOBILE MENU */}
			{openMobile &&  (
				<MobileMenu
					openMobile={openMobile}
					setOpenMobile={setOpenMobile}
					menuItems={menuItems}
				/>
			)  }
		</div>
    );
}

export default NavBar;