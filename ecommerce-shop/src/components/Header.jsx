import React from "react";
import { SidebarContext } from "../contexts/SidebarContext.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import { useContext, useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);
  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md " : "bg-transparent py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container flex mx-auto items-center justify-between h-full">
        <Link to={"/"}>
          <div>
            <img src={logo} alt="logo" className="w-[40px]" />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10 transition"
            >
              Register
            </Link>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] rounded-full text-white flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
