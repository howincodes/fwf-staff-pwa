import { ChevronLeft, Loader2, MapPinned, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHowinMaps } from "@/modules/howin-maps";
import { requestLocationPermission } from "@/utils/location-permission-utils";
import {  usePunchInMutation, usePunchOutMutation } from "@/store/api/staffAttendanceApi";
import { useLazyGetUserDataQuery } from "@/store/api/authApi";
import { successToast } from "@/utils/common-utils";


type Position = { lat: number; lng: number } | null;

const PunchPage = () => {
  const location=useLocation()
  const attendanceImg=location.state.attendanceImg
  const [refetch, setRefetch] = useState(false);
  const { geocodeLatLng } = useHowinMaps();
  const [formattedAddress, setFormattedAddress] = useState("");
  const [isLocLoading, setIsLocLoading] = useState(false);
  const [position, setPosition] = useState<Position>(null);
  const [getUserData,userDataResp] = useLazyGetUserDataQuery();

  const navigate = useNavigate();

  const [punchInData,{isLoading}]=usePunchInMutation();
  const [punchOutData,{isLoading:isPunchOutLoading}]=usePunchOutMutation();

  const isPunchedInToday = userDataResp?.data?.user?.is_punched_in_today;
  const isPunchedOutToday = userDataResp?.data?.user?.is_punched_out_today;

  
  const handleSubmit = async () => {
    try {
      if (!isPunchedInToday) {
        await punchInData({
          image: attendanceImg,
          latitude: position?.lat.toString(),
          longitude: position?.lng.toString(),
          address: formattedAddress,
        }).unwrap();
        await getUserData().unwrap();
        navigate("/");
        successToast("Punched In Successfully");
        return;
      }
      if (isPunchedInToday && !isPunchedOutToday) {
        await punchOutData({
          image: attendanceImg,
          latitude: position?.lat.toString(),
          longitude: position?.lng.toString(),
          address: formattedAddress,
        }).unwrap();
        
        await getUserData().unwrap();

        navigate("/");
        successToast("Punched Out Successfully");
      }
    } catch (error) {
      console.error("Error in punching process:", error);
    }
  };
  


useEffect(() => {
  const handleCurrentLocation = () => {
    requestLocationPermission();
    if (navigator.geolocation) {  
      setIsLocLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
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



useEffect(() => {
  getUserData()
},[getUserData])

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
        <h2 className="text-gray-500 text-sm">{new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date())}</h2>
        <div className="flex mt-1 items-center justify-between gap-2 text-sm bg-zinc-800 px-2 py-2 rounded-sm w-full">
          <MapPinned className="h-4 w-4 dark:text-white text-black " />
         { isLocLoading? <div className="flex justify-center items-center"> <Loader2 className="animate-spin text-white"/>  </div> : <h1 className={`w-[70vw] truncate text-white `}>
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
          <Button
            className={`bg-yellow-500 w-full py-3 rounded-lg ${
              isLocLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={isLocLoading}
          >
            {isLoading || isPunchOutLoading ? <Loader2 className="animate-spin text-white" /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PunchPage;
