import {Dispatch, SetStateAction} from "react";
import {Item} from "../Item/Item"

export declare interface IOrder {
	email: string
	firstName: string
	lastName: string
	country: string
	stateProvince: string
	city: string
	address1: string
	address2: string
	zipcode: string
	items: Item[],
	paymentMethod: string
	totalPrice: number
	// shippingCost: number
	// shipped: boolean
	// received: boolean
}

export declare interface IOrderContext {
	order: IOrder
	setOrder: Dispatch<SetStateAction<IOrder>>
	email: string
	setEmail: Dispatch<SetStateAction<string>>
	message: string
	setMessage: Dispatch<SetStateAction<string>>
	firstName: string
	setFirstName: Dispatch<SetStateAction<string>>
	lastName: string
	setLastName: Dispatch<SetStateAction<string>>
	country: string
	setCountry: Dispatch<SetStateAction<string>>
	stateProvince: string
	setStateProvince: Dispatch<SetStateAction<string>>
	city: string
	setCity: Dispatch<SetStateAction<string>>
	address1: string
	setAddress1: Dispatch<SetStateAction<string>>
	address2: string
	setAddress2: Dispatch<SetStateAction<string>>
	zipcode: string
	setZipcode: Dispatch<SetStateAction<string>>
	paymentMethod: string
	setPaymentMethod: Dispatch<SetStateAction<string>>
	totalPrice: number
	// shippingCost: number
	// shipped: boolean
	// received: boolean
	setTotalPrice: Dispatch<SetStateAction<number>>
	createOrder: Function
}