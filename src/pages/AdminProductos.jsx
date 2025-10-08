// src/pages/AdminProductos.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { isLoggedIn } from '../services/auth';

export default function AdminProductos() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ id:null, nombre:'', descripcion:'', precio:'', stock:'' });

  // Si no hay sesión, redirige a /cuenta
  useEffect(() => { if (!isLoggedIn()) nav('/cuenta'); }, [nav]);

  // Carga inicial de productos
  useEffect(() => { cargar(); }, []);

  async function cargar() {
    setLoading(true);
    try {
      const data = await api('/productos');
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setMsg('Error al listar productos');
    } finally {
      setLoading(false);
    }
  }

  function onEdit(p) {
    setForm({
      id: p.id,
      nombre: p.nombre || '',
      descripcion: p.descripcion || '',
      precio: String(p.precio ?? ''),
      stock: String(p.stock ?? '')
    });
    window.scrollTo(0,0);
  }

  function onCancel() {
    setForm({ id:null, nombre:'', descripcion:'', precio:'', stock:'' });
    setMsg('');
  }

  async function onSubmit(e){
    e.preventDefault();
    setMsg('Guardando...');

    const body = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock)
      // imagen: (opcional) agregar luego si querés mostrar foto en catálogo
    };

    try{
      if(!body.nombre) throw new Error('El nombre es obligatorio');
      if(isNaN(body.precio) || body.precio < 0) throw new Error('Precio inválido');
      if(isNaN(body.stock)  || body.stock  < 0) throw new Error('Stock inválido');

      if(form.id == null){
        await api('/productos', { method:'POST', body: JSON.stringify(body) });
        setMsg('Producto creado');
      }else{
        await api(`/productos/${form.id}`, { method:'PUT', body: JSON.stringify(body) });
        setMsg('Producto actualizado');
      }

      // Aviso para que /productos se refresque si está abierto en esta pestaña
      window.dispatchEvent(new CustomEvent('productos:changed'));

      onCancel();
      await cargar();
    }catch(err){
      setMsg(err?.data?.error || err.message || 'Error al guardar');
    }
  }

  async function onDelete(id){
    if(!confirm('¿Eliminar este producto?')) return;
    try{
      await api(`/productos/${id}`, { method:'DELETE' });
      setMsg('Producto eliminado');

      // Aviso para que /productos se refresque si está abierto en esta pestaña
      window.dispatchEvent(new CustomEvent('productos:changed'));

      await cargar();
    }catch(err){
      setMsg(err?.data?.error || 'Error al eliminar');
    }
  }

  return (
    <section style={{ maxWidth: 1000, margin:'2rem auto', padding:'0 16px' }}>
      <Style />
      <h2 className="t">Admin · Productos</h2>
      <p><Link to="/admin" className="a">Volver al panel</Link></p>

      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <label>Nombre
            <input
              value={form.nombre}
              onChange={e=>setForm(f=>({...f, nombre:e.target.value}))}
            />
          </label>
          <label>Descripción
            <input
              value={form.descripcion}
              onChange={e=>setForm(f=>({...f, descripcion:e.target.value}))}
            />
          </label>
        </div>
        <div className="row">
          <label>Precio
            <input
              type="number" step="0.01"
              value={form.precio}
              onChange={e=>setForm(f=>({...f, precio:e.target.value}))}
            />
          </label>
          <label>Stock
            <input
              type="number"
              value={form.stock}
              onChange={e=>setForm(f=>({...f, stock:e.target.value}))}
            />
          </label>
        </div>
        <div className="actions">
          <button type="submit" className="btn">
            {form.id == null ? 'Crear' : 'Actualizar'}
          </button>
          {form.id != null && (
            <button type="button" className="btn-outline" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {msg && <p className="msg">{msg}</p>}

      {loading ? (
        <p className="msg">Cargando...</p>
      ) : (
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.precio}</td>
                  <td>{p.stock}</td>
                  <td className="act">
                    <button onClick={()=>onEdit(p)}>Editar</button>
                    <button onClick={()=>onDelete(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5">Sin productos</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Style(){
  return (
    <style>{`
      :root{ --brand:#B93232; --ink:#545454; --tone:#E6E6E6; }
      .t{ margin:0 0 10px 0; color:var(--ink); }
      .a{ color:var(--brand); text-decoration:none; }
      .form{ display:grid; gap:12px; margin:12px 0 10px 0; }
      .row{ display:grid; gap:10px; grid-template-columns: 1fr 1fr; }
      label{ display:grid; gap:6px; color:#333; font-size:14px; font-weight:600; }
      input{
        padding:10px 12px; border:1px solid var(--tone); border-radius:10px;
        font-size:15px; outline:none; background:#fff;
      }
      input:focus{ border-color:var(--brand); box-shadow:0 0 0 3px rgba(185,50,50,.15); }
      .actions{ display:flex; gap:8px; }
      .btn{
        padding:10px 14px; border:0; border-radius:10px;
        background:var(--brand); color:#fff; font-weight:700; cursor:pointer;
      }
      .btn-outline{
        padding:10px 14px; border:1px solid var(--brand); border-radius:10px;
        background:transparent; color:var(--brand); font-weight:700; cursor:pointer;
      }
      .msg{ margin:8px 0; color:#333; }
      .table-wrap{ overflow:auto; }
      .tbl{ width:100%; border-collapse:collapse; }
      .tbl th, .tbl td{ text-align:left; padding:10px; border-bottom:1px solid var(--tone); }
      .act{ display:flex; gap:6px; }
      .act button{
        padding:6px 10px; border-radius:8px; border:1px solid var(--tone);
        background:#fff; cursor:pointer;
      }
      .act button:hover{ border-color:var(--brand); color:var(--brand); }
      @media (max-width: 720px){
        .row{ grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
