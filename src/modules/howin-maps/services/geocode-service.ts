export const geocodeLatLng = (
    latLng:  google.maps.LatLng | google.maps.LatLngLiteral ,
    geocodeLib: google.maps.GeocodingLibrary | null
): Promise<google.maps.GeocoderResult[]> => {
    return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        if (!geocodeLib) return reject("Geocoding library is not loaded.");

        const geocoder = new geocodeLib.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results) {
                resolve(results);
            } else {
                reject(`Geocoding failed due to: ${status}`);
            }
        });
    });
};

  
export const geocodePlaceId = (
    placeId: string,
    geocodeLib: google.maps.GeocodingLibrary | null
): Promise<google.maps.GeocoderResult[]> => {
    console.log(placeId);
    return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        if (!geocodeLib) return reject("Geocoding library is not loaded.");

        const geocoder = new geocodeLib.Geocoder();
        geocoder.geocode({ placeId }, (results, status) => {
            if (status === "OK" && results) { // Ensure results is not null
                resolve(results);
            } else {
                reject(`Geocoding with placeId failed due to: ${status}`);
            }
        });
    });
};

  