import React from "react";
import LeftSidebarComp from "./LeftSidebar";
import { ViewCheck } from "./viewCheck";

const XlLeftSidebar = () => {
  return (
    <div className="leftsidebar-md hidden xl:block">
      <LeftSidebarComp />
      <ViewCheck />
    </div>
  );
};

export default XlLeftSidebar;
