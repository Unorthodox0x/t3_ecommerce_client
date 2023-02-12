import { Item } from "@/models/index"
import { trpc } from "@/utils/trpc";
import {GalleryItem} from "@/components";

//make a component that is 3 rows, shift the second element of that component down
//itterate over the list of all gallery items, and splice them into groups of 3
//pass each 3 in the list into this component 
export default function GemstonesMain() {

    //FETCH DATA REQUEST
     const {data:fetchedItems} = trpc.fetchItems
        .useQuery({},{
            onSuccess: (data:Item[]) => {
                console.log('done', data)
            },
    })

    return (
        <div className="flex flex-col h-full w-full mx-20 items-center justify-center"> 
            <div className="flex flex-wrap w-full justify-start py-16 max-w-[1800px]">
            {/* Single Item LIST */}
            { fetchedItems?.map(
                (item:Item, i:number) => (
                    <div 
                        className="flex overflow-wrap my-5 rounded-2xl group perspective preserve-3d"
                        key={i}
                    >
                        <GalleryItem 
                            item={item}
                            key={i}
                        />
                    </div>
            ))    }
            </div>
        </div>
    );
}