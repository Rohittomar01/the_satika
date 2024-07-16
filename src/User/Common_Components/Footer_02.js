import React from 'react';
import '../StyleSheets/Common_Components/Footer_02.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section contact-section">
        <div className="contact-item">
          <i className="fas fa-phone-alt"></i>
          <div>
            <p>Have a question?</p>
            <p>1800-266-0123</p>
          </div>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <div>
            <p>Contact us at</p>
            <p>ecomsupport@titan.co.in</p>
          </div>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-pinterest"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      <div className="footer-section">
        <h2>POLICIES</h2>
        <a href="#">Return & Exchanges</a>
        <a href="#">Shipping</a>
        <a href="#">Cancellation</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy</a>
        <a href="#">Help & FAQs</a>
        <a href="#">Tata NeuPass FAQs</a>
      </div>
      <div className="footer-section">
        <h2>ABOUT TANEIRA</h2>
        <a href="#">About Us</a>
        <a href="#">Track Order</a>
        <a href="#">Encircle Program</a>
        <a href="#">Corporate</a>
        <a href="#">Careers</a>
        <a href="#">Blogs</a>
      </div>
    </footer>
  );
};

export default Footer;
