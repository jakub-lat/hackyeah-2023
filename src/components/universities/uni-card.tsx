import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronRight, MapPin, School2} from "lucide-react";
import {HTMLProps, MouseEvent} from "react";
import {HeartIcon as HeartSolid} from "@heroicons/react/24/solid"
import {HeartIcon as HeartOutline} from "@heroicons/react/24/outline"
import {IUniversity, useUniStore} from "@/store/universityStore.ts";
import {Badge} from "@/components/ui/badge.tsx";
import allFieldsOfStudy from "@/data/fieldsOfStudy.json";
import {useFilterStore} from "@/store/filterStore.ts";

const UniCard = ({uni, onClick: onClick}: {
    uni: IUniversity
    onClick?: () => void
} & HTMLProps<HTMLButtonElement>) => {

    // const [isFavorited, setIsFavorited] = useState<boolean>(false);

    const {favorites, setFavorites, saveFavorites} = useUniStore();
    const isFavorited = favorites?.includes(uni.name);
    const setIsFavorited = (x: boolean) => {
        if (x) {
            setFavorites([...favorites, uni.name]);
        } else {
            setFavorites(favorites?.filter(y => y !== uni.name));
        }
        saveFavorites();
    }

    function handleClick() {
        if (onClick) {
            onClick();
        }
    }

    function toggleFav(e: MouseEvent) {
        e.stopPropagation();
        setIsFavorited(!isFavorited);
    }

    const {selectedFields} = useFilterStore();
    const selectedFieldsOfStudy = allFieldsOfStudy.filter((field) => selectedFields.includes(field.type));
    const fields = [...new Set(selectedFieldsOfStudy.filter((f) => f.universityId === uni.name).map(f => f.type))];

    return (
        <Card className="flex items-center cursor-pointer opacity-70 hover:opacity-100 transition-all"
              onClick={handleClick}>
            <CardHeader className="p-5">
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 icon">
                        {uni.icon ?
                            <img src={uni.icon}/> :
                            <School2 className="w-full h-full" color={"#478ce6"}/>
                        }
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-lg">{uni.name}</CardTitle>
                        <CardDescription>
                            <div className={'flex flex-wrap gap-1 mt-2'}>
                                <Badge variant={'secondary'} className={'px-1.5'}>
                                    <MapPin className={'w-3 h-3 mr-1 text-muted-foreground'}/>
                                    {uni.city}
                                </Badge>
                            </div>
                            <div className={'flex flex-wrap gap-1 mt-2'}>
                                {fields.map(x =>
                                    <Badge title={x} variant={'outline'}
                                           className={'p-2 whitespace-nowrap max-w-[250px] overflow-hidden truncate'}
                                           key={x}>
                                        {x}
                                    </Badge>
                                )}
                            </div>
                            {/*{description}*/}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="p-5 ml-auto">
                <Button onClick={toggleFav} variant="ghost">
                    {isFavorited ? <HeartSolid className="h-5 w-5"/> : <HeartOutline className="h-5 w-5"/>}
                </Button>
                <Button variant="ghost" onClick={handleClick}><ChevronRight/></Button>
            </CardFooter>
        </Card>
    )
}

export default UniCard;
