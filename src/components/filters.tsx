import { useFilterStore } from "@/store/filterStore.ts";
import { MultiSelect } from "@/components/ui/multiselect.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
    AlertDialog, AlertDialogAction, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import RecruitmentPoints from "@/components/recruitment-points.tsx";
import AdvancedFilters from "@/components/advanced-filters.tsx";


export default function Filters() {
    const { setCities, selectedCities,tags } = useFilterStore();

    const cities = ['Wrocław', 'Warszawa', 'Kraków', 'Poznań', 'Gdańsk', 'Białystok', 'Bydgoszcz', 'Toruń'];

    return <div className={"flex flex-wrap gap-2 mb-5"}>
        <Button variant={"outline"} asChild>
            <Link to={"/fields-of-study"}>
                <ArrowLeft className={"w-4 h-4 mr-3 opacity-50"} />
                Wybierz kierunki
            </Link>
        </Button>
        <div className={'max-h-10'}>
            <MultiSelect options={cities.map(x => ({ label: x, value: x }))}
                label={'Miasto'}
                selected={selectedCities} onChange={setCities} className={'w-64'}
            />
        </div>

        <RecruitmentPoints />

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"}>
                    Zaawansowane filtry
                    {tags.length !== 0 && <span className={'text-muted-foreground ml-2'}>{tags?.length || 0}</span>}
                    <Sparkles className={"w-4 h-4 shrink-0 opacity-75 ml-3 text-pink-400"} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"min-w-[800px]"}>
                <AlertDialogHeader className={"min-h-[400px]"}>
                    <AlertDialogTitle className={"flex items-center"}>
                        Zaawansowane filtry
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <AdvancedFilters />
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