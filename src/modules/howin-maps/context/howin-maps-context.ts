import { createContext } from "react";

export interface HowinMapsContextType { // Explicit export of the type
  getPlacePredictions: (input: string, locationBias?: google.maps.LatLng) => Promise<google.maps.places.AutocompletePrediction[]>;
  geocodeLatLng: (latLng:  google.maps.LatLng | google.maps.LatLngLiteral ) => Promise<google.maps.GeocoderResult[]>;
  geocodePlaceId: (placeId: string) => Promise<google.maps.GeocoderResult[]>;
  map?: google.maps.Map | null;
}

const HowinMapsContext = createContext<HowinMapsContextType | null>(null);
export default HowinMapsContext;
