import './Navbar.css';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png'; // asegurate de tener la imagen en esa ruta



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Carnes Argentinas" className="logo-img" />
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li onClick={closeMenu}>
            <Link to="/productos" className="nav-link">Productos</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/locales" className="nav-link">Locales</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/ofertas" className="nav-link">Ofertas</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/contacto" className="nav-link">Contacto</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/cuenta" className="nav-link">Mi cuenta</Link>
            </li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;