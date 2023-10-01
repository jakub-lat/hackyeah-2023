import PageLayout from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";
import UniCard from "@/components/universities/uni-card";
import {useEffect, useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import Filters from "@/components/filters.tsx";
import { useFilterStore } from "@/store/filterStore.ts";
import {useFilterStore} from "@/store/filterStore.ts";
import universities from "../data/universities_with_tags_scored.json";
import allFieldsOfStudy from "../data/fieldsOfStudy.json";
import {useAssistantSuggestionsStore} from "@/store/assistantSuggestionsStore";
import {getSimilarMetacategories} from "@/lib/utils";
import getFaculties from '@/store/facultiesStore';
import { useUniStore } from "@/store/universityStore.ts";
import University from "@/components/university";
import {useSearchParams} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase.ts";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";

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

/*
interface FieldOfStudy {
    type: string;
    universityId: string;
    facultyName: string | null;
    degree: Number;
    numberOfPoints: Number;
}
*/

interface University {
    id?: string;
    name: string;
    longitude: Number;
    latitude: Number;
    city: string;
    geoHash: string;
    tags_scored: any;
}

export default function Universities() {
    const { selectedFields, tags,, addSelectedField, setCities, selectedCities, getSelectedFields } = useFilterStore();

    // const [focus, setFocus] = useState(null)
    const { focused, setFocused, universities: universitiesStore, setUniversities: setUniversitiesStore } = useUniStore();


    const [search, _setSearch] = useSearchParams();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (search.has('id')) {
            setFocused(universities.find((uni) => uni.name === search.get('id')));
        }
    }, [search]);

    const getAIScore = (uni: University) => {
        if (tags.length === 0) {
            return 0;
        }
        var score = 0;
        for (const tag of tags) {
            const value = tag.value;
            if (typeof value === 'boolean') {
                if (value === uni.tags_scored[tag.name]) {
                    score += uni.tags_scored[tag.name] * 10;
                }
            } else if (typeof value === 'number') {
                const dist = Math.abs(value - uni.tags_scored[tag.name]);
                score += (10 - dist);
            }
        }
        const maxScore = 40 + 11 * 10;
        var finalScore = Math.round(score / maxScore * 100) * 2;
        if (finalScore >= 100) {
            finalScore = 100 - Math.random() * 10;
        }
        return Math.round(finalScore);
    }

    const selectedFieldsOfStudy = allFieldsOfStudy.filter((field) => selectedFields.includes(field.type));
    const doesUniversityOfferAnySelectedField = (uni: University) => selectedFieldsOfStudy.map((f) => f.universityId).includes(uni.name);
    const selectedUniversities = Array.from(new Set(universities.filter(doesUniversityOfferAnySelectedField)))

    useEffect(() => {
        if(universitiesStore.length != selectedUniversities.length) {
            setUniversitiesStore(selectedUniversities)
        }
    }, [selectedUniversities]);

    // const getUniversityFieldsDescription = (uni: University) => {
    //     const fields = new Set(selectedFieldsOfStudy.filter((f) => f.universityId === uni.name).map(f => f.type))
    //     if (fields.size === 1) {
    //         return `kierunek: ${Array.from(fields)[0]}`;
    //     }
    //     return `kierunki: ${Array.from(fields).join(", ")}`;
    // };
    const { suggestedFieldsOfStudy, preferredCity } = useAssistantSuggestionsStore();
    const [areAssistantSuggestionsIncluded, setAssistantSuggestionsIncluded] = useState(false);
    const allFaculties = getFaculties();

    const {getFavorites} = useUniStore();

    useEffect(() => {
        const filterByAssistantSuggestions = async () => {
            const similarMetacategories = await getSimilarMetacategories(suggestedFieldsOfStudy);
            for (const metacategory of similarMetacategories) {
                if (metacategory in allFaculties) {
                    for (let i = 0; i < Math.min(5, allFaculties[metacategory].length); i++) {
                        addSelectedField(allFaculties[metacategory][i]);
                    }
                }
            }
        };

        if (!areAssistantSuggestionsIncluded) {
            if (suggestedFieldsOfStudy.length > 0)
                filterByAssistantSuggestions();
            if (preferredCity !== null) {
                setCities([...selectedCities, preferredCity]);
            }
            setAssistantSuggestionsIncluded(true);
        }
    }, [areAssistantSuggestionsIncluded, suggestedFieldsOfStudy]);

    useEffect(() => {
        getSelectedFields();
        getFavorites();
    }, [user])

    return <PageLayout>
        <Filters />
        <div className="flex flex-col lg:flex-row gap-5">

            {selectedFields.length === 0 && <Alert className={'h-min w-[450px] border-red-600 border-opacity-50 bg-red-600/10'}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Uwaga!</AlertTitle>
                <AlertDescription>
                    Nie wybrałeś żadnych kierunków.
                </AlertDescription>
            </Alert>}
            {focused ? <University university={focused}/> :
                <ScrollArea className="lg:w-[35%] max-h-[80vh]">
                    <div className="flex flex-col gap-3">
                        {selectedUniversities.sort((a, b) => getAIScore(b) - getAIScore(a)).map((uni, i) =>
                            <UniCard
                                key={i}
                                uni={uni}
                                // description={`${uni.city}, ${getUniversityFieldsDescription(uni)}`}
                                // icon={null}
                                 aiScore={getAIScore(uni)}
                                onClick={() => setFocused(uni)}
                            />
                        )}
                    </div>
                </ScrollArea>}
            <div className="lg:w-[65%] lg:h-[80vh]">
                <Map
                    markers={selectedUniversities.map((uni) => {
                        return {
                            lat: uni.latitude,
                            lng: uni.longitude,
                            badge: uni.name,
                            icon: null,
                            onClick: () => setFocused(uni)
                        }
                    })}
                    focus={focused}
                />
            </div>
        </div>
    </PageLayout>
}