import React from "react";

interface ProfileTileProps {
  title: string;
  icon: React.ElementType;
  border?: boolean;
  bgColor?: string;
}

const ProfileTiles = ({ title, icon: Icon,bgColor,border }: ProfileTileProps) => {
  return (
    <div className={`flex items-center py-3 ${border? "border-b" :"" } px-6`}>
      <div className={`${bgColor? bgColor : "bg-yellow-100"} p-2 rounded-lg mr-4`}>
        <Icon /> {/* Render the icon component */}
      </div>
      <span className="text-gray-800">{title}</span>
    </div>
  );
};

export default ProfileTiles;
