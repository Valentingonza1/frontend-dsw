import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isLoggedIn, logout } from '../services/auth';
import './cuenta.css';

export default function CuentaAdmin() {
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
      nav('/admin');
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

  if (isLoggedIn()) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2 className="auth-title">Panel Admin</h2>
          <p className="auth-subtitle">Sesión iniciada como <b>admin</b>.</p>
          <button className="btn-outline" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">Acceso Administrador</h2>
        <form className="auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">Usuario</span>
            <input
              className="field-input"
              value={username}
              onChange={e => setU(e.target.value)}
              placeholder="Usuario"
              autoComplete="username"
            />
          </label>
          <label className="field">
            <span className="field-label">Contraseña</span>
            <input
              type="password"
              className="field-input"
              value={password}
              onChange={e => setP(e.target.value)}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </label>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
        </form>
        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </section>
  );
}