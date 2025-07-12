import './Navbar.css';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
          <li onClick={closeMenu}>
            <Link to="/productos">Productos</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/locales">Locales</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/ofertas">Ofertas</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/cuenta">Mi cuenta</Link>
          </li>
          <li onClick={closeMenu}>
            <FaSearch className="icon" />
          </li>
          <li onClick={closeMenu}>
            <FaShoppingCart className="icon" />
          </li>
        </ul>
      </div>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
