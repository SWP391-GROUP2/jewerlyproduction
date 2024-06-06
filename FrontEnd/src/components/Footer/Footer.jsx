import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: contact@nbjewelrystore.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-media">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h4>About Us</h4>
        <p>
          NB Jewelry Store offers exquisite jewelry collections, providing you
          with the finest shopping experience.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
