import { ChevronLeft, MapPinned, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHowinMaps } from "@/modules/howin-maps";
import AddressLoading from "./components/addrees-loading";
import { requestLocationPermission } from "@/utils/location-permission-utils";

type Position = { lat: number; lng: number } | null;

const PunchPage = () => {
  const location=useLocation()
  const attendanceImg=location.state.attendanceImg
  const [refetch, setRefetch] = useState(false);
  const { geocodeLatLng } = useHowinMaps();
  const [formattedAddress, setFormattedAddress] = useState("");
  const [isLocLoading, setIsLocLoading] = useState(false);
  const [position, setPosition] = useState<Position>(null);

  const navigate = useNavigate();

useEffect(() => {
  const handleCurrentLocation = () => {
    requestLocationPermission();
    if (navigator.geolocation) {  
      alert("Geolocation is supported by your browser");
      setIsLocLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        alert("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lng: longitude });
        setIsLocLoading(false);
      });
    }

  }
  handleCurrentLocation();

}, []);
  
const handleGeo = () => {
  if (position) {
    geocodeLatLng(position) // Only call if position is not null
      .then((results) => {
        if (results.length > 0) {
          const address = results[0];
          setFormattedAddress(address.formatted_address);
          console.log("Formatted Address:", address.formatted_address);
        } else {
          setFormattedAddress("No address found.");
        }
      })
      .catch((error) => {
        console.error("Geocode failed:", error);
        setFormattedAddress("Error fetching address.");
      });
  }
};


useEffect(() => {
  handleGeo();
}, [position]);
const handleSubmit = () => {
  navigate("/");
}
  return (
    <div>
      <div className="p-3 shadow-sm">
        <ChevronLeft onClick={() => navigate("/")} />
      </div>
      <div className="h-[65vh] object-cover">
      {attendanceImg ? (
          <img
            src={URL.createObjectURL(attendanceImg)}
            alt="Attendance"
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}
      </div>
      <div className="rounded-t-lg dark:bg-black  p-5 max-h-[60vh] overflow-y-auto">
        <h1 className="dark:text-white text-black "> Punched out</h1>
        <h2 className="text-gray-500 text-sm"> 16 Dec, Mon | 10:00 AM</h2>
        <div className="flex mt-1 items-center justify-between gap-2 text-sm bg-zinc-800 px-2 py-2 rounded-sm w-full">
          <MapPinned className="h-4 w-4 dark:text-white text-black " />
         { isLocLoading? <div className="flex justify-center items-center"><AddressLoading/></div> : <h1 className={`w-[70vw] truncate text-white `}>
            {formattedAddress}
 
          </h1>}
          <RefreshCcw
            className={`h-4 w-4 text-white ${
              refetch ? "animate-spin duration-1000" : ""
            } `}
            onClick={() => {
              setRefetch(true);
              setTimeout(() => setRefetch(false), 1000);
              handleGeo();
            }}
          />
        </div>
        <div className="fixed bottom-4 w-full px-6 left-0 right-0 flex justify-center">
          <Button className="bg-yellow-500 w-full py-3 rounded-lg" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PunchPage;
