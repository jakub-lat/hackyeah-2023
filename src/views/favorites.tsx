import PageLayout from "@/layouts/PageLayout.tsx";
import UniMock from "@/mock/universities";
import UniCard from "@/components/universities/uni-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Filters from "@/components/filters.tsx";

export default function Favorites() {
    return <PageLayout>
        <Filters />
        <div className="flex flex-col lg:flex-row gap-5">
            <ScrollArea className="lg:w-[100%] max-h-[80vh]">
                <div className="flex flex-col gap-3">
                    {UniMock.map((uni, i) =>
                        <UniCard
                            key={i}
                            header={uni.name}
                            description={`${uni.city}, kierunek: ${uni.major}`}
                            icon={uni.icon}
                        />
                    )}
                </div>
            </ScrollArea>
        </div>
    </PageLayout>
}