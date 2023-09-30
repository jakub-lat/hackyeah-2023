import { useEffect, useRef, useState } from "react";
import * as maptilersdk from '@maptiler/sdk';
import { MapStyle, Map as MapType } from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useTheme } from "../theme-provider";
import classnames from "classnames";
import { renderToString } from "react-dom/server";
import { Badge } from "@/components/ui/badge"
import Uni from "../icons/uni";

maptilersdk.config.apiKey = '8vtPQGKtYjWQNz9P9exA';

type Marker = {
    lng: number;
    lat: number;
    badge: string;
    Icon?: any;
    onClick?: () => void;
}

type Props = {
    className?: string;
    markers: Marker[];
}

const Map = ({ className, markers }: Props) => {
    const { theme } = useTheme()

    const mapContainer = useRef(null);
    const [map, setMap] = useState<MapType | null>(null);
    const [showBadge, setShowBadge] = useState(false);
    const [markersState, setMarkersState] = useState([])

    const createMarker = ({ badge, Icon, onClick }: Marker) => {
        const marker = document.createElement("div");
        marker.onclick = onClick

        marker.innerHTML = renderToString(
            <Badge>
                <div className={classnames(
                    "w-6 h-6 custom-icon",
                    !Icon && `custom-icon-${theme}`
                )}>
                    {Icon ? <Icon /> : <Uni />}
                </div>
                {showBadge && <span className="pl-2">{badge}</span>}
            </Badge>
        )

        return marker
    }

    useEffect(() => {
        setMap(new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [19.4630064, 52.0682513],
            zoom: 5.5,
        }));
    }, []);

    useEffect(() => {
        if (map)
            map.setStyle(theme === "dark" ?
                MapStyle.STREETS.DARK :
                MapStyle.STREETS.PASTEL);
    }, [theme, map])

    useEffect(() => {
        if (map) {
            markersState.forEach(marker => marker.remove())
            setMarkersState(markers.map(marker => {
                return new maptilersdk.Marker({
                    element: createMarker(marker),
                }).setLngLat([marker.lng, marker.lat]).addTo(map);
            }));
        }
    }, [markers, map, showBadge, theme])

    useEffect(() => {
        if (map)
            map.on('zoom', () => {
                setShowBadge(map.getZoom() > 6)
            })
    }, [map])

    return (
        <div className={classnames(
            "w-full relative h-full min-h-[40rem] rounded-md overflow-hidden",
            className
        )}>
            <div ref={mapContainer} className="absolute w-full h-full min-h-[40rem]" />
        </div>
    );
}

export default Map;
