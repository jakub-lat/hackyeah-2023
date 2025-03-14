import {Button} from "@/components/ui/button.tsx";
import {ITagType, useFilterStore} from "@/store/filterStore.ts";
import {Check, Sparkles, Trash} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Slider} from '@/components/ui/slider.tsx';
import {Link} from "react-router-dom";

const minScore = 0;
const maxScore = 10;

const tagTypes: ITagType[] = [
    {
        name: 'Studia po angielsku',
        type: 'bool'
    },
    {
        name: 'Możliwość studiów zaocznych',
        type: 'bool'
    },
    {
        name: 'Dostępność akademików',
        type: 'bool'
    },
    {
        name: 'Cena mieszkań w okolicy',
        type: 'score'
    },
    {
        name: 'Koszty życia',
        type: 'score'
    },
    {
        name: 'Możliwość studiów zdalnych',
        type: 'bool'
    },
    {
        name: 'Prywatna uczelnia',
        type: 'bool'
    },
    {
        name: 'Cena',
        type: 'score'
    },
    {
        name: 'Wsparcie dla studentów z niepełnosprawnościami',
        type: 'bool'
    },
    {
        name: 'Infrastruktura sportowa',
        type: 'bool'
    },
    {
        name: 'Aktywność organizacji studenckich',
        type: 'bool'
    },
    {
        name: 'Dostępność programów wymiany studenckiej',
        type: 'bool'
    },
    {
        name: 'Wskaźnik zatrudnienia absolwentów',
        type: 'score'
    },
    {
        name: 'Dostępność stypendiów',
        type: 'bool'
    },
    {
        name: 'Dostępność biblioteki na kampusie',
        type: 'bool'
    },
];

function TagFilter({tagType}: { tagType: ITagType }) {
    const {tags, addTag, removeTag} = useFilterStore();
    const exists = tags.find(x => x.name === tagType.name);

    if (tagType.type === 'bool') {
        return <Button key={tagType.name} variant={exists ? 'secondary' : 'outline'}
                       onClick={() => exists ? removeTag(tagType.name) : addTag({name: tagType.name, value: true})}>
            {exists && <Check className={'w-4 h-4 opacity-50 mr-2'}/>}
            {tagType.name}
        </Button>
    }

    if (tagType.type === 'score') {
        return <Popover>
            <PopoverTrigger asChild>
                <Button variant={exists ? 'secondary' : "outline"}>
                    {exists && <Check className={'w-4 h-4 opacity-50 mr-2'}/>}
                    {tagType.name}
                    {exists && <span className={'text-muted-foreground ml-3'}>{exists?.value}/{maxScore}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <div className={'flex items-center mb-5'}>
                            <h4 className="font-medium leading-none flex-1">{tagType.name}</h4>
                            <Button variant={'outline'} size={'sm'} onClick={() => removeTag(tagType.name)}>
                                <Trash className={'w-4 h-4'}/>
                            </Button>
                        </div>
                        <div className={'flex gap-x-3'}>
                            <Slider
                                min={minScore}
                                max={maxScore}
                                step={1}
                                value={exists ? [exists.value as number] : [0]}
                                onValueChange={value => {
                                    if (exists) {
                                        removeTag(tagType.name);
                                    }
                                    addTag({name: tagType.name, value: value[0]});
                                }}
                                className={'flex-1'}
                            />
                            <span>{exists?.value}</span>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    }
}

export default function AdvancedFilters() {
    return (<>
            <div className={'flex flex-wrap gap-2 pt-4'}>
                {tagTypes.sort((a, b) => a.name.localeCompare(b.name)).map(x => <TagFilter tagType={x} key={x.name}/>)}
            </div>
            <div className={'mt-12'}>
                <Button asChild variant={'secondary'}>
                    <Link to={'/assistant'}>
                        Wygeneruj filtry
                        <Sparkles className={"w-4 h-4 shrink-0 opacity-75 ml-3 text-pink-400"}/>
                    </Link>
                </Button>
            </div>
        </>
    )
}