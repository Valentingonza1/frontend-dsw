// src/pages/Admin.jsx
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <section style={{ maxWidth: 1200, margin:'2rem auto', padding:'0 16px' }}>
      <Style />
      <h2 className="t">Panel de Administración</h2>
      <p className="lead">Elegí qué querés administrar.</p>

      <div className="admin-grid">
        <article className="admin-card">
          <h3>Productos</h3>
          <p>Crear, editar y eliminar productos del catálogo.</p>
          <Link to="/admin/productos" className="btn">Administrar productos</Link>
        </article>

        <article className="admin-card">
          <h3>Clientes</h3>
          <p>Crear, editar y eliminar clientes.</p>
          <Link to="/admin/clientes" className="btn">Administrar clientes</Link>
        </article>
      </div>
    </section>
  );
}

function Style(){return(<style>{`
  :root{ --brand:#B93232; --ink:#545454; --tone:#E6E6E6; }
  .t{ margin:0 0 10px 0; color:var(--ink); }
  .lead{ margin:0 0 12px 0; color:#666; }

  .admin-grid{
    display:grid; gap:16px;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    align-items:stretch;
  }
  .admin-card{
    display:flex; flex-direction:column; gap:10px;
    background:#fff; border:1px solid var(--tone);
    border-radius:16px; padding:16px;
    box-shadow:0 6px 24px rgba(0,0,0,.06);
  }

  /* MISMA ANIMACIÓN QUE EL BOTÓN "AGREGAR" DEL CATÁLOGO */
  .admin-card .btn{
    margin-top:auto;
    display:inline-block; text-align:center;
    padding:12px 14px; border-radius:10px;
    background:var(--brand); color:#fff; font-weight:700; text-decoration:none;
    transition: transform .15s ease, box-shadow .2s ease, background-color .2s ease, filter .2s ease;
    box-shadow: 0 4px 12px rgba(185,50,50,.25);
  }
  .admin-card .btn:hover{
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(185,50,50,.35);
    filter:none;
  }
  .admin-card .btn:active{
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(185,50,50,.25);
  }
`}</style>);}
