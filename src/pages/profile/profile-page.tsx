import {
  CreditCard,
  Files,
  IdCard,
  Info,
  LogOut,
  User,
  Users,
} from "lucide-react";
import user from "../../assets/user.png";
import ProfileTiles from "./components/profile-tile";
import ModeToggle from "@/components/mode-toggle";

const ProfilePage = () => {
  return (
    <div>
      <div className="bg-gradient-to-l from-yellow-500 to-yellow-200 h-32 relative"></div>
      <ModeToggle/>
      <div className="rounded-2xl px-3 py-1 bg-zinc-100 dark:bg-zinc-900 absolute top-20 right-6 md:right-8 lg:right-12 text-sm sm:text-base">
        #ID: HDCV100
      </div>
      <div className="flex items-center justify-end  gap-5">
        <div className="rounded-full w-24 h-24  bg-white p-1 shadow-md flex-shrink-0 absolute top-24 left-1/4 transform -translate-x-1/3 translate-y-2">
          <img src={user} alt="user" />
        </div>
        <div className="text-xl font-medium mt-2 border-b w-[45vw]">
          Henna Sherin 
          <div className="text-sm mb-3 ">Designation: Developer</div>
        </div>
        <hr />
      </div>

      <div className="mt-2">
        <ProfileTiles title="Security Password" icon={IdCard} border={true} />
        <ProfileTiles
          title="Your bank details"
          icon={CreditCard}
          border={true}
        />
        <ProfileTiles title="Personal info" icon={User} border={true} />
        <ProfileTiles title="General info" icon={Info} border={true} />
        <ProfileTiles title="Employment info" icon={Users} border={true} />
        <ProfileTiles title="Document Center" icon={Files} border={true} />
        <ProfileTiles title="Logout" bgColor="bg-red-100" icon={LogOut} />
      </div>
    </div>
  );
};

export default ProfilePage;
