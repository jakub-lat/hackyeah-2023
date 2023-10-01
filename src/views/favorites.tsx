import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";
import UniCard from "@/components/universities/uni-card";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase.ts";
import {useEffect} from "react";
import {IUniversity, useUniStore} from "@/store/universityStore.ts";
import universities from "@/data/universities.json";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";

export default function Favorites() {
    const {favorites, getFavorites} = useUniStore();
    const [user] = useAuthState(auth);
    useEffect(() => {
        getFavorites();
    }, [user])

    const selectedUniversities: IUniversity[] = Array.from(new Set(universities.filter(x => favorites?.includes(x.name))));

    const navigate = useNavigate();
    return <PageLayout className={"px-64"}>
        <PageTitle className={"mt-4 mb-4"}>Ulubione uczelnie/kierunki</PageTitle>

        {selectedUniversities.length === 0 && <Alert className={'h-min w-[450px] border-red-600 border-opacity-50 bg-red-600/10'}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Uwaga!</AlertTitle>
                <AlertDescription>
                    Nie dodałeś jeszcze żadnych uczelni ani kierunków do Ulubionych.
                </AlertDescription>
            </Alert>}

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