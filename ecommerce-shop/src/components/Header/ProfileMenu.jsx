import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

const ProfileMenu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="profile-menu relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowProfileMenu(!showProfileMenu);
        }}
        className="cursor-pointer"
      >
        <BsPerson className="text-3xl text-primary hover:text-primary-dark transition-colors duration-300" />
      </div>
      {showProfileMenu && (
        <MenuDropdown setShowProfileMenu={setShowProfileMenu} />
      )}
    </div>
  );
};

const MenuDropdown = ({ setShowProfileMenu }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-30">
    <Link
      to="/login"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={() => setShowProfileMenu(false)}
    >
      Login
    </Link>
    <Link
      to="/register"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={() => setShowProfileMenu(false)}
    >
      Register
    </Link>
  </div>
);

export default ProfileMenu;
