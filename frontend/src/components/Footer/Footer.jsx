import React from "react";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import Copyright from "./Copyright";

function Footer() {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <ContactInfo />
          <SocialLinks />
          <Copyright />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
