import {IUniversity, useUniStore} from "@/store/universityStore.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import getRandomNumber from "@/lib/math";


const field = (x) => {
    return <div className="field float-left m-2 bg-yellow-400 text-stone-950 px-2 py-0.5">{x}</div>
}

const University = ({university}: { university: IUniversity }) => {
    const {setFocused} = useUniStore();
    let starRatings : any = [];

    let ratingMax = 5;
    let ratingMin = 0;

    let peopleCountMax = 200;
    let peopleCountMin = 0;

    var randomRating = getRandomNumber(ratingMin, ratingMax);
    var randomPeopleCount = getRandomNumber(peopleCountMin, peopleCountMax);

    for (let index = 0; index < ratingMax; index++) {
        let star = index < (university.rating || randomRating) 
        ? <StarSolid className="w-5 h-5"></StarSolid> 
        : <StarOutline className="w-5 h-5"></StarOutline>
        starRatings.push(star);
    }

    return (
        <ScrollArea className="lg:w-[35%] max-h-[80vh]">
            <div className={"w-full pt-3"}>
                <div className={"flex justify-between"}>
                    <h1 className={"font-bold text-xl"}>{university.name}</h1>
                    <Button variant={"outline"} className={'px-3 py-3'} onClick={() => setFocused(null)}>
                        <X className={'w-5 h-5'}/>
                    </Button>
                </div>
                <p>{university.description}</p>
                <div>
                    <p className="rating">
                        <div className="flex mb-2">
                            {starRatings}
                        </div>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        na bazie {university.comments.length || randomPeopleCount} opinii
                    </p>
                </div>
                <div className="comments">
                    {university.comments}
                </div>
                <div className="fields">
                    {university.fieldsOfStudy?.map(x => field(x))}
                </div>
            </div>
        </ScrollArea>
    );
}

export default University;