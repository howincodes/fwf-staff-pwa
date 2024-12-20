import { ChevronLeft, MapPinned, RefreshCcw } from "lucide-react";
import img from "@/assets/img.webp";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHowinMaps } from "@/modules/howin-maps";

const PunchPage = () => {
  const location=useLocation()
  const attendanceImg=location.state.attendanceImg
  const [refetch, setRefetch] = useState(false);
  const { geocodeLatLng } = useHowinMaps();
  const [formattedAddress, setFormattedAddress] = useState("");

  const [position, setPosition] = useState({ lat: 10.9760, lng:  76.2254 });

  const navigate = useNavigate();

  useEffect (() => {
    const latLng = { lat: 10.9760, lng:  76.2254 }; 
    geocodeLatLng(latLng)
      .then((results) => {
                if (results.length > 0) {
                    const address = results[0];
                    setFormattedAddress(address.formatted_address);
                    console.log(formattedAddress)
                } else {
                    setFormattedAddress("");
                }
            })

            
      .catch((error) => {
        console.error('Geocode failed:', error);
      });
  })

useEffect(() => {
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {  
    
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lng: longitude });
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
  
      });
    }
  }
  handleCurrentLocation();

  console.log("latlng",position.lat,position.lng)
}, []);
  


const handleGeo = () => {
  const latLng = { lat: position.lat, lng:  position.lng }; 
  geocodeLatLng(latLng)
    .then((results) => {
              if (results.length > 0) {
                  const address = results[0];
                  setFormattedAddress(address.formatted_address);
                  console.log(formattedAddress)
              } else {
                  setFormattedAddress("");
              }
          })

          
    .catch((error) => {
      console.error('Geocode failed:', error);
    });
};
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
        <div className="flex mt-1 items-center gap-2 text-sm bg-zinc-800 px-2 py-2 rounded-sm">
          <MapPinned className="h-4 w-4 dark:text-black text-white " />
          <h1 className="w-[70vw] truncate text-white ">
            {/* Ooty road ,valiyangadi, Perinthalmanna, Manjeri */}
            {/* {formattedAddress} */}
            {position.lat}
          </h1>
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
          <Button className="bg-yellow-500 w-full py-3 rounded-lg">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PunchPage;
