import React, { useState, createContext } from "react";
import {
	defaultOrder, defaultOrderContext,
	IOrderContext, IOrder
} from "@/models"
import {useForm} from "react-hook-form";

// import {selectableCountries} from "../utils/constants/index"

/**
 * This Context is used to collect shipping information from user
 * 	and call server function to 
 */
export const OrderContext = createContext<IOrderContext>(defaultOrderContext);

export const OrderContextProvider = ({ children }) => {

	const ShippingForm = useForm();

	//SINGLE ORDER VARS
	const [order, setOrder] = useState<IOrder>(defaultOrder)
	const [message, setMessage] = useState<string>("");
	const [paymentMethod, setPaymentMethod] = useState<string>(defaultOrder.paymentMethod)
	const [totalPrice, setTotalPrice] = useState<number>(defaultOrder.totalPrice)
	const [openStripe, setOpenStripe] = useState<boolean>(false);
	const [openPaypal, setOpenPaypal] = useState<boolean>(false);

	return(
		<OrderContext.Provider
			value={{
				order,
				setOrder,
				message,
				setMessage,
				ShippingForm,
				paymentMethod,
				setPaymentMethod,
				totalPrice,
				setTotalPrice,
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