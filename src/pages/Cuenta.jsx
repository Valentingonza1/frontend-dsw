// src/pages/Cuenta.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isLoggedIn, logout } from '../services/auth';
import './cuenta.css';

export default function Cuenta() {
  const nav = useNavigate();
  const [username, setU] = useState('');
  const [password, setP] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      await login(username.trim(), password);
      setMsg('Sesión iniciada');
      nav('/'); // o donde prefieras
    } catch (err) {
      setMsg(err.message || 'Error de login');
    } finally {
      setLoading(false);
    }
  }

  function onLogout() {
    logout();
    setMsg('Sesión cerrada');
  }

  // Estado logueado (solo estética)
  if (isLoggedIn()) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2 className="auth-title">Mi cuenta</h2>
          <p className="auth-subtitle">Ya iniciaste sesión como <b>admin</b>.</p>
          <button className="btn-outline" onClick={onLogout}>Salir</button>
        </div>
      </section>
    );
  }

  // Formulario de login (estético)
  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Mi cuenta</h2>
        <p className="auth-subtitle">
          Por favor ingrese para acceder a las funciones de administrador.
        </p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">Usuario</span>
            <input
              className="field-input"
              value={username}
              onChange={e=>setU(e.target.value)}
              placeholder="Ingrese su usuario"
              autoComplete="username"
            />
          </label>

          <label className="field">
            <span className="field-label">Contraseña</span>
            <input
              type="password"
              className="field-input"
              value={password}
              onChange={e=>setP(e.target.value)}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
            />
          </label>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar Sesión'}
          </button>
        </form>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </section>
  );
}
