import { IUniversity, useUniStore } from "@/store/universityStore.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Button } from "@/components/ui/button.tsx";
import { X, UserCircle } from "lucide-react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import getRandomNumber from "@/lib/math";
// @ts-ignore
import ReactStreetview from "react-streetview";
import {Badge} from "@/components/ui/badge.tsx";
import {useFilterStore} from "@/store/filterStore.ts";
import allFieldsOfStudy from "@/data/fieldsOfStudy.json";


const field = (x) => {
    return <div className="field float-left m-2 bg-yellow-400 text-stone-950 px-2 py-0.5">{x}</div>
}

const comments = [
    { "name": "Aleksandra", "review": "Kampus jest piękny i rozległy. Profesorowie są kompetentni. Ogólnie wspaniałe doświadczenie." },
    { "name": "Bartosz", "review": "Udogodnienia są nieco przestarzałe. Jednak program nauczania jest pierwszorzędny." },
    { "name": "Cezary", "review": "Uwielbiam zróżnicowaną społeczność tutaj. Poznałem przyjaciół na całe życie." },
    { "name": "Dorota", "review": "Administracja zdaje się być nieco powolna. Akademicka strona jest dobra." },
    { "name": "Edward", "review": "Zasoby biblioteki są ogromne. Miałem wspaniałe doświadczenia z nauką." },
    { "name": "Franciszka", "review": "Dormitoria są wygodne. Jedzenie na kampusie wymaga poprawy." },
    { "name": "Grzegorz", "review": "Jestem pod wrażeniem obiektów sportowych. Drużyny są konkurencyjne." },
    { "name": "Halina", "review": "Laboratoria są wyposażone w najnowsze technologie. Było to świetne dla moich badań." },
    { "name": "Igor", "review": "Uniwersyteckie usługi kariery pomogły mi zdobyć staż. Bardzo pomocny personel." },
    { "name": "Joanna", "review": "Społeczność studencka jest aktywna. Uwielbiam festiwale i wydarzenia." },
    { "name": "Krzysztof", "review": "Lokalizacja jest dogodna. Wokół jest wiele miejsc do jedzenia." },
    { "name": "Lidia", "review": "Niektóre kursy wydawały się zatłoczone. Ogólnie dobre środowisko do nauki." },
    { "name": "Marek", "review": "Miałem wiele okazji do pracy nad projektami. Praktyczne doświadczenie było cenne." },
    { "name": "Nina", "review": "Kampus jest ekologiczny. Promują zrównoważony rozwój." },
    { "name": "Oskar", "review": "Profesorowie są bardzo dostępni. Pozytywna droga akademicka." },
    { "name": "Paulina", "review": "Wi-Fi bywa nierówne. Sale wykładowe są jednak wygodne." },
    { "name": "Radosław", "review": "Udogodnienia artystyczne są niesamowite. Naprawdę pobudziły moją kreatywność." },
    { "name": "Sylwia", "review": "Siłownia jest świetnie wyposażona. Pomaga w zachowaniu równowagi w życiu." },
    { "name": "Tomasz", "review": "Dołączyłem do różnych klubów i społeczności. Wzbogaciło to moje życie na uniwersytecie." },
    { "name": "Urszula", "review": "Administracja słucha opinii studentów. Dobrze czuć się wysłuchanym." },
    { "name": "Wojciech", "review": "Otoczenie uniwersytetu oferuje wiele. Dobry balans między życiem akademickim a społecznym." },
    { "name": "Zofia", "review": "Uniwersytet oferuje stypendia. Pomogło to złagodzić obciążenie finansowe." },
    { "name": "Adrian", "review": "Kulturalne zróżnicowanie na kampusie jest godne uwagi. To globalne doświadczenie." },
    { "name": "Barbara", "review": "Na kampusie zawsze coś się dzieje. Nigdy się nie nudziłem." },
    { "name": "Cecylia", "review": "Możliwości badawcze są tutaj ogromne. Zdobyłem dużo praktycznej wiedzy." },
    { "name": "Damian", "review": "Kampus jest bezpieczny. Personel ochrony jest czujny." },
    { "name": "Ewa", "review": "Programy studiów zagranicznych są kompleksowe. Dały mi globalne doświadczenie." },
    { "name": "Filip", "review": "Seminaria i warsztaty były pełne wglądów. Dodały wartości do kursów." },
    { "name": "Gabriela", "review": "Jest równowaga między nauką a zabawą. Czułem się kompletnie." },
    { "name": "Hubert", "review": "Dostałem praktyczne doświadczenie z projektami branżowymi. Było to korzystne dla mojej kariery." },
    { "name": "Izabela", "review": "Komórka pośrednictwa pracy jest aktywna. Dostałem dobre oferty pracy." },
    { "name": "Jacek", "review": "Sieć absolwentów jest silna. Są bardzo wspierający." },
    { "name": "Karolina", "review": "Opłaty są nieco wysokie. Ale udogodnienia uzasadniają koszt." },
    { "name": "Lucjan", "review": "Kursy online podczas pandemii były dobrze przemyślane. Brawo dla zarządu." },
    { "name": "Magdalena", "review": "Festiwale kulturalne są wspaniałe. Uwielbiam brać udział." },
    { "name": "Norbert", "review": "Usługi doradztwa studenckiego są godne uwagi. Są bardzo wyrozumiali." },
    { "name": "Olga", "review": "Jest wiele programów wymiany studenckiej. Nauczyłem się o różnych kulturach." }
]

const getRandomComments = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

const University = ({ university }: { university: IUniversity }) => {
    const { setFocused, focused } = useUniStore();
    let starRatings: any = [];

    let ratingMax = 5;
    let ratingMin = 0;

    let peopleCountMax = 200;
    let peopleCountMin = 1;

    var randomRating = getRandomNumber(ratingMin, ratingMax);
    var randomPeopleCount = getRandomNumber(peopleCountMin, peopleCountMax);
    if (randomRating === 0) {
        randomPeopleCount = 0;
    }

    // var comm = university.comments || ["lubię placki", "jestem hardkorem", "2137!!!111"];

    const randomComments = getRandomComments(comments, 5)

    for (let index = 0; index < ratingMax; index++) {
        let star = index < (university.rating || randomRating)
            ? <StarSolid className="fill-yellow-400 text-yellow w-5 h-5"></StarSolid>
            : <StarOutline className="w-5 h-5"></StarOutline>
        starRatings.push(star);
    }

    const {selectedFields} = useFilterStore();
    const selectedFieldsOfStudy = allFieldsOfStudy.filter((field) => selectedFields.includes(field.type));
    const fields = [...new Set(selectedFieldsOfStudy.filter((f) => f.universityId === university.name).map(f => f.type))];


    return (
        <ScrollArea className="lg:w-[35%] max-h-[80vh]">
            <div className={"w-full pt-3 px-3"}>
                <div className={"flex justify-between items-center pb-4"}>
                    <h1 className={"font-bold text-xl"}>{university.name}</h1>
                    <Button variant={"outline"} className={'px-3 py-3'} onClick={() => setFocused(null)}>
                        <X className={'w-5 h-5'} />
                    </Button>
                </div>
                <p className="">{university.description || "To jest test opisu uniwersytetu jakiegoś, super polecam! 10/10"}</p>
                <div className={'flex flex-wrap gap-1 mt-3'}>
                    {Object.entries(university.tags_scored)
                        ?.filter(([, value]: [string, any]) => value !== false)
                        .map(([tag, value]: [string, any]) =>
                        <Badge variant={'secondary'} className={'p-2'} key={tag}>
                            {typeof value === 'boolean' ? tag : `${tag}: ${value}/10`}
                        </Badge>
                    )}
                </div>
                <h3 className={'text-lg font-bold mt-6'}>Kierunki</h3>
                <div className={'flex flex-wrap gap-1 mt-2'}>
                    {fields.map(x =>
                        <Badge title={x} variant={'secondary'}
                               className={'p-2 whitespace-nowrap max-w-[250px] overflow-hidden truncate'}
                               key={x}>
                            {x}
                        </Badge>
                    )}
                </div>
                <div
                    className="w-full h-[20rem] py-5"
                >
                    <ReactStreetview
                        apiKey={"AIzaSyDOsTKlBP4R0isFK6ucap0vYvoYYUecgD0"}
                        streetViewPanoramaOptions={{
                            position: { lat: focused.latitude, lng: focused.longitude },
                            pov: { heading: 100, pitch: 0 },
                            zoom: 1,
                            addressControl: false,
                            showRoadLabels: false,
                            zoomControl: false
                        }}
                    />
                </div>
                <div>
                    <p className="rating">
                        <div className="flex mb-2">
                            {starRatings}
                        </div>
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                        na bazie {university.comments?.length || randomPeopleCount} opinii
                    </p>
                </div>
                <div className="comments">
                    <h1>Komentarze</h1>
                    {randomComments.map((comment, index) => (
                        <div key={index} className="flex flex-col py-4 pr-4">
                            {/* Assuming UserCircle is a component that renders a user icon */}
                            <div className={'flex gap-x-1 items-center'}>
                                <UserCircle className={'w-4 h-4'} />
                                <p className={''}>{comment.name}</p>
                            </div>
                            <p className="text-[14px] text-muted-foreground">{comment.review}</p>
                        </div>
                    ))}
                </div>
                <div className="fields">
                    {university.fieldsOfStudy?.map(x => field(x))}
                </div>
            </div>
        </ScrollArea>
    );
}

export default University;