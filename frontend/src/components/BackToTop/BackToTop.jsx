// src/components/BackToTop.jsx
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { useScroll } from "../../hooks/useScroll";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // useScroll hook'unu kullanarak scroll durumunu kontrol edin
  useScroll((scrollY) => {
    setIsVisible(scrollY > 300);
  });

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
