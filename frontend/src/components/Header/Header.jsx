// src/components/Header/Header.jsx
import React, { useState } from "react";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";
import { useScroll } from "../../hooks/useScroll";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useScroll((scrollY) => {
    setIsActive(scrollY > 60);
  });

  return (
    <>
      {/* Announcement Bar - Her zaman en üstte */}
      <div className="fixed w-full top-0 z-30 bg-brown-600 text-white text-center py-2 px-4">
        <p className="text-sm">
          Order By Dec. 15 and Select "Fast Shipping" At Checkout For Delivery
          By Dec. 24
        </p>
      </div>

      {/* Ana Header */}
      <header
        className={`${
          isActive
            ? "bg-white py-3 shadow-lg top-0"
            : "bg-white/80 backdrop-blur-md py-3 top-10"
        } fixed w-full z-20 transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Sağ Taraf - Profil ve Sepet */}
          <div className="flex items-center space-x-6">
            <ProfileMenu />
            <Link
              to="/cart"
              className="text-gray-700 hover:text-brown-600 relative transition-colors"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-brown-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Header için boşluk bırakma */}
      <div
        className={`${isActive ? "h-20" : "h-28"} transition-all duration-300`}
      />
    </>
  );
}

export default Header;
