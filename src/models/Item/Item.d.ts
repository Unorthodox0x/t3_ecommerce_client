import {Dispatch, SetStateAction} from "react";

export declare interface IItemContext {
  id: string
  setId: Dispatch<SetStateAction<string>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  img: string|null
  setImg: Dispatch<SetStateAction<string|null>>
  imgLocation: string|null|undefined
  setImgLocation: Dispatch<SetStateAction<string|null|undefined>>
  price: number
  setPrice: Dispatch<SetStateAction<number>>
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
  itemType: string
  setItemType: Dispatch<SetStateAction<string>>
  subType: string
  setSubType: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

export declare interface Item {
  id: string
  name: string
  img: string|null
  imgLocation?: string|null|undefined
  price: number
  quantity: number
  itemType: string
  subType: string
  description: string
  createdAt: string
}