import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {Card, CardHeader} from "@/components/ui/card.tsx";
import {ComponentProps, useRef, useState} from "react";
import {ArrowRight, X} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import Graph3D, {DotsRef} from "@/views/graph3d.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

function FieldOfStudyBadge({children, className, ...props}: ComponentProps<typeof Badge>) {
    return <Badge variant={"secondary"} className={cn("cursor-pointer h-7 gap-x-4", className)} {...props}>
        <span>{children}</span>
        <X className={"w-4 h-4"}/>
    </Badge>
}

const fields: Record<string, string[]> = {
    'Informatyczne': [
        'Informatyka stosowana',
        'Informatyka algorytmiczna',
        'Cyberbezpieczeństwo',
        'Telekomunikacja',
        'Inżynieria systemów',
        'Inżynieria oprogramowania',
        'Inżynieria internetu rzeczy',
        'Inżynieria sieci komputerowych',

    ],
    'Humanistyczne': [
        'Filozofia',
        'Socjologia',
        'Psychologia',
        'Pedagogika',
        'Historia',
        'Historia sztuki',
        'Historia kultury',
    ],
    'Techniczne': [
        'Inżynieria mechaniczna',
        'Inżynieria materiałowa',
        'Inżynieria chemiczna',
        'Inżynieria środowiska',
        'Inżynieria biomedyczna',
    ],
    'Medyczne': [
        'Medycyna',
        'Farmacja',
        'Dietetyka',
        'Zdrowie publiczne',
        'Pielęgniarstwo',
        'Położnictwo',
        'Fizjoterapia',
        'Logopedia',
        'Optyka',
        'Kosmetologia',
        'Zdrowie i uroda',
    ]
};

export default function FieldsOfStudy() {
    const graphRef = useRef<DotsRef>(null);
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const add = (v: string) => {
        setSelectedFields([...(new Set([...selectedFields, v]))]);
        setSearch('');
        graphRef.current.focus(v);
    };

    const remove = (v: string) => setSelectedFields(selectedFields.filter(x => x !== v));

    return <PageLayout>
        <div className={"flex justify-stretch gap-10 h-max flex-1"}>
            <div className={"w-96"}>
                <PageTitle>Kierunki studiów</PageTitle>
                <h2 className={"text-md mb-5"}>Zaznacz kierunki, które cię interesują.</h2>
                <Command>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Wyszukaj kierunek..."/>
                    <CommandList>
                        <CommandEmpty>Nie znaleziono.</CommandEmpty>
                        {Object.keys(fields).map(x => <CommandGroup heading={x} key={x}>
                            {fields[x]
                                .filter(x => !selectedFields.includes(x.toLowerCase()))
                                .map(f =>
                                    <CommandItem key={f} value={f} onSelect={(v: string) => add(v)}>
                                        {f}
                                    </CommandItem>
                                )}
                        </CommandGroup>)}
                    </CommandList>
                </Command>
            </div>
            <div className={"flex-1 flex flex-col gap-5"}>
                <div className={"flex-grow"}>
                    {/*<Graph3D />*/}
                    <div className={'w-full h-full'}>
                        <Graph3D className={'h-full w-full'}
                                 dotsRef={graphRef}
                                 items={Object
                                     .values(fields)
                                     .reduce((acc, x) => [...acc, ...x], [])
                                     .map(x => ({name: x}))
                                 }/>
                    </div>
                </div>
                <Card className={"w-full"}>
                    <CardHeader className={"flex flex-row items-center h-20"}>
                        <h3 className={"mr-5"}>Wybrane kierunki</h3>
                        <ScrollArea className={'h-20 py-3 flex-1'}>
                            <div className={"flex items-center gap-3 flex-wrap"}>
                                {selectedFields
                                    .map(x => (
                                        <FieldOfStudyBadge key={x} onClick={() => remove(x.toLowerCase())}>
                                            {x}
                                        </FieldOfStudyBadge>
                                    ))}
                            </div>
                        </ScrollArea>
                        <Button>
                            Przejdź dalej
                            <ArrowRight className={"w-4 h-4 ml-3"}/>
                        </Button>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </PageLayout>
}