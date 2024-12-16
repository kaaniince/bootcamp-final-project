// src/components/Header/Header.jsx
import React, { useState } from "react";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";
import CartIcon from "./CartIcon";
import { useScroll } from "../../hooks/useScroll";

function Header() {
  const [isActive, setIsActive] = useState(false);

  useScroll((scrollY) => {
    setIsActive(scrollY > 60);
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-3 shadow-lg top-0" : "bg-transparent py-5 top-8"
      } fixed w-full z-20 transition-all duration-100`}
    >
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
        <Logo />
        <div className="flex items-center space-x-6">
          <ProfileMenu />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;
