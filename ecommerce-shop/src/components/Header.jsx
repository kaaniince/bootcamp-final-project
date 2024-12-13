import React from "react";
import { SidebarContext } from "../contexts/SidebarContext.jsx";
import { useContext } from "react";
import { BsBag } from "react-icons/bs";

function Header() {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  return (
    <header className="bg-pink-200">
      Header
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex relative"
      >
        <BsBag className="text-2xl" />
      </div>
    </header>
  );
}

export default Header;
