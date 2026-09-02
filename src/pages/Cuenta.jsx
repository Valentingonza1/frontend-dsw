import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './cuenta.css';

export default function Cuenta() {
  const nav = useNavigate();
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token_cliente');
  const nombreGuardado = localStorage.getItem('nombre_cliente');

  function onLogout() {
    localStorage.removeItem('token_cliente');
    localStorage.removeItem('nombre_cliente');
    window.location.reload();
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      if (modo === 'registro') {
        await api('/usuarios/registro', {
          method: 'POST',
          body: JSON.stringify({ nombre, email, password }),
        });
        setMsg('Cuenta creada. Ahora podés iniciar sesión.');
        setModo('login');
      } else {
        const data = await api('/usuarios/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('token_cliente', data.token);
        localStorage.setItem('nombre_cliente', data.nombre);
        nav('/productos');
      }
    } catch (err) {
      setMsg(err.data?.error || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  }

  if (token) {
    return (
      <section className="auth-wrap">
        <div className="auth-card">
          <h2 className="auth-title">Mi cuenta</h2>
          <p className="auth-subtitle">Bienvenido, <b>{nombreGuardado}</b>.</p>
          <button className="btn-outline" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h2 className="auth-title">{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button
            className={modo === 'login' ? 'btn-primary' : 'btn-outline'}
            onClick={() => { setModo('login'); setMsg(''); }}
            type="button"
          >
            Iniciar sesión
          </button>
          <button
            className={modo === 'registro' ? 'btn-primary' : 'btn-outline'}
            onClick={() => { setModo('registro'); setMsg(''); }}
            type="button"
          >
            Registrarse
          </button>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          {modo === 'registro' && (
            <label className="field">
              <span className="field-label">Nombre</span>
              <input
                className="field-input"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Tu nombre"
              />
            </label>
          )}

          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              className="field-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </label>

          <label className="field">
            <span className="field-label">Contraseña</span>
            <input
              type="password"
              className="field-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Tu contraseña"
            />
          </label>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Cargando…' : modo === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </button>
        </form>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </section>
  );
}