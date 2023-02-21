import {ICartItem} from "@/models";

export default function calculateOrderAmount(items:ICartItem[]):number {
	let sum = 0;
	items.map((item:ICartItem) => (sum += item.price));
	return sum
}