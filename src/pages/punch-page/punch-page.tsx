import { ChevronLeft, MapPinned, RefreshCcw } from "lucide-react";
import img from "@/assets/img.webp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PunchPage = () => {
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="p-3 shadow-sm">
        <ChevronLeft onClick={() => navigate("/")} />
      </div>
      <div className="h-[65vh] object-cover">
        <img src={img} className="h-full w-full" />
      </div>
      <div className="rounded-t-lg dark:bg-black  p-5 max-h-[60vh] overflow-y-auto">
        <h1 className="dark:text-white text-black "> Punched out</h1>
        <h2 className="text-gray-500 text-sm"> 16 Dec, Mon | 10:00 AM</h2>
        <div className="flex mt-1 items-center gap-2 text-sm bg-zinc-800 px-2 py-1 rounded-sm">
          <MapPinned className="h-4 w-4 dark:text-black text-white " />
          <h1 className="w-[70vw] truncate text-white ">
            Ooty road ,valiyangadi, Perinthalmanna, Manjeri
          </h1>
          <RefreshCcw
            className={`h-4 w-4 text-white ${
              refetch ? "animate-spin duration-1000" : ""
            } `}
            onClick={() => {
              setRefetch(true);
              setTimeout(() => setRefetch(false), 1000);
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
