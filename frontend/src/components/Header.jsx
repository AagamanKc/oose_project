import React from "react";
import { Link } from "react-router-dom";
import "../style/header.css"; // Separate CSS for header

const Header = () => {
  return (
    <header>
      <h2 className="logo">Naaya</h2>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">
          <button className="btnLogin-popup">Login</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
