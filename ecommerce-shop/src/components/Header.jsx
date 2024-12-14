import React from "react";
import { SidebarContext } from "../contexts/SidebarContext.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import { useContext, useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../img/AllBird.png";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-3 shadow-lg top-0" : "bg-transparent py-5 top-8"
      } fixed w-full z-20 transition-all duration-100`}
    >
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[120px] transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-primary text-primary px-5 py-2 rounded-lg hover:bg-primary/10 transition-colors duration-300"
            >
              Register
            </Link>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative items-center"
          >
            <BsBag className="text-3xl text-primary hover:text-primary-dark transition-colors duration-300" />
            <div className="bg-primary absolute -right-3 -bottom-3 text-xs w-5 h-5 rounded-full text-white flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
