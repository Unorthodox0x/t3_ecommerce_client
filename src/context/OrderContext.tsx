import React, { useState, createContext } from "react";
import {
	defaultOrderContext,
	IOrderContext
} from "@/models"
import {useForm} from "react-hook-form";
// import {selectableCountries} from "../utils/constants/index"

/**
 * This Context is used to collect shipping information from user
 * 	and call server function to 
 */
export const OrderContext = createContext<IOrderContext>(defaultOrderContext);

export const OrderContextProvider = ({ children }) => {

	const ShippingForm = useForm(); //imported in checkoutForm
	const {watch} = ShippingForm;
	const paymentMethod = watch("payment_method");
	const email = watch('email');

	//SINGLE ORDER VARS
	const [message, setMessage] = useState<string>("");	
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [openStripe, setOpenStripe] = useState<boolean>(false);
	const [openPaypal, setOpenPaypal] = useState<boolean>(false);

	return(
		<OrderContext.Provider
			value={{
				message,
				setMessage,
				email,
				//form
				ShippingForm,
				totalPrice,
				setTotalPrice,

				//Payment modals
				paymentMethod,
				openStripe,
				setOpenStripe,
				openPaypal,
				setOpenPaypal,
			}}
		>
			{children}
		</OrderContext.Provider>
		)

}