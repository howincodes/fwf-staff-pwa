import React, { useMemo, ReactNode } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import HowinMapsContext from "./howin-maps-context";
import { getPlacePredictions, geocodeLatLng, geocodePlaceId } from "../services";

interface HowinMapsProviderProps {
    children: ReactNode;
}

const HowinMapsProvider: React.FC<HowinMapsProviderProps> = ({ children }) => {
    const map = useMap();
    const geocodeLib = useMapsLibrary("geocoding");
    const placesLib = useMapsLibrary("places");

    const howinMapsFunctions = useMemo(
        () => ({
            getPlacePredictions: (input: string, locationBias?: google.maps.LatLng) =>
                getPlacePredictions(input, locationBias, placesLib, map),
            geocodeLatLng: (latLng: google.maps.LatLng) => geocodeLatLng(latLng, geocodeLib),
            geocodePlaceId: (placeId: string) => geocodePlaceId(placeId, geocodeLib),
            map,
        }),
        [geocodeLib, placesLib, map]
    );

    return <HowinMapsContext.Provider value={howinMapsFunctions}>{children}</HowinMapsContext.Provider>;
};

export default HowinMapsProvider;
