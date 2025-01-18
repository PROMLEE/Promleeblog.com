import React from "react";
import LeftSidebarComp from "./LeftSidebar";
import { ViewCheck } from "./viewCheck";
import { CalendarDemo } from "../Calander";

const XlLeftSidebar = () => {
  return (
    <div className="leftsidebar-md hidden xl:block">
      <div className="w-full text-center text-lg font-bold">Menu</div>
      <LeftSidebarComp />
      <CalendarDemo />
      <ViewCheck />
    </div>
  );
};

export default XlLeftSidebar;
