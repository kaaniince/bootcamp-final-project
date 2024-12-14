import React, { useState } from "react";
import { FiSend } from "react-icons/fi"; // React Icons'dan send ikonunu import ediyoruz

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter logic here
    console.log("Subscribed with:", email);
    setEmail(""); // Form submit sonrası input'u temizle
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-lg mb-8 max-w-md mx-auto">
            Stay updated with our latest products, special offers and news
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition duration-300 hover:scale-105"
            >
              Subscribe
              <FiSend className="text-xl" />
            </button>
          </form>
          <p className="text-sm mt-4 text-gray-200">
            By subscribing you agree to our Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
