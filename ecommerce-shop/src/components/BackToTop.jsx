// src/components/BackToTop.jsx
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary hover:bg-secondary text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
          aria-label="Back to top"
        >
          <IoIosArrowUp className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
