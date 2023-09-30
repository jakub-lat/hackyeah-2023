import PageLayout from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";
import UniMock from "@/mock/universities";
import UniCard from "@/components/universities/uni-card";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Filters from "@/components/filters.tsx";

export default function Universities() {
    const [focus, setFocus] = useState(null)

    return <PageLayout>
        <Filters />
        <div className="flex flex-col lg:flex-row gap-5">
            <ScrollArea className="lg:w-[35%] max-h-[80vh]">
                <div className="flex flex-col gap-3">
                    {UniMock.map((uni, i) =>
                        <UniCard
                            key={i}
                            header={uni.name}
                            description={`${uni.city}, kierunek: ${uni.major}`}
                            icon={uni.icon}
                            onClick={() => setFocus({ lat: uni.lat, lng: uni.lng })}
                        />
                    )}
                </div>
            </ScrollArea>
            <div className="lg:w-[65%] lg:h-[80vh]">
                <Map
                    markers={UniMock.map((uni) => {
                        return {
                            lat: uni.lat,
                            lng: uni.lng,
                            badge: uni.name,
                            icon: uni.icon,
                            onClick: () => setFocus({ lat: uni.lat, lng: uni.lng })
                        }
                    })}
                    focus={focus}
                />
            </div>
        </div>
    </PageLayout>
}