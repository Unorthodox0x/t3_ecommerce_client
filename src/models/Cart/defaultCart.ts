import {ICartContext} from "./Cart";

export const defaultCartContext:ICartContext = {
	openMenu: false,
	setOpenMenu: () => false,
	clientSecret: "",
	cart: [],
	setCart: () => [],
	totalValue: 0,
	setTotalValue: () => 0,
	addItem: () => [],
	removeItem: () => [],
}