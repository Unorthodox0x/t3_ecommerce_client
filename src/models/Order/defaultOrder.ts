import {IOrder, IOrderContext} from "./Order";

export const defaultOrder:IOrder = {
	email:"",
	firstName: "",
	lastName: "",
	country: "",
	stateProvince: "",
	city: "",
	address1: "",
	address2: "",
	zipcode: "",
	items: [],
	paymentMethod: "",
	totalPrice: 0,
}

export const defaultOrderContext:IOrderContext = {
	order: defaultOrder,
	setOrder: () => {},
	message: "",
	setMessage: () => {},
	paymentMethod: "",
	setPaymentMethod: () => {},
	totalPrice: 0,
	setTotalPrice: () => {},
	ShippingForm: null,
	openStripe: false,
	setOpenStripe: () => {},
	openPaypal: false,
	setOpenPaypal: () => {},
	createOrder: () => {}
}