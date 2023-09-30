import PageLayout, { PageTitle } from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";
import UniMock from "@/mock/universities";
import UniCard from "@/components/universities/uni-card";
import { useState } from "react";

export default function Universities() {
    const [focus, setFocus] = useState(null)

    return <PageLayout>
        <div className="flex flex-col lg:flex-row gap-5 py-5">
            <div className="lg:w-[35%] flex flex-col gap-3 max-h-[80vh] overflow-auto">
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
            <div className="w-[65%] h-[80vh]">
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