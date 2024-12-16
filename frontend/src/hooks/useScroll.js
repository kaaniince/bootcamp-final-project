// src/hooks/useScroll.js
import { useEffect } from "react";

export const useScroll = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      callback(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};
