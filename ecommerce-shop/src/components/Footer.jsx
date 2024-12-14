import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-6 lg:mb-0">
            <h5 className="text-lg font-bold mb-2">Contact Us</h5>
            <p>123 Ecommerce St, Shop City, EC 12345</p>
            <p>Email: support@ecommerce.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="mb-6 lg:mb-0">
            <h5 className="text-lg font-bold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <p>&copy; 2024 Ecommerce Shop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
