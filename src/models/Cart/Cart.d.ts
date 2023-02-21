import {Dispatch, SetStateAction} from "react";
import {ICartItem} from "../index";

export declare interface ICartContext {
	cart:  ICartItem[]
	setCart: Dispatch<SetStateAction<ICartItem[]>>
	clientSecret: string|null|undefined
	customerId: string
	openMenu: boolean
	setOpenMenu: Dispatch<SetStateAction<boolean>>
	totalValue: number
	setTotalValue: Dispatch<SetStateAction<number>>
	addItem: (item: ICartItem|undefined) => void,
	removeItem: (cart: ICartItem[], item: ICartItem) => void,
	emptyCart: () => void,
}

export declare interface ICartItem {
	id: string
	name: string
	img: string
	price: number
	quantity: number
	itemType: string
	subType: string
	description: string
	orderId?: string|undefined
	createdAt: string|datetime
}