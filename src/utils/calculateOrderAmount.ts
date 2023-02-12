import {Item} from "@/models";

export default function calculateOrderAmount(items:Item[]):number {
	let sum = 0;
	items.map((item:Item) => (sum += item.price));
	return sum
}