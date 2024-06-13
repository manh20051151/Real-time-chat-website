import React from "react";
import { PhoneBookSidebar } from "../../components";
import { Outlet } from "react-router-dom";

const PhoneBookLayout = () => {
  return (
    <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-900">
      <div className="w-[327px] top-0 bottom-0 flex-none fixed">
        <PhoneBookSidebar />
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default PhoneBookLayout;
