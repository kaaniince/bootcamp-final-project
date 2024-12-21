// src/components/Header/ProfileMenu.jsx
import React, { useState, useRef, useEffect } from "react"; // useState'i import ettik
import { BsPerson } from "react-icons/bs";
import { MenuItem } from "./MenuItems/MenuItem";
import { menuItems } from "./MenuItems/MenuData";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaUser, FaSignOutAlt, FaUserEdit } from "react-icons/fa";

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
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-brown-600 transition"
      >
        <FaUser className="text-xl" />
        {isAuthenticated && (
          <span className="text-sm hidden md:inline-block">{user?.name}</span>
        )}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserEdit className="mr-2" />
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
