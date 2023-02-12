import {ICartContext} from "./Cart";

export const defaultCartContext:ICartContext = {
	openMenu: false,
	setOpenMenu: () => {},
	cart: [],
	setCart: () => {},
	totalValue: 0,
	setTotalValue: () => {},
	addItem: () => {},
	removeItem: () => {}	
}