import {IUniversity, useUniStore} from "@/store/universityStore.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";


const field = (x) => {
    return <div className="field float-left m-2 bg-yellow-400 text-stone-950 px-2 py-0.5">{x}</div>
}

const University = ({university}: { university: IUniversity }) => {
    // const university = {
    //     name: "1",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur, magna id semper euismod, elit lorem egestas neque, blandit scelerisque nibh nunc nec risus. Aliquam sagittis congue diam, nec tempus risus mattis id. Curabitur congue sem elit, sit amet vestibulum leo semper sit amet. In neque lectus, ultrices vitae sagittis.",
    //     fieldsOfStudy: ["Lokalizacja", "Informatyka"],
    //     rating: 2137,
    //     comments: []
    // };

    const {setFocused} = useUniStore();

    return (
        <ScrollArea className="lg:w-[35%] max-h-[80vh]">
            <div className={"w-full pt-3"}>
                <div className={"flex justify-between"}>
                    <h1 className={"font-bold text-xl"}>{university.name}</h1>
                    <Button variant={"outline"} className={'px-3 py-3'} onClick={() => setFocused(null)}>
                        <X className={'w-5 h-5'}/>
                    </Button>
                </div>
                <p>
                    {university.name}
                </p>
                <div>
                    <p className="rating">
                        {university.rating || 5}/5
                    </p>
                    <p className="text-sm text-muted-foreground">
                        na bazie {university.comments?.length || 0} opinii
                    </p>
                </div>
                <div className="comments">
                    {university.comments}
                </div>
                <div className="fields">
                    {university.fieldsOfStudy?.map(x => field(x))}
                </div>
            </div>
        </ScrollArea>
    );
}

export default University;