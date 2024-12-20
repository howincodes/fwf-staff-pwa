import { useContext } from "react";
import HowinMapsContext, { HowinMapsContextType } from "../context/howin-maps-context";

const useHowinMaps = (): HowinMapsContextType => { // Explicit return type annotation
  const context = useContext(HowinMapsContext);
  if (!context) {
    throw new Error("useHowinMaps must be used within a HowinMapsProvider");
  }
  return context;
};

export default useHowinMaps;
