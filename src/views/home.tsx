import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";
import {appName} from "@/lib/const.ts";
import Graph3D from "@/views/graph3d.tsx";

export default function Home() {
    return <div className={"p-10 h-full"}>
        <div className={"flex flex-col items-center justify-around my-20"}>
            <div className={"text-center"}>
                <h1 className={"text-6xl font-bold mb-4 font-radio-canada"}>{appName}</h1>
                <h2 className="text-xl font-radio-canada">Znajdź swoją wymarzoną ścieżkę kariery</h2>
            </div>

            <Button className={"w-64 mt-10 font-bold relative font-radio-canada"} size={"lg"} asChild>
                <Link to={"/basic-info"}>
                    Zaczynamy
                    <ArrowRight className={"w-5 h-5 absolute right-5"}/>
                </Link>
            </Button>
        </div>
        {<Graph3D/>}
    </div>
}