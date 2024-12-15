import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="mb-6 lg:mb-0">
      <h5 className="text-lg font-bold mb-2">Bizi Takip Edin</h5>
      <div className="flex space-x-4">
        <SocialLink href="https://facebook.com" icon={<FaFacebookF />} />
        <SocialLink href="https://linkedin.com" icon={<FaLinkedinIn />} />
        <SocialLink href="https://twitter.com" icon={<FaTwitter />} />
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-secondary"
  >
    {icon}
  </a>
);

export default SocialLinks;
