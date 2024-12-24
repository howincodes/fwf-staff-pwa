
import { createSlice } from "@reduxjs/toolkit";


export type LocationSliceState = {
        latitude?: number | null
        longitude?: number | null
        lastUpdatedAt?: number |null

}


export const locationInitialState: LocationSliceState = {
  latitude:null,
  longitude:null,
  lastUpdatedAt:null
};

  const locationSlice = createSlice({
  name: "location",
  initialState: locationInitialState,
  reducers: {
    updateCurrentLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.lastUpdatedAt = Date.now();
    }
  },
});

export const {  updateCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
