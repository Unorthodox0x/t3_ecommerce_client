import React, { useState, createContext } from "react";
import {
	defaultItemContext, IItemContext,
	defaultItem
} from "../models/index";

/**
 * This Context is used to collect shipping information from user
 * 	and call server function to 
 */
export const ItemContext = createContext<IItemContext>(defaultItemContext);

export const ItemContextProvider = ({children}:{children: React.ReactNode}) => {

	const [id, setId] = useState<string>(defaultItem.id);
	const [name, setName] = useState<string>(defaultItem.name);
	const [img, setImg] = useState<string|null>(null);
	const [imgLocation, setImgLocation] = useState<string|null|undefined>(null);
	const [quantity, setQuantity] = useState<number>(defaultItem.quantity);
	const [price, setPrice] = useState<number>(defaultItem.price);
	const [itemType, setItemType] = useState<string>(defaultItem.itemType);
	const [subType, setSubType] = useState<string>(defaultItem.subType);
	const [description, setDescription] = useState<string>(defaultItem.description);

	//add  amount: x of y

	return(
		<ItemContext.Provider
			value={{
				id,
				setId,
				name,
				setName,
				img,
				setImg,
				imgLocation,
				setImgLocation,
				quantity,
				setQuantity,
				price,
				setPrice,
				itemType,
				setItemType,
				subType,
				setSubType,
				description,
				setDescription,
			}}
		>
			{children}
		</ItemContext.Provider>
		)

}