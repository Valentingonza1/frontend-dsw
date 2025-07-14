import './Navbar.css';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import logo from '../assets/logo.png'; // asegurate de tener la imagen en esa ruta
=======
>>>>>>> aac2e47e68cce33916fff863b8d796190bc2f354

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
<<<<<<< HEAD
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
=======
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
>>>>>>> aac2e47e68cce33916fff863b8d796190bc2f354
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