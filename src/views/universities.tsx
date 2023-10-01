import PageLayout from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";
import UniMock from "@/mock/universities";
import Filters from "@/components/filters.tsx";
import {useUniStore} from "@/store/universityStore.ts";
import UniversityList from "@/components/university-list.tsx";
import University from "@/components/university.tsx";

export default function Universities() {
    // const [focus, setFocus] = useState(null)
    const {focused, setFocused} = useUniStore();

    return <PageLayout>
        <Filters />
        <div className="flex flex-col lg:flex-row gap-5">
            {focused ? <University university={focused} /> : <UniversityList />}
            <div className="lg:w-[65%] lg:h-[80vh]">
                <Map
                    markers={UniMock.map((uni) => {
                        return {
                            lat: uni.lat,
                            lng: uni.lng,
                            badge: uni.name,
                            icon: uni.icon,
                            onClick: () => setFocused(uni)
                        }
                    })}
                    focus={focused}
                />
            </div>
        </div>
    </PageLayout>
}