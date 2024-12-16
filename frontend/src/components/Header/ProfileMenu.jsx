// src/components/Header/ProfileMenu.jsx
import React, { useState, useEffect } from "react"; // useState'i import ettik
import { BsPerson } from "react-icons/bs";
import { MenuItem } from "./MenuItems/MenuItem";
import { menuItems } from "./MenuItems/MenuData";

const MenuDropdown = ({ setShowProfileMenu }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-30">
    {menuItems.map((item) => (
      <MenuItem
        key={item.id}
        title={item.title}
        path={item.path}
        setShowProfileMenu={setShowProfileMenu}
      />
    ))}
  </div>
);

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

export default ProfileMenu;
