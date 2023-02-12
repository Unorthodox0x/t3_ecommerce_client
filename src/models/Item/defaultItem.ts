import {IItemContext, Item} from "./Item";

export const defaultItemContext:IItemContext = {
	id: "",
	setId: () => {},
	name: "",
	setName: () => {},
	img: "",
	setImg: () => {},
	imgLocation: "",
	setImgLocation: () => {},
	price: 0,
	setPrice: () => {},
	quantity: 0,
	setQuantity: () => {},
	itemType:"",
	setItemType: () => {},
	subType: "",
	setSubType: () => {},
	description: "",
	setDescription: () => {},
}

export const defaultItem:Item = {
	id:"",
	name:"",
	img: null,
	imgLocation: null,
	price:0,
	quantity: 0,
	itemType: "",
	subType: "",
	description:"",
	createdAt: ""
}