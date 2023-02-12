import createRows from "@/utils/createRows";
import { GalleryRow } from "@/components";
import { Item } from "@/models"
import { trpc } from "@/utils/trpc";

/**
 * 
 * How to shift 
 * center column down
 * 
 * | 1    |     | 3    |
 * | 4    | 2    | 6    |
 * | 7    | 5    | 9    |
 * |    | 8 |    |
 * |    |    |    |
 */

//make a component that is 3 rows, shift the second element of that component down
//itterate over the list of all gallery items, and splice them into groups of 3
//pass each 3 in the list into this component 
export default function GalleryMain() {

    //FETCH DATA REQUEST
     const {data:fetchedItems} = trpc.fetchItems
        .useQuery({},{
            onSuccess: (data:Item[]) => {
                console.log('done', data)
            },
    })
        
    const galleryRows:Item[][]|null = createRows(fetchedItems)

    return (
        <div className="flex flex-col">
            {galleryRows?.map(
                (row:Item[], i:number) => i < 3 && 
                    <GalleryRow 
                        key={i}
                        row={row}
                    /> 
            ) }
        </div>
    );
}