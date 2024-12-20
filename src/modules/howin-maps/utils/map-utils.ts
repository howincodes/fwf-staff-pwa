


export const getPreferredAddressTitle = (addressComponents : google.maps.GeocoderAddressComponent[]) => {
    const preferredTypes = [
      "sublocality",
      "locality",
      "administrative_area_level_4",
      "administrative_area_level_3",
      "administrative_area_level_2",
      "administrative_area_level_1",
      "route",
      "political",
    ];
  
    for (const type of preferredTypes) {
      const component = addressComponents.find((comp) =>
        comp.types.includes(type)
      );
      if (component) {
        return component.long_name;
      }
    }
  
    return addressComponents[0]?.long_name || "Unknown";
  };


export const getAddressFirstSplit = (address: string): string => {
  const splitRegex = /,| - /;
  return address.split(splitRegex)[0];
}
export const getAddressWithoutFirstSplit = (address: string): string | null => {
  const splitRegex = /,| - /;
  try {
    return address.split(splitRegex).slice(1).join(",");
  } catch (error) {
    console.error("Error while splitting address", error);
    return null;
  }
}

