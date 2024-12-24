import { RootState } from '@/store';
import { updateCurrentLocation } from '@/store/slice/locationSlice';
import React, { createContext,useEffect, useContext, ReactNode } from 'react';
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

// CoreProvider Component
export const CoreProvider: React.FC<CoreProviderProps> = ({ children }) => {

    const dispatch = useDispatch();
    const locationState = useSelector((state: RootState) => state.location);
    const location = {
        latitude: locationState.latitude,
        longitude: locationState.longitude
    }
    

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const { data } = event;
        const parsedData = JSON.parse(data);
        alert("Message received:");
        alert(parsedData.type)
        if (parsedData.type === 'SET_LOCATION') {
          const { latitude, longitude } = parsedData.payload;
            dispatch(updateCurrentLocation({ latitude, longitude }))
            alert("Latitude: " + latitude + "Longitude: " + longitude);
          console.log('Location updated:', { latitude, longitude });
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };
    

    // Add event listener for WebView messages
    window.addEventListener('message', handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <CoreContext.Provider value={{ location}}>
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
