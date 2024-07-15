import React from 'react';
import '../StyleSheets/Common_Components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
    <div className="footer-section">
      <h2>OFFLINE STORE</h2>
      <a href="#">Find Stores Near Me</a>
    </div>
    <div className="footer-section">
      <h2>GET TO KNOW US</h2>
      <a href="#">Contact Us</a>
      <a href="#">FAQ's</a>
      <a href="#">Blogs</a>
      <a href="#">Terms & Conditions</a>
    </div>
    <div className="footer-section">
      <h2>TRACK OR RETURN/EXCHANGE ORDER</h2>
      <a href="#">TRACK ORDER</a>
      <a href="#">PLACE RETURN/EXCHANGE REQUEST</a>
      <a href="#">RETURNS/EXCHANGE POLICY</a>
    </div>
    <div className="footer-section">
      <h2>CUSTOMER CARE</h2>
      <p>Timings: 10 AM - 7 PM (Mon - Sat)</p>
      <p>Whatsapp: +91 6366966283</p>
      <p>Instagram: @snitch.co.in</p>
    </div>
    <div className="footer-section signup-section">
      <h2>SIGN UP AND SAVE</h2>
      <p>Sign up now and be the first to know about exclusive offers, latest fashion trends & style tips!</p>
      <form className="signup-form">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
      <div className="social-icons">
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-pinterest"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
