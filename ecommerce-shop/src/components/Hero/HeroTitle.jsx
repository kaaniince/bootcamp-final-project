import React from "react";

function HeroTitle() {
  return (
    <>
      <div className="font-bold text-lg flex items-center uppercase tracking-widest text-primary mb-2 animate-slide-in">
        <div className="w-12 h-[3px] bg-primary mr-3"></div>
        <span className="animate-pulse">New Arrival</span>
      </div>
      <h1 className="text-[80px] leading-tight font-extrabold text-secondary mb-6 animate-bounce-in">
        <span className="text-shadow-lg">AUTUMN SALE</span> <br />
        <span className="text-primary text-shadow-lg">STYLISH WOMAN</span>
      </h1>
    </>
  );
}

export default HeroTitle;
