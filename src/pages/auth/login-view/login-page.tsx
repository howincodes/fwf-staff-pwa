import AuthGirl from "@/assets/auth/authGirl.png";
import Logo from "@/assets/logo.svg";
// import { FaApple, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// import { useSendOtpMutation } from "@/store/slices/auth/authApi";
// import { errorToast, isRtl, normalizePhone } from "@/utils/common-utils";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentPhone } from "@/store/slices/auth/authSlice";
// import { Loader2 } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import {triggerNotificationHaptic,triggerSelectionHaptic} from "@/utils/haptic-utils";
// import {clearPersonalInfo,setPIName,} from "@/store/slices/auth/personalInfoSlice";
import { useState } from "react";
// import { toast } from "@/components/ui/use-toast";
// import { useGetLanguagesQuery } from "@/store/slices/languages/languagesApi";
// import i18n from "@/i18n";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ModeToggle from "@/components/mode-toggle";
import { useSendOtpMutation } from "@/store/api/authApi";
// import { errorToast } from "@/utils/common-utils";
// import { isRtl } from "@/utils/common-utils";

const LoginView = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sendOtp] = useSendOtpMutation();
  const navigate = useNavigate();



  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      console.error("Phone number is required.");
      return;
    }

    try {
      const response = await sendOtp({
        phone: phoneNumber,
      }).unwrap();
      console.log("OTP Sent Successfully:", response);
    } catch (error) {
      console.error("Error Sending OTP:", error);
    }
    navigate("/otp", { state: { phone: phoneNumber } });
  };




  return (
    <div className=" flex flex-col p-4 max-h-screen">
      <div className="flex justify-end mb-3">
        <ModeToggle />
      </div>
      <div className="flex justify-center relative bg-zinc-900 rounded-3xl ">
        <img
          src={AuthGirl}
          className="object-cover w-full h-[65vh] rounded-3xl"
        />

        <div className="left-8  absolute top-6 ">
          <img src={Logo} />
        </div>

        <div className="absolute bottom-8 left-8">
          <p className="font-thin text-4xl  text-white"> {"Welcome To"}</p>
          <p className="font-bold text-4xl text-white">Fit With Fazna</p>
        </div>
      </div>
      <form id="login-form">
        <div className="my-4">
          <div className="flex gap-2 items-center">
            {" "}
            <Button
              variant={"outline"}
              className="mt-2 h-[7vh] text-input-foreground text-md rounded-2xl px-5"
            >
              🇮🇳{" "}
              <span>
                <ChevronDown />
              </span>
            </Button>
            <Input
              type="number"
              value={phoneNumber}
              placeholder={"Enter Your Mobile Number"}
              className="mt-2 h-[7vh] text-input-foreground bg-input text-md rounded-2xl px-2"
              inputMode="numeric"
              onChange={(e) => {
                setPhoneNumber(e.target.value.slice(0, 10));
              }}
            />
          </div>
        </div>

        <div className="flex w-full items-center">
          <Button
            form="login-form"
            type="submit"
            className={`bg-primary gap-2 font-semibold text-primary-foreground text-lg w-full py-7 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out `}
            onClick={handleSendOtp}
          >
            <>
              {"Login"}
            </>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
