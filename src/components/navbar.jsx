import './navbar.css';
<<<<<<< HEAD
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
=======
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
>>>>>>> bce9135 (carrito listo)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { isLoggedIn, logout } from '../services/auth';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);
  const doLogout = () => { logout(); close(); nav('/cuenta'); };

  return (
    <nav className="navbar">
      <div className="navbar-header container">
        <Link to="/" className="logo" onClick={close}>
          <img src={logo} alt="Carnes Argentinas" />
        </Link>

        <ul className="nav desktop">
          <li><Link to="/productos" className="nav-link">Productos</Link></li>
          <li><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
          <li><Link to="/cuenta" className="nav-link">Mi cuenta</Link></li>

          {isLoggedIn() && (
            <>
              <li><Link to="/admin" className="nav-link">Admin</Link></li>
              <li>
                <button
                  onClick={doLogout}
                  className="nav-link"
                  style={{ background:'transparent', border:0, cursor:'pointer' }}
                >
                  Salir
                </button>
              </li>
            </>
          )}

<<<<<<< HEAD
          <li><button className="icon-btn" aria-label="Buscar"><FaSearch /></button></li>
          <li><button className="icon-btn" aria-label="Carrito"><FaShoppingCart /></button></li>
=======
          {/* Carrito: ahora navega a /carrito */}
          <li>
            <Link to="/carrito" className="icon-btn" aria-label="Carrito">
              <FaShoppingCart />
            </Link>
          </li>
>>>>>>> bce9135 (carrito listo)
        </ul>

        <button className="menu-icon mobile" onClick={toggle} aria-label="Menú">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`side-menu ${open ? 'open' : ''}`}>
        <ul className="nav">
          <li onClick={close}><Link to="/productos" className="nav-link">Productos</Link></li>
          <li onClick={close}><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
          <li onClick={close}><Link to="/cuenta" className="nav-link">Mi cuenta</Link></li>

          {isLoggedIn() && (
            <>
              <li onClick={close}><Link to="/admin" className="nav-link">Admin</Link></li>
              <li>
                <button
                  className="nav-link"
                  style={{ background:'transparent', border:0, cursor:'pointer' }}
                  onClick={doLogout}
                >
                  Salir
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {open && <div className="overlay" onClick={close} />}
    </nav>
  );
}
