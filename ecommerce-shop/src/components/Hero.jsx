import React from "react";

function Hero() {
  const scrollToContent = () => {
    const shopNowButton = document.querySelector("#shop-now-button");
    if (shopNowButton) {
      window.scrollTo({
        top: shopNowButton.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="h-[800px] py-24 flex items-center ">
      <div className="container mx-auto flex flex-col items-center text-center animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="font-bold text-lg flex items-center uppercase tracking-widest text-primary mb-2 animate-slide-in">
            <div className="w-12 h-[3px] bg-primary mr-3"></div>
            <span className="animate-pulse">New Arrival</span>
          </div>
          <h1 className="text-[80px] leading-tight font-extrabold text-secondary mb-6 animate-bounce-in">
            <span className="text-shadow-lg">AUTUMN SALE</span> <br />
            <span className="text-primary text-shadow-lg">STYLISH WOMAN</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-md mb-8 animate-fade-in-up">
            Discover the latest trends in women's fashion with our exclusive
            autumn collection. Elevate your style with elegance and grace.
          </p>
          <button
            id="shop-now-button"
            onClick={scrollToContent}
            className="bg-primary text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 animate-bounce"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
