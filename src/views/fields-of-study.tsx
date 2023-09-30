import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {Card,  CardHeader} from "@/components/ui/card.tsx";
import {ComponentProps, useState} from "react";
import {ArrowRight, X} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

function FieldOfStudyBadge({children, className, ...props}: ComponentProps<typeof Badge>) {
    return <Badge variant={"secondary"} className={cn("cursor-pointer h-7 gap-x-4", className)} {...props}>
        <span>{children}</span>
        <X className={"w-4 h-4"} />
    </Badge>
}

const fields: Record<string, string[]> = {
    'Informatyczne': [
        'Infa stosowana',
        'Infa algorytmiczna'
    ],
    'Humanistyczne': [
        'Filozofia',
        'Socjologia'
    ]
}

export default function FieldsOfStudy() {
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const add = (v: string) => {
        setSelectedFields([...(new Set([...selectedFields, v]))]);
        setSearch('');
    };
    const remove = (v: string) => setSelectedFields(selectedFields.filter(x => x !== v));

    return <PageLayout>
        <PageTitle>Kierunki studiów</PageTitle>
        <h2 className={"text-md"}>Zaznacz kierunki, które cię interesują.</h2>
        <div className={"flex justify-stretch gap-10 h-max flex-1"}>
            <div className={"w-96 pt-5"}>
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
            <div className={"flex-1 flex flex-col items-stretch gap-5"}>
                <div className={"flex-grow"}>
                    Test
                </div>
                <Card className={"w-full"}>
                    <CardHeader className={"flex flex-row items-center h-20"}>
                        <h3 className={"mr-5"}>Wybrane kierunki</h3>
                        <div className={"flex gap-3 flex-1"}>
                            {selectedFields
                                .map(x => (
                                    <FieldOfStudyBadge key={x} onClick={() => remove(x.toLowerCase())}>
                                        {x}
                                    </FieldOfStudyBadge>
                                ))}
                        </div>
                        <Button>
                            Znajdź uczelnie
                            <ArrowRight className={"w-4 h-4 ml-3"} />
                        </Button>
                    </CardHeader>
                </Card>
            </div>
        </div>
    </PageLayout>
}