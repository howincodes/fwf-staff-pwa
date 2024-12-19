// import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp";
  import { ChevronLeft } from "lucide-react";
  import {  useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const OTPView = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    return (
      <div className="p-6">
        <div className="flex justify-between mt-14">
          <button
            onClick={() => navigate(-1)}
            className="border-0 rounded-xl  bg-zinc-100 dark:bg-zinc-800 p-2"
          >
            <ChevronLeft className="h-9 w-9 " />
          </button>
          {/* <ModeToggle /> */}
        </div>
        <h1 className="mt-14 text-2xl font-semibold">{("OTP Verification")}</h1>
        <p className="flex flex-col pt-2 text-sm text-gray-400">
          {("We’ve sent you the code at")}
           {/* <span>{authState.currentPhone}</span> */}
        </p>
        <div className="pt-8 pb-8">
          <InputOTP maxLength={4} onChange={(e) => setOtp(e)} value={otp}>
            <InputOTPGroup className="gap-5 flex justify-evenly sm:gap-8 md:gap-10 lg:gap-12">
              <div className="border rounded-xl p-1">
                <InputOTPSlot
                  index={0}
                  className="border w-14 h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:w-16 sm:h-16 md:w-18 md:h-18"
                />
              </div>
              <div className="border rounded-xl p-1">
                <InputOTPSlot
                  index={1}
                  className="border w-14 h-14 rounded-md bg-zinc-100 dark:bg-zinc-800 sm:w-16 sm:h-16 md:w-18 md:h-18"
                />
              </div>
              <div className="border rounded-xl p-1">
                <InputOTPSlot
                  index={2}
                  className="border w-14 h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:w-16 sm:h-16 md:w-18 md:h-18"
                />
              </div>
              <div className="border rounded-xl p-1">
                <InputOTPSlot
                  index={3}
                  className="border w-14 h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:w-16 sm:h-16 md:w-18 md:h-18"
                />
              </div>
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex w-full px-6 items-center">
          <Button
            className={`bg-primary gap-2 font-semibold text-primary-foreground text-lg w-full py-5 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out `}
            onClick={async (e) => {
                e.preventDefault(); 
                if (!otp || otp.length !== 4) {
                  alert("Please enter a valid 10-digit phone number");
                  return;
                }
            navigate("/");
            }}
          >
            <>
              {"Submit"}
            </>
          </Button>
        </div>
        <div className="text-sm text-gray-400 mt-3">
          {("Didn’t receive code?")}
          <span className="text-amber-500 dark:text-amber-300">
            {" "}
            {("Resend code")}
          </span>
        </div>
      </div>
    );
  };
  
  export default OTPView;
  