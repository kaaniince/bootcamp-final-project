import React from "react";

function HeroButton() {
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
    <button
      id="shop-now-button"
      onClick={scrollToContent}
      className="bg-primary text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 animate-bounce"
    >
      Shop Now
    </button>
  );
}

export default HeroButton;
