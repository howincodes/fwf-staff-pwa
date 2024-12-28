import { useHowinMaps } from '@/modules/howin-maps';

import { RootState } from '@/store';
import { useTrackLocMutation } from '@/store/api/staffLocApi';
import { updateCurrentLocation } from '@/store/slice/locationSlice';
import React, { createContext,useEffect, useContext, ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Define the shape of the location data
interface Location {
  latitude?: number | null;
  longitude?: number | null;
}

// Define the context value
interface CoreContextType {
  location: Location | null;
}

// Create the Context with a default value
const CoreContext = createContext<CoreContextType | undefined>(undefined);

// Provider Props
interface CoreProviderProps {
  children: ReactNode;
}

type Position = { lat: number; lng: number } | null;

// CoreProvider Component
export const CoreProvider: React.FC<CoreProviderProps> = ({ children }) => {

    const dispatch = useDispatch();
    const locationState = useSelector((state: RootState) => state.location);
    const location = {
        latitude: locationState.latitude,
        longitude: locationState.longitude
    }

    const { geocodeLatLng } = useHowinMaps();
    const [position, setPosition] = useState<Position>(null);
    const [liveLocData]=useTrackLocMutation();

    // useEffect(() => {
    //   const handleMessage = (event: MessageEvent) => {
    //     try {
    //       const { data } = event;
    //       console.log("Received data:", data);
    
    //       // Check if `data` is a string and attempt to parse it
    //       if (typeof data === 'string') {
    //         const parsedData = JSON.parse(data);
    
    //         alert("Message received:");
    //         alert(parsedData.type);
    
    //         if (parsedData.type === 'SET_LOCATION') {
    //           const { latitude, longitude } = parsedData.payload;
    //           dispatch(updateCurrentLocation({ latitude, longitude }));
    //           alert("Latitude: " + latitude + " Longitude: " + longitude);
    //           console.log('Location updated:', { latitude, longitude });
    //         }
    //       } else if (typeof data === 'object' && data !== null) {
    //         // If `data` is already an object
    //         alert("Message received (object):");
    //         alert(data.type);
    
    //         if (data.type === 'SET_LOCATION') {
    //           const { latitude, longitude } = data.payload;
    //           dispatch(updateCurrentLocation({ latitude, longitude }));
    //           alert("Latitude: " + latitude + " Longitude: " + longitude);
    //           console.log('Location updated:', { latitude, longitude });
    //         }
    //       } else {
    //         console.warn('Unhandled message type:', typeof data);
    //       }
    //     } catch (error) {
    //       console.error('Error handling message:', error);
    //     }
    //   };
    
    //   // Add event listener for WebView messages
    //   window.addEventListener('message', handleMessage);
    
    //   // Cleanup event listener on component unmount
    //   return () => {
    //     window.removeEventListener('message', handleMessage);
    //   };
    // }, []);
    

  

useEffect(() => {
  const FetchCurrentLocation = () => {
    // requestLocationPermission();
    if (navigator.geolocation) {  
      // setIsLocLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lng: longitude });
        // setIsLocLoading(false);
      });
    }
  }
  FetchCurrentLocation();
}, []);
  



const handleGeo = () => {
  if (position) {
    geocodeLatLng(position) // Only call if position is not null
      .then((results) => {
        if (results.length > 0) {
          const address = results[0];
          // setFormattedAddress(address.formatted_address);
          const formatted_address = address.formatted_address.toString();
          console.log("Formatted Address:", address.formatted_address);
           // Dispatch the location update to Redux
           dispatch(updateCurrentLocation({ latitude: position.lat, longitude: position.lng }));

           // Send the data to mutation (API call)
           liveLocData({
             latitude: position.lat,
             longitude: position.lng,
             address: formatted_address
           });
        } else {
          // setFormattedAddress("No address found.");
        }
      })
      .catch((error) => {
        console.error("Geocode failed:", error);
        // setFormattedAddress("Error fetching address.");
      });
  }
};



useEffect(()  => {
  handleGeo();
}, [position]);

useEffect(() => {
  const interval = setInterval(() => {
    if (position) {
      handleGeo();
    }
  }, 50000); 

  return () => {
    clearInterval(interval);
  };
}, [position]);

  return (
    <CoreContext.Provider value={{location}}>
      {children}
    </CoreContext.Provider>
  );
};

// Custom Hook to Use Core Context
export const useCoreContext = (): CoreContextType => {
  const context = useContext(CoreContext);
  if (!context) {
    throw new Error('useCore must be used within a CoreProvider');
  }
  return context;
};
