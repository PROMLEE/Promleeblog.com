import React from "react";
import LeftSidebarComp from "./LeftSidebar";
import { ViewStats } from "./viewCheck";
// import { CalendarDemo } from "../Calander";
// import { EditService } from "@/config/apis/service/edit";

const XlLeftSidebar = async () => {
  // const tags = await EditService().getTags();

  return (
    <div className="leftsidebar-md hidden xl:block">
      <ViewStats />
      {/* <div className="border-foreground w-full border-t pt-2 text-center text-lg font-bold">
        Menu
      </div> */}
      <LeftSidebarComp />
      {/* <CalendarDemo /> */}
      {/* {tags.data.map((tag) => (
        <div key={tag.id}>{tag.name}</div>
      ))} */}
    </div>
  );
};

export default XlLeftSidebar;
