import { useEffect, useRef } from "react";
import ModeToggle from "@/components/mode-toggle";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  LogOut,
  MessageCircleWarning,
  Settings,
} from "lucide-react";
import Logo from "@/assets/logo.svg";

import { useNavigate } from "react-router-dom";
import { requestLocationPermission } from "@/utils/location-permission-utils";

import { requestCameraPermission } from "@/utils/camera-permission-utils";
import { useGetDayByDayAttendanceQuery } from "@/store/api/staffAttendanceApi";
import { useLazyGetUserDataQuery } from "@/store/api/authApi";
import { AllAttendance } from "@/types/staff-attendace-types";
import AttendanceCard from "./components/attandance-card";

const HomePage = () => {
  const [getUserData, userDataResp] = useLazyGetUserDataQuery();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getUserData();
  }, []);

  const isPunchedInToday = userDataResp?.data?.user?.is_punched_in_today;
  const isPunchedOutToday = userDataResp?.data?.user?.is_punched_out_today;

  const { data} = useGetDayByDayAttendanceQuery({ month: '2024-12' });

 
  

  const handlePunchInPunchOut = () => {
    requestCameraPermission();
    requestLocationPermission();
  
    // If user hasn't punched in today, show Punch In button (trigger the file input click)
    if (!isPunchedInToday) {
      fileInputRef.current?.click();
    }
    // If user has punched in but hasn't punched out, show Punch Out button (trigger the file input click)
    else if (isPunchedInToday && !isPunchedOutToday) {
      fileInputRef.current?.click();
    }
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    navigate("/punch-page", { state: { attendanceImg: file } });
    console.log(file);
  };

  return (
    <div className="relative min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <ModeToggle />
      <div className="flex items-center justify-between p-5 shadow-md">
        <div className="flex items-center gap-2">
          <img src={Logo} />
        </div>
        <div className="flex items-center gap-4">
          <Settings className="w-6 h-6 text-[#FED272]" />
          <a
            href="https://wa.me/919538666000"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <MessageCircleWarning className="w-6 h-6 text-[#FED272]" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800">
        <ChevronLeft className="w-6 h-6 text-[#FED272]" />
        <h2 className="text-xl ">Dec 2024</h2>
        <ChevronRight className="w-6 h-6 text-[#FED272]" />
      </div>

      <hr className="border-zinc-300 dark:border-zinc-700" />
      <div className="grid grid-cols-3 gap-2 px-4 py-4 bg-white dark:bg-zinc-800">
        <Card className="p-3">
          <div className="text-gray-500">Present</div>
          <div className="text-lg">10 (+2)</div>
        </Card>
        <Card className="p-3">
          <div className="text-gray-500">Absent</div>
          <div className="text-lg">0</div>
        </Card>
        <Card className="p-3">
          <div className="text-gray-500">Half Days</div>
          <div className="text-lg">0</div>
        </Card>
        <Card className="p-3">
          <div className="text-gray-500">Leave</div>
          <div className="flex items-center gap-2">
            <div className="text-lg">4</div>
            <ChevronDown />
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-gray-500">Overtime</div>
          <div className="text-lg">00:00</div>
        </Card>
        <Card className="p-3">
          <div className="text-gray-500">Less Hours</div>
          <div className="text-lg">03:38</div>
        </Card>
      </div>

      <div className="flex flex-col items-center justify-center p-4 mt-5 mb-8 bg-white dark:bg-zinc-800">
        <Briefcase className="w-6 h-6 text-[#FED272]" />
        <div className="text-lg mt-2">Manage Leaves</div>
      </div>

      <div className="space-y-6 py-6 px-3 dark:bg-zinc-800 bg-white h-screen">
      {data?.attendance?.length ? (
        data.attendance.map((attendance: AllAttendance, index: number) => (
          <AttendanceCard key={index} attendance={attendance} />
        ))
      ) : (
        <div className="text-center text-lg text-zinc-500">No attendance record found</div>
      )}
    </div>

      <div>
        <input
          ref={fileInputRef} // Link to the ref
          type="file"
          accept="image/*" // Allow only image capture from the camera
          capture="user" // Forcing the camera to be used
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the input element
        />

        <div className="fixed bottom-20 flex w-full gap-4 p-4">
          {!isPunchedInToday && !isPunchedOutToday ? (
            <div
              className="flex justify-center items-center w-full"
              onClick={handlePunchInPunchOut}
            >

              <div className="flex justify-center items-center gap-2 px-4 w-full py-3 dark:bg-zinc-900 p-3 rounded-2xl border border-input cursor-pointer">
                <Coffee className="w-5 h-5" />
                <h1 className="text-lg">Punch In</h1>
              </div>
            </div>
          ) : isPunchedInToday && !isPunchedOutToday ? (
            <div
              className="flex justify-center items-center w-full"
              onClick={handlePunchInPunchOut}
            >

              <div className="flex justify-center items-center gap-2 bg-[#FED272] px-4 w-full py-3 rounded-2xl cursor-pointer">
                <LogOut className="w-5 h-5 text-black" />
                <h1 className="text-lg text-black">Punch Out</h1>
              </div>
            </div>
          ) : null}
        </div> 


      </div>
    </div>
  );
};

export default HomePage;
