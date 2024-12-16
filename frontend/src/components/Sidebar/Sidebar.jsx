import React, { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import SidebarHeader from "./SidebarHeader";
import SidebarItems from "./SidebarItems";
import SidebarFooter from "./SidebarFooter";

function Sidebar() {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[25vw] transition-all duration-100 z-20 px-4 lg:px-[35px]`}
    >
      <SidebarHeader />
      <SidebarItems />
      <SidebarFooter />
    </div>
  );
}

export default Sidebar;
