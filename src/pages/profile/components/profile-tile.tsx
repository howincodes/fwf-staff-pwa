import React from "react";

interface ProfileTileProps {
  title: string;
  icon: React.ElementType;
  border?: boolean;
  bgColor?: string;
}

const ProfileTiles = ({ title, icon: Icon,bgColor,border }: ProfileTileProps) => {
  return (
    <div className={`flex items-center py-3  bg-white dark:bg-zinc-900 ${border? "border-b" :"" } px-6`}>
      <div className={`${bgColor? bgColor : "bg-yellow-200"} p-2 rounded-lg mr-4`}>
        <Icon  className="w-6 h-6 text-zinc-600"/> 
      </div>
      <span className="text-zinc-400">{title}</span>
    </div>
  );
};

export default ProfileTiles;
