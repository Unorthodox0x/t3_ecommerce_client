import {Dispatch, SetStateAction} from "react";
import {Item} from "../index";

export declare interface ICartContext {
	cart:  Item[]
	setCart: Dispatch<SetStateAction<Item[]>>
	openMenu: boolean
	setOpenMenu: Dispatch<SetStateAction<boolean>>
	totalValue: number
	setTotalValue: Dispatch<SetStateAction<number>>
	addItem: (item: Item|undefined) => void,
	removeItem: (cart: Item[], item: Item) => void,
	emptyCart: () => void,
}