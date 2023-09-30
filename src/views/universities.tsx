import PageLayout, { PageTitle } from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";
import UniMock from "@/mock/universities";
import UniCard from "@/components/universities/uni-card";
import { useState } from "react";

export default function Universities() {
    const [focus, setFocus] = useState(null)

    return <PageLayout>
        <PageTitle>Uczelnie</PageTitle>

        <div className="flex flex-col lg:flex-row gap-5 py-5">
            <div className="lg:w-[50%] flex flex-col gap-3 max-h-[40rem] overflow-auto">
                {UniMock.map((uni, i) =>
                    <UniCard
                        key={i}
                        header={uni.name}
                        city={uni.city}
                        major={uni.major}
                        icon={uni.icon}
                        onClick={() => setFocus({ lat: uni.lat, lng: uni.lng })}
                    />
                )}
            </div>
            <div className="lg:w-[50%]">
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