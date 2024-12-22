import React from "react";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroButton from "./HeroButton";

function Hero() {
  return (
    <section className="h-[800px] py-24 flex items-center">
      <div className="container mx-auto flex flex-col items-center text-center animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <HeroTitle />
          <HeroSubtitle />
          <HeroButton />
        </div>
      </div>
    </section>
  );
}

export default Hero;
