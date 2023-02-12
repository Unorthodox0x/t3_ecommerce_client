import React, { useState, createContext } from "react";
import {
	defaultOrder, defaultOrderContext,
	IOrderContext, IOrder
} from "../models/index"
// import {selectableCountries} from "../utils/constants/index"

/**
 * This Context is used to collect shipping information from user
 * 	and call server function to 
 */
export const OrderContext = createContext<IOrderContext>(defaultOrderContext);

export const OrderContextProvider = ({ children }) => {
	//ACTIVE CART
	// const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItem)

	//SINGLE ORDER VARS
	const [order, setOrder] = useState<IOrder>(defaultOrder)
	const [message, setMessage] = useState<string>("");
	const [email, setEmail] = useState<string>(defaultOrder.email);
	const [firstName, setFirstName] = useState<string>(defaultOrder.firstName)
	const [lastName, setLastName] = useState<string>(defaultOrder.lastName)
	const [country, setCountry] = useState<string>(defaultOrder.country)
	const [stateProvince, setStateProvince] = useState<string>(defaultOrder.stateProvince)
	const [city, setCity] = useState<string>(defaultOrder.city)
	const [address1, setAddress1] = useState<string>(defaultOrder.address1)
	const [address2, setAddress2] = useState<string>(defaultOrder.address2)
	const [zipcode, setZipcode] = useState<string>(defaultOrder.zipcode)
	const [paymentMethod, setPaymentMethod] = useState<string>(defaultOrder.paymentMethod)
	const [totalPrice, setTotalPrice] = useState<number>(defaultOrder.totalPrice)
	// const [shippingCost, setShippingCost] =useState<number>(defaultOrder.shippingCost);
	// const [shipped, setShipped] =useState<boolean>(defaultOrder.shipped);
	// const [received, setReceived] =useState<boolean>(defaultOrder.received);
	
	const createOrder = async():Promise<void> => {
		return;
	}

	// const orderPreview = () => {
		
	// }

	return(
		<OrderContext.Provider
			value={{
				order,
				setOrder,
				email,
				setEmail,
				message,
				setMessage,
				firstName,
				setFirstName,
				lastName,
				setLastName,
				country,
				setCountry,
				stateProvince,
				setStateProvince,
				city,
				setCity,
				address1,
				setAddress1,
				address2,
				setAddress2,
				zipcode,
				setZipcode,
				paymentMethod,
				setPaymentMethod,
				totalPrice,
				setTotalPrice,
				createOrder
			}}
		>
			{children}
		</OrderContext.Provider>
		)

}