import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";
import Map from "@/components/ui/map.tsx";

export default function Universities() {
    return <PageLayout>
        <PageTitle>Uczelnie</PageTitle>
        <Map markers={[
            {
                lat: 52.229676,
                lng: 21.012229,
                badge: "Testowa uczelnia", 
            },
            {
                lat: 54.229676,
                lng: 18.012229,
                badge: "Inna uczelnia", 
            },
        ]}/>
    </PageLayout>
}