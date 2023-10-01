import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Card, CardHeader} from "@/components/ui/card.tsx";
import {useRef, useState} from "react";
import {ArrowRight, Check, Delete, Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import Graph3D, {DotsRef} from "@/views/graph3d.tsx";
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
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid"
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"

// function FieldOfStudyBadge({children, className, ...props}: ComponentProps<typeof Badge>) {
//     return <Badge variant={"secondary"} className={cn("cursor-pointer h-7 gap-x-4", className)} {...props}>
//         <span>{children}</span>
//         <X className={"w-4 h-4"}/>
//     </Badge>
// }

export default function FieldsOfStudy() {
    const graphRef = useRef<DotsRef>(null);
    const [search, setSearch] = useState('');
    const {focused} = useGraphStore();
    const [itemHovered, setItemHovered] = useState({});

    const {selectedFields, addSelectedField, removeSelectedField, saveSelectedFields} = useFilterStore();

    const allFaculties = getFaculties();

    const add = (v: string) => {
        addSelectedField(v);
        setSearch('');
        graphRef.current?.focus(v);
        saveSelectedFields();
    };

    const remove = (v: string) => {
        removeSelectedField(v);
        saveSelectedFields()
    }

    return <>
        <PageLayout>
            <div className={"flex justify-stretch gap-10 h-max flex-1"}>
                <div className={"w-[430px]"}>
                    <div className={"flex flex-row justify-between items-center"}>
                        <div>
                            <PageTitle>Kierunki studiów</PageTitle>
                            <h2 className={"text-sm mb-5"}>Zaznacz kierunki, które cię interesują.</h2>
                        </div>
                        <Button variant={"secondary"} asChild>
                            <Link to={"/fields-of-study/assistant"}>
                                Pomóż mi wybrać
                                <Sparkles className={"w-4 h-4 text-pink-500 ml-2"} />
                            </Link>
                        </Button>
                    </div>
                    <Command className={"h-[65vh]"}>
                        <CommandInput value={search} onValueChange={setSearch} placeholder="Wyszukaj kierunek..."/>
                        <CommandList className={"max-h-[65vh]"}>
                            <CommandEmpty>Nie znaleziono.</CommandEmpty>
                            {selectedFields.length !== 0 && <CommandGroup>
                                {selectedFields.map(f =>
                                    <CommandItem key={f} value={f} onMouseLeave={() => setItemHovered(null)} onMouseEnter={() => setItemHovered(f)} onSelect={() => remove(f)} className={"cursor-pointer"}>
                                        {itemHovered === f ? <Delete className={"w-4 h-4 opacity-50 mr-3"} />  : <Check className={"w-4 h-4 opacity-50 mr-3"} />}
                                        {f}
                                    </CommandItem>
                                )}
                            </CommandGroup>}
                            {Object.keys(allFaculties).map(x => <CommandGroup heading={x} key={x}>
                                {allFaculties[x]
                                    .filter(x => !selectedFields.includes(x))
                                    .map(f =>
                                        <CommandItem key={f} value={f} onSelect={() => add(f)} className={"cursor-pointer"}>
                                            {f}
                                        </CommandItem>
                                    )}
                            </CommandGroup>)}
                        </CommandList>
                    </Command>
                </div>
                <div className={"flex-1 flex flex-col gap-5"}>
                    <div className={"flex-grow relative"}>
                        {focused && <Card className={'absolute -bottom-[63px] w-[400px] left-[50%] z-40'}
                                          style={{transform: 'translateX(-50%)'}}>
                            <CardHeader className={'py-2 px-3 flex flex-row items-center justify-between'}>
                                {focused}
                                {selectedFields.includes(focused) ?
                                    <Button size={'sm'} variant={'secondary'} onClick={() => remove(focused)}>
                                        <HeartSolid className={'w-4 h-4 text-red-500'}/>
                                    </Button>
                                    : <Button size={'sm'} variant={'secondary'} onClick={() => add(focused)}>
                                        <HeartOutline className={'w-4 h-4'}/>
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
                    {/*<Card className={"w-full m-0 mb-4"}>*/}
                    {/*    <CardHeader className={"flex flex-row items-center h-20"}>*/}
                    {/*        <h3 className={"mr-5"}>Wybrane kierunki</h3>*/}
                    {/*        <ScrollArea className={'h-20 flex-1 mr-5'}>*/}
                    {/*            <div className={"flex items-center gap-3 flex-wrap min-h-20 py-6"}>*/}
                    {/*                {selectedFields*/}
                    {/*                    .map(x => (*/}
                    {/*                        <FieldOfStudyBadge key={x} onClick={() => remove(x)}>*/}
                    {/*                            {x}*/}
                    {/*                        </FieldOfStudyBadge>*/}
                    {/*                    ))}*/}
                    {/*            </div>*/}
                    {/*        </ScrollArea>*/}
                    {/*        <Button asChild>*/}
                    {/*            <Link to={"/universities"}>*/}
                    {/*                Kontynuuj*/}
                    {/*                <ArrowRight className={"w-4 h-4 ml-3"}/>*/}
                    {/*            </Link>*/}
                    {/*        </Button>*/}
                    {/*    </CardHeader>*/}
                    {/*</Card>*/}
                    <div className={'flex justify-end pb-10'}>
                            <Button asChild>
                                <Link to={"/universities"}>
                                    Kontynuuj
                                    <ArrowRight className={"w-4 h-4 ml-3"}/>
                                </Link>
                            </Button>
                    </div>
                </div>
            </div>
        </PageLayout>
        <AlertDialog onOpenChange={() => localStorage.setItem("hadAiAlert", "true")} defaultOpen={selectedFields.length === 0 && !localStorage.getItem("hadAiAlert")}>
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