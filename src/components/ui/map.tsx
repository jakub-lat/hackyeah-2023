import { useEffect, useRef, useState } from "react";
import * as maptilersdk from '@maptiler/sdk';
import { MapStyle } from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css";

type Props = {
    dark?: boolean;
}

const Map = ({ dark }: Props) => {
    const mapContainer = useRef(null);
    const pos = { lng: 19.4630064, lat: 52.0682513 };
    const [zoom] = useState(5.5);
    maptilersdk.config.apiKey = '8vtPQGKtYjWQNz9P9exA';


    useEffect(() => {
        const map = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [pos.lng, pos.lat],
            zoom: zoom,
        });

        map.setStyle(dark ? MapStyle.STREETS.DARK : MapStyle.STREETS.PASTEL);

    }, [pos.lng, pos.lat, zoom, dark]);

    return (
        <div className="w-full relative h-[40rem]">
            <div ref={mapContainer} className="absolute w-full h-full" />
        </div>
    );
}

export default Map;
