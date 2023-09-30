import { useFilterStore } from "@/store/filterStore.ts";
import { Button } from "@/components/ui/button.tsx";
import Map from "@/components/ui/map";
import { useState } from "react";

export default function Home() {
    const { count, increment } = useFilterStore();
    const [markers,setMarkers] = useState([
        {
            lng: 18.4630064,
            lat: 51.0682513,
            badge: "Uczelnia",
            onClick: () => console.log("clicked")
        },
        {
            lng: 19.4630064,
            lat: 52.0682513,
            badge: "Inna uczelnia",
        },
    ]);

    return <div className={"p-10"}>
        {count}
        <br />
        <div className="flex">
            <div className="w-[50%]">
                <Button onClick={() => increment()}>Increment</Button>
                <Button onClick={() => {
                    setMarkers([...markers,{
                        lng: 17.4630064,
                        lat: 51.0682513,
                        badge: "Nowa uczelnia"
                        }])
                }}>Add marker</Button>
            </div>
            <div className="w-[50%]">
                <Map markers={markers} />
            </div>
        </div>
    </div>
}