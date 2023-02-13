import {Dispatch, SetStateAction} from "react";
import {Item} from "../Item/Item"
import {FieldValues, UseFormReturn} from "use-hook-form";

export declare interface IShippingForm {
	email: string
	firstName: string
	lastName: string
	country: string
	stateProvince: string
	city: string
	address1: string
	address2: string
	zipcode: string
}

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
}

export declare interface IOrderContext {
	order: IOrder
	setOrder: Dispatch<SetStateAction<IOrder>>
	ShippingForm: UseFormReturn<FieldValues>
	message: string,
	setMessage: Dispatch<SetStateAction<string>>
	paymentMethod: string
	setPaymentMethod: Dispatch<SetStateAction<string>>
	totalPrice: number
	setTotalPrice: Dispatch<SetStateAction<number>>
	openStripe: boolean
	setOpenStripe: Dispatch<SetStateAction<boolean>>
	openPaypal: boolean
	setOpenPaypal: Dispatch<SetStateAction<boolean>>
}