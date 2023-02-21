import {Dispatch, SetStateAction} from "react";
import {FieldValues, UseFormReturn} from "use-hook-form";

export declare interface IShippingForm {
	email: string
	first_name: string
	last_name: string
	country: string
	state_province: string
	city: string
	address_one: string
	address_two: string
	zip_code: string
}

export declare interface IOrderContext {
	ShippingForm: UseFormReturn<FieldValues>
	message: string,
	setMessage: Dispatch<SetStateAction<string>>
	email: string,
	paymentMethod: string
	totalPrice: number
	setTotalPrice: Dispatch<SetStateAction<number>>
	openStripe: boolean
	setOpenStripe: Dispatch<SetStateAction<boolean>>
	openPaypal: boolean
	setOpenPaypal: Dispatch<SetStateAction<boolean>>
}