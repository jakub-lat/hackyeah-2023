import {useFilterStore} from "@/store/filterStore.ts";
import {MultiSelect} from "@/components/ui/multiselect.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, Sparkles} from "lucide-react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Link} from "react-router-dom";
import {
    AlertDialog, AlertDialogAction,    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import RecruitmentPoints from "@/components/recruitment-points.tsx";


export default function Filters() {
    const {} = useFilterStore();

    const [selected, setSelected] = useState<string[]>([]);

    const cities = ['Wrocław', 'Warszawa', 'Kraków', 'Poznań', 'Gdańsk', 'Białystok', 'Bydgoszcz', 'Toruń'];

    return <div className={"flex gap-4 mb-3"}>
        <Button variant={"outline"} asChild>
            <Link to={"/fields-of-study"}>
                <ArrowLeft className={"w-4 h-4 mr-3 opacity-50"}/>
                Wybierz kierunki
            </Link>
        </Button>
        <div className={'w-[250px]'}>
            <MultiSelect options={cities.map(x => ({label: x, value: x}))}
                         label={'Miasto'}
                         selected={selected} onChange={setSelected} className={'w-64'}
            />
        </div>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <RecruitmentPoints />

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"}>
                    Zaawansowane filtry
                    <Sparkles className={"w-4 h-4 shrink-0 opacity-75 ml-5 text-pink-400"} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"min-w-[800px]"}>
                <AlertDialogHeader className={"min-h-[400px]"}>
                    <AlertDialogTitle className={"flex items-center"}>
                        Zaawansowane filtry
                        <Sparkles className={"w-5 h-5 shrink-0 opacity-75 ml-3 text-pink-400"} />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/*<AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                    <AlertDialogAction>Zamknij</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
}