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
    icon?: string;
    onClick?: () => void;
}

type Props = {
    className?: string;
    focus?: {
        lat: number;
        lng: number;
    } | null;
    markers: Marker[];
}

const Map = ({ className, focus, markers }: Props) => {
    const { theme } = useTheme()

    const mapContainer = useRef(null);
    const [map, setMap] = useState<MapType | null>(null);
    const [showBadge, setShowBadge] = useState(false);
    const [markersState, setMarkersState] = useState([])

    const createMarker = ({ badge, icon, onClick }: Marker) => {
        const marker = document.createElement("div");
        marker.onclick = onClick

        marker.innerHTML = renderToString(
            <Badge className="group p-2">
                <div className={classnames(
                    "w-5 h-5 custom-icon relative",
                    !icon && `custom-icon-${theme}`
                )}>
                    {icon ? <img src={icon} /> : <Uni />}
                </div>
                {showBadge && <span className="pl-2">{badge}</span>}

                {showBadge && (
                    <div className={classnames(
                        "absolute group-hover:opacity-75 transition-all duration-200 -bottom-[13px] left-1/2",
                        "transform -translate-x-1/2 w-0 h-0 border-solid border-transparent border-b-4 border-l-[10px]",
                        "border-l-transparent border-t-[10px] border-r-[10px] border-r-transparent",
                        theme === "dark" ? "border-t-white" : "border-t-black"
                    )}></div>
                )}
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

    useEffect(() => {
        if (map) {
            if (focus) {
                map.flyTo({
                    center: [focus.lng, focus.lat],
                    zoom: 10,
                    essential: true,
                    speed: 2,
                    curve: 1,
                });
            } else {
                map.flyTo({
                    center: [19.4630064, 52.0682513],
                    zoom: 5.5,
                    essential: true,
                });
            }
        }
    }, [focus])

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
