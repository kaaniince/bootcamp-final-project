// src/components/Header/Header.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { BsBag } from "react-icons/bs";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brown-600 py-2 fixed w-full z-20 top-0">
        <div className="container mx-auto">
          <p className="text-white text-center text-sm">
            Order By Dec. 15 and Select 'Fast Shipping' At Checkout For Delivery
            By Dec. 24
          </p>
        </div>
      </div>

      {/* Header */}
      <header
        className={`${
          isActive ? "bg-white py-4 shadow-lg" : "bg-white py-6"
        } fixed w-full z-10 transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <Logo />

          {/* Right Side - Profile & Cart */}
          <div className="flex items-center space-x-4">
            {/* Profile Menu */}
            <ProfileMenu />

            {/* Cart Icon */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer relative"
            >
              <BsBag className="text-2xl" />
              {itemAmount > 0 && (
                <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                  {itemAmount}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
