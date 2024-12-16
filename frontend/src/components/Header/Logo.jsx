import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Allbird.png";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="logo"
        className="w-[120px] transition-transform duration-300 hover:scale-105"
      />
    </Link>
  );
};

export default Logo;
