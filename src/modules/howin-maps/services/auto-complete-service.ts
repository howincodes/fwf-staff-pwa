export const getPlacePredictions = (
    input: string,
    locationBias: google.maps.LatLng | undefined,
    placesLib: google.maps.PlacesLibrary | null,
    map?:  google.maps.Map | null
  ) => {
    return new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
      if (!placesLib) return reject("Places library is not loaded.");
  
      const autoCompleteService = new placesLib.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input, locationBias: locationBias || map?.getCenter() },
        (predictions, status) => {
          if (status === "OK" && predictions) {
            resolve(predictions);
          } else {
            reject(`Autocomplete failed due to: ${status}`);
          }
        }
      );
    });
  };
  