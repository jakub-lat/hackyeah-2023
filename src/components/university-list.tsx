import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import UniMock from "@/mock/universities.ts";
import UniCard from "@/components/universities/uni-card.tsx";
import {useUniStore} from "@/store/universityStore.ts";

export default function UniversityList() {
    const {setFocused} = useUniStore();

    return <ScrollArea className="lg:w-[35%] max-h-[80vh]">
        <div className="flex flex-col gap-3">
            {UniMock.map((uni, i) =>
                <UniCard
                    key={i}
                    header={uni.name}
                    description={`${uni.city}, kierunek: ${uni.major}`}
                    icon={uni.icon}
                    onClick={() => {
                        setFocused(uni);
                    }}
                />
            )}
        </div>
    </ScrollArea>;
}