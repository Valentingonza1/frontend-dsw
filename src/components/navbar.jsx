import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa'; // ícono de carrito (asegurate de instalar react-icons)
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Carnes argentinas</div>

      <ul className="nav-links">
        <li>Productos</li>
        <li>Locales</li>
        <li>Ofertas</li>
        <li>Contacto</li>
        <li>Mi cuenta</li>
        <li> 🔍</li>
        <li><FaShoppingCart className="cart-icon" /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
