import {
    AlertDialog, AlertDialogAction,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown, X} from "lucide-react";
import {useState} from "react";
import {Popover, PopoverContent} from "./ui/popover";
import {PopoverTrigger} from "@/components/ui/popover.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import { Slider } from "./ui/slider";

const maturaSubjects = ['J. polski PP', 'J. polski PR', 'Matematyka PP', 'Matematyka PR', 'Biologia', 'Chemia', 'Fizyka', 'Geografia', 'Historia', 'Informatyka', 'Wos', 'Francuski', 'Hiszpański', 'Niemiecki', 'Rosyjski', 'Włoski', 'Historia sztuki', 'Filozofia', 'Historia muzyki', 'Łaciński'];

export default function RecruitmentPoints() {
    const [scores, setScores] = useState<[string, number | null][]>([]);
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);

    function addSubject(subject: string) {
        console.log(subject);
        setValue('');
        setOpen(false);
        setScores([...scores, [subject, null]]);
    }

    function updateScore(subject: string, score: number) {
        setScores(scores.map(([subj, _score]) => {
            if (subj === subject) {
                return [subj, score];
            }
            return [subj, _score];
        }));
    }

    function removeSubject(subject: string) {
        setScores(scores.filter(([subj, _score]) => subj !== subject));
    }

    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant={"outline"}>
                Punkty rekrutacyjne
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-6"/>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={"min-w-[600px]"}>
            <AlertDialogHeader className={"min-h-[400px]"}>
                <AlertDialogTitle className={"flex items-center"}>
                    Sprawdź, czy się dostaniesz
                </AlertDialogTitle>
                <AlertDialogDescription>
                    <h3 className={'mb-2'}>Wpisz wyniki z matury (rzeczywiste lub szacowane) aby wyróżnić uczelnie, na które będzie ci się trudniej dostać.</h3>
                    <div className={'flex flex-col gap-y-4 pb-4 pt-2'}>
                    {scores.map(([subject, score]) =>
                        <div className={'flex'}>
                        <div className={"grid items-center gap-4 grid-cols-3 mr-3"}>
                            <span>{subject}</span>
                            <Slider
                                max={100}
                                step={1}
                                value={[score]}
                                onValueChange={value => updateScore(subject, value[0])}
                            />
                            <Input type={'number'} value={score} onChange={e => updateScore(subject, e.target.value ? parseInt(e.target.value) : 0)} />
                        </div>
                            <Button variant='outline' className={'px-3 py-3'} onClick={() => removeSubject(subject)}>
                                <X className={'w-4 h-4'}/>
                            </Button>
                        </div>)}
                    </div>
                    <Popover open={open} onOpenChange={setOpen} modal={true}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? maturaSubjects.find((subj) => subj === value)
                                    : "Dodaj przedmiot..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] h-[300px] p-0">
                            <Command>
                                <CommandInput placeholder="Wyszukaj..."/>
                                <CommandEmpty>Nie znaleziono.</CommandEmpty>
                                <CommandGroup className="overflow-y-auto max-h">
                                    {maturaSubjects.filter(x => !scores.find(score => score[0] === x)).map((subject) => (
                                        <CommandItem
                                            key={subject}
                                            onSelect={() => {
                                                addSubject(subject);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === subject ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {subject}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction>Zamknij</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}