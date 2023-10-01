import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";
import UniMock from "@/mock/universities";
import UniCard from "@/components/universities/uni-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {createSearchParams, useNavigate} from "react-router-dom";
// import Filters from "@/components/filters.tsx";

export default function Favorites() {
    const navigate = useNavigate();
    return <PageLayout className={"px-64"}>
        <PageTitle className={"mt-4"}>Ulubione uczelnie/kierunki</PageTitle>
        {/*<Filters />*/}
        <div className="flex flex-col lg:flex-row gap-5 mt-4">
            <ScrollArea className="lg:w-[100%] max-h-[80vh]">
                <div className="flex flex-col gap-3">
                    {UniMock.map((uni, i) =>
                        <UniCard
                            key={i}
                            header={uni.name}
                            description={`${uni.city}, kierunek: ${uni.major}`}
                            icon={uni.icon}
                            onClick={() => {
                                navigate({
                                    pathname: '/universities',
                                    search: createSearchParams({
                                        id: uni.name
                                    }).toString()
                                });
                            }}
                        />
                    )}
                </div>
            </ScrollArea>
        </div>
    </PageLayout>
}