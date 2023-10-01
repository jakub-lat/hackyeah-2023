import {IUniversity, useUniStore} from "@/store/universityStore.ts";
import TinderCard from "react-tinder-card";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {HeartIcon as HeartSolid} from "@heroicons/react/24/solid"
import {MapPin, X} from "lucide-react";
import {useFilterStore} from "@/store/filterStore.ts";
import allFieldsOfStudy from "@/data/fieldsOfStudy.json";
import {Badge} from "@/components/ui/badge.tsx";
import {Link, useBeforeUnload} from "react-router-dom";

export default function Tinder({}: { universities?: IUniversity[] }) {
    const controller = useRef<any>();
    const [index, setIndex] = useState(0);
    const {universities, favorites, setFavorites, saveFavorites} = useUniStore();
    const [stack, setStack] = useState(universities);

    useBeforeUnload(() => {
       setIndex(0);
       setStack(universities);
    });

    useEffect(() => {
        setStack(universities);
    }, [universities.length]);

    console.log(stack);

    const onSwipe = (dir: string, name: string) => {
        setIndex(index + 1);
        if (dir === 'right') {
            setFavorites([...new Set([...favorites, name])]);
            saveFavorites();
        }
    }

    const onCardLeftScreen = () => {
        setStack(stack.slice(1));
        console.log(stack);
    }

    const {selectedFields, getSelectedFields} = useFilterStore();

    useEffect(() => {
        getSelectedFields();
    }, []);

    return <div>
        <div className={'w-full h-[510px] mx-auto mt-10 relative p-16 overflow-hidden'}>
            {universities.map((uni, idx) => [uni, idx]).reverse()
                .map(([uni, idx]: [IUniversity, number]) => {
                    const selectedFieldsOfStudy = allFieldsOfStudy.filter((field) => selectedFields.includes(field.type));
                    const fields = [...new Set(selectedFieldsOfStudy.filter((f) => f.universityId === uni.name).map(f => f.type))];

                    return <TinderCard key={uni.name} onSwipe={(dir) => onSwipe(dir, uni.name)}
                                       onCardLeftScreen={() => onCardLeftScreen()}
                                       preventSwipe={['right', 'left']} swipeThreshold={1000}
                                       ref={index === idx ? controller : undefined}
                                       className={'absolute top-0 left-[50%] right-0'}>
                        <Card className={'h-[500px] w-[500px] -translate-x-1/2'}>
                            <CardHeader>
                                <CardTitle>{uni.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
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
                            </CardContent>
                        </Card>
                    </TinderCard>;
                })}

            {!controller.current && <div className={'h-96 flex flex-col items-center justify-center'}>
                <h1 className={'font-bold text-2xl'}>Gotowe!</h1>
                <div className={'flex gap-x-2 mt-10'}>
                    <Button asChild variant={'secondary'}>
                        <Link to={"/universities"}>
                            Wróć do listy uczelni
                        </Link>
                    </Button>
                    <Button asChild variant={'secondary'}>
                        <Link to={"/favorites"}>
                            Zobacz ulubione
                        </Link>
                    </Button>
                </div>
            </div>}
        </div>
        {controller.current && <div className={'flex justify-center gap-x-4'}>
            <Button size={'lg'} variant={'secondary'} onClick={() => controller?.current.swipe('left')}>
                <X className={'w-6 h-6'}/>
            </Button>
            <Button size={'lg'} variant={'secondary'} onClick={() => controller?.current.swipe('right')}>
                <HeartSolid className={'w-6 h-6 text-red-500'}/>
            </Button>
        </div>}
    </div>;
}