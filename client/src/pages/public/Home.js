import React from "react";
import "./Home.css";
import LeftSidebar from "../../components/LeftSidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-900">
      <div className="w-[65px] top-0 bottom-0 flex-none fixed">
        <LeftSidebar />
      </div>
      <div className="w-[65px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
