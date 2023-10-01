import PageLayout from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";
import UniMock from "@/mock/universities";
import UniCard from "@/components/universities/uni-card";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Filters from "@/components/filters.tsx";
import { useFilterStore } from "@/store/filterStore.ts";
import universities from "../data/universities.json";
import allFieldsOfStudy from "../data/fieldsOfStudy.json";
/*
    {
      "name": "Uniwersytet Warszawski",
      "city": "Warszawa",
      "major": "Informatyka",
      "lat": 52.2297,
      "lng": 21.0122,
      "icon": "https://promocja.strony.uw.edu.pl/wp-content/uploads/sites/339/2020/07/PL_zwykly_okragly.png"
    },
*/

interface FieldOfStudy {
    type: string;
    universityId: string;
    facultyName: string | null;
    degree: Number;
    numberOfPoints: Number;
}

interface University {
    name: string;
    longitude: Number;
    latitude: Number;
    city: string;
    geoHash: string;
}

export default function Universities() {
    const [focus, setFocus] = useState(null)
    const { selectedFields } = useFilterStore();
    const selectedFieldsOfStudy = allFieldsOfStudy.filter((field) => selectedFields.includes(field.type));
    const doesUniversityOfferAnySelectedField = (uni: University) => selectedFieldsOfStudy.map((f) => f.universityId).includes(uni.name);
    const selectedUniversities = Array.from(new Set(universities.filter(doesUniversityOfferAnySelectedField)))
    const getUniversityFieldsDescription = (uni: University) => {
        const fields = new Set(selectedFieldsOfStudy.filter((f) => f.universityId === uni.name).map(f => f.type))
        if (fields.size === 1) {
            return `kierunek: ${Array.from(fields)[0]}`;
        }
        return `kierunki: ${Array.from(fields).join(", ")}`;
    };

    return <PageLayout>
        <Filters />
        <div className="flex flex-col lg:flex-row gap-5">
            <ScrollArea className="lg:w-[35%] max-h-[80vh]">
                <div className="flex flex-col gap-3">
                    {selectedUniversities.map((uni, i) =>
                        <UniCard
                            key={i}
                            header={uni.name}
                            description={`${uni.city}, ${getUniversityFieldsDescription(uni)}`}
                            icon={null}
                            onClick={() => setFocus({ lat: uni.latitude, lng: uni.longitude })}
                        />
                    )}
                </div>
            </ScrollArea>
            <div className="lg:w-[65%] lg:h-[80vh]">
                <Map
                    markers={selectedUniversities.map((uni) => {
                        return {
                            lat: uni.latitude,
                            lng: uni.longitude,
                            badge: uni.name,
                            icon: null,
                            onClick: () => setFocus({ lat: uni.latitude, lng: uni.longitude })
                        }
                    })}
                    focus={focus}
                />
            </div>
        </div>
    </PageLayout>
}