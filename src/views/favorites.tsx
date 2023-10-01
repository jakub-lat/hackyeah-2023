import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";
import UniCard from "@/components/universities/uni-card";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase.ts";
import {useEffect} from "react";
import {IUniversity, useUniStore} from "@/store/universityStore.ts";
import universities from "@/data/universities.json";

export default function Favorites() {
    const {favorites, getFavorites} = useUniStore();
    const [user] = useAuthState(auth);
    useEffect(() => {
        getFavorites();
    }, [user])

    const selectedUniversities: IUniversity[] = Array.from(new Set(universities.filter(x => favorites?.includes(x.name))));

    const navigate = useNavigate();
    return <PageLayout className={"px-64"}>
        <PageTitle className={"mt-4"}>Ulubione uczelnie/kierunki</PageTitle>
        {/*<Filters />*/}
        <div className="flex flex-col lg:flex-row gap-5 mt-4">
            <div className="flex flex-col gap-3 w-full">
                {selectedUniversities?.map((uni, i) =>
                    <UniCard
                        key={i}
                        uni={uni}
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
        </div>
    </PageLayout>
}