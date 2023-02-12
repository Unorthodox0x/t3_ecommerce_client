import React from "react"
import { Item } from "@/models";
import { GalleryItem } from "@/components";

interface CustomPageProps {
	row: Item[]
	key: number
}

export default function GalleryRow(props: CustomPageProps) {
	const { row } = props;

	return (
		<div className="flex flex-wrap mt-20 w-full justify-center">
			{row.length === 3 ? (
				<div className="flex flex-wrap w-full max-w-7xl items-start justify-center">
					{row?.map(
						(object: Item, i: number) => 
							<div
								className={
									i === 1
										? "mb-5 mt-36 rounded-2xl group perspective preserve-3d"
										: "my-5 rounded-2xl group perspective preserve-3d"
								}
								key={i}
							>
								<GalleryItem
									item={row[i]}
									key={i}
								/>
							</div>
					)}
				</div>
			) : row.length < 3 ? (
				<div className="flex flex-wrap w-full max-w-7xl items-start justify-center">
					{row?.map(
						(object: Item, i: number) => i < 3 &&
							<div
								className={
									i === 1
										? "my-5 rounded-2xl group perspective preserve-3d"
										: "my-5 rounded-2xl group perspective preserve-3d"
								}
								key={i}
							>
								<GalleryItem
									item={row[i]}
									key={i}
								/>
							</div>
					)}
				</div>
			) : null}
		</div>
	);
}