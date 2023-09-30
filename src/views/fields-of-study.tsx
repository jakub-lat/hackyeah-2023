import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";

import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Card, CardHeader} from "@/components/ui/card.tsx";
import {ComponentProps, useEffect, useRef, useState} from "react";
import {ArrowRight, X} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import Graph3D, {DotsRef} from "@/views/graph3d.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useGraphStore} from "@/store/graphStore.ts";
import {useFilterStore} from "@/store/filterStore.ts";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Link} from "react-router-dom";
import getFaculties from '../store/facultiesStore.ts';

function FieldOfStudyBadge({children, className, ...props}: ComponentProps<typeof Badge>) {
    return <Badge variant={"secondary"} className={cn("cursor-pointer h-7 gap-x-4", className)} {...props}>
        <span>{children}</span>
        <X className={"w-4 h-4"}/>
    </Badge>
}

const getAllFaculties = async () => {
    return {
        Informatyczne: await getFaculties(),
    };
};

export default function FieldsOfStudy() {
    const graphRef = useRef<DotsRef>(null);
    const [search, setSearch] = useState('');
    const {focused} = useGraphStore();

    const {selectedFields, addSelectedField, removeSelectedField} = useFilterStore();
    const [allFaculties, setAllFaculties] = useState({Informatyczne: []});

    useEffect(() => {
        getAllFaculties().then(setAllFaculties);
    }, [allFaculties]);

    const add = (v: string) => {
        addSelectedField(v);
        setSearch('');
        graphRef.current?.focus(v);
    };

    const remove = (v: string) => removeSelectedField(v);


    return <>
        <PageLayout>
            <div className={"flex justify-stretch gap-10 h-max flex-1"}>
                <div className={"w-[450px]"}>
                    <div className={"flex flex-row justify-between items-center"}>
                        <div>
                            <PageTitle>Kierunki studiów</PageTitle>
                            <h2 className={"text-md mb-5"}>Zaznacz kierunki, które cię interesują.</h2>
                        </div>
                        <Button variant={"secondary"} asChild>
                            <Link to={"/fields-of-study/assistant"}>
                                Pomóż mi wybrać!
                            </Link>
                        </Button>
                    </div>
                    <Command className={"h-[65vh]"}>
                        <CommandInput value={search} onValueChange={setSearch} placeholder="Wyszukaj kierunek..."/>
                        <CommandList className={"max-h-[65vh]"}>
                            <CommandEmpty>Nie znaleziono.</CommandEmpty>
                            {Object.keys(allFaculties).map(x => <CommandGroup heading={x} key={x}>
                                {allFaculties[x]
                                    .filter(x => !selectedFields.includes(x))
                                    .map(f =>
                                        <CommandItem key={f} value={f} onSelect={() => add(f)}>
                                            {f}
                                        </CommandItem>
                                    )}
                            </CommandGroup>)}
                        </CommandList>
                    </Command>
                </div>
                <div className={"flex-1 flex flex-col gap-5"}>
                    <div className={"flex-grow relative"}>
                        {focused && <Card className={'absolute -top-[30px] w-[300px] left-[50%] z-40'}
                                          style={{transform: 'translateX(-50%)'}}>
                            <CardHeader className={'py-2 px-3 flex flex-row items-center justify-between'}>
                                {focused}
                                {selectedFields.includes(focused) ?
                                    <Button size={'sm'} variant={'secondary'} onClick={() => remove(focused)}>
                                        Usuń
                                    </Button>
                                    : <Button size={'sm'} variant={'secondary'} onClick={() => add(focused)}>
                                        Dodaj
                                    </Button>
                                }
                            </CardHeader>
                        </Card>}
                        <div className={'w-full h-full absolute top-0 bottom-0'}>
                            <Graph3D className={'h-full w-full'}
                                     dotsRef={graphRef}
                                     items={Object
                                         .values(allFaculties)
                                         .reduce((acc, x) => [...acc, ...x], [])
                                         .map(x => ({name: x}))
                                     }/>
                        </div>
                    </div>
                    <Card className={"w-full m-0 mb-4"}>
                        <CardHeader className={"flex flex-row items-center h-20"}>
                            <h3 className={"mr-5"}>Wybrane kierunki</h3>
                            <ScrollArea className={'h-12 p-0 flex-1 mr-5'}>
                                <div className={"flex items-center gap-3 flex-wrap min-h-20"}>
                                    {selectedFields
                                        .map(x => (
                                            <FieldOfStudyBadge key={x} onClick={() => remove(x)}>
                                                {x}
                                            </FieldOfStudyBadge>
                                        ))}
                                </div>
                            </ScrollArea>
                            <Button asChild>
                                <Link to={"/universities"}>
                                    Kontynuuj
                                    <ArrowRight className={"w-4 h-4 ml-3"}/>
                                </Link>
                            </Button>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </PageLayout>
        <AlertDialog defaultOpen={selectedFields.length === 0}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Nie wiesz jeszcze, co chcesz studiować?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Nasz asystent AI - kierunkomat - pomoże ci wybrać ścieżkę kariery dopasowaną do twoich
                        predyspozycji
                        i zainteresowań!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Pomiń</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link to={"/fields-of-study/assistant"}>
                            Kontynuuj
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}