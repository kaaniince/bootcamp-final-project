import React from "react";
import { Link } from "react-router-dom";
import womanImg from "../img/woman_hero.png";

function Hero() {
  return (
    <section className="bg-pink-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex h-full justify-around">
        <div className="flex flex-col">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
            New Trend
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            AUTUMUN SALE STYLISH <br />
            <span className="font-semibold">WOMAN</span>
          </h1>
          <Link
            to="/products"
            className="self-start uppercase font-semibold border-b-2 border-primary"
          >
            Discover More
          </Link>
        </div>
        <div className="hidden lg-block">
          <img src={womanImg} alt="hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
