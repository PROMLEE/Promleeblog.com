import React from "react";
import LeftSidebarComp from "./LeftSidebar";
import { ViewCheck } from "./viewCheck";
import { CalendarDemo } from "../Calander";

const XlLeftSidebar = () => {
  return (
    <div className="leftsidebar-md hidden xl:block">
      <ViewCheck />
      <CalendarDemo />
      <div className="w-full border-t border-foreground pt-2 text-center text-lg font-bold">
        Menu
      </div>
      <LeftSidebarComp />
    </div>
  );
};

export default XlLeftSidebar;
