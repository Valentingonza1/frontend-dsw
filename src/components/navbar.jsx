import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBars, FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="logo">Carnes argentinas</div>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li onClick={closeMenu}>Productos</li>
          <li onClick={closeMenu}>Locales</li>
          <li onClick={closeMenu}>Ofertas</li>
          <li onClick={closeMenu}>Contacto</li>
          <li onClick={closeMenu}>Mi cuenta</li>
          <li onClick={closeMenu}>🔍</li>
          <li onClick={closeMenu}>
            <FaShoppingCart className="cart-icon" />
          </li>
        </ul>
      </div>

      {/* Fondo oscuro detrás del menú */}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;


