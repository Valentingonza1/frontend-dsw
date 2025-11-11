import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { isLoggedIn } from '../services/auth';
import './AdminClientes.css';   // 👈 importa el CSS

export default function AdminClientes() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ id:null, nombre:'', direccion:'', telefono:'' });

  useEffect(() => { if (!isLoggedIn()) nav('/cuenta'); }, [nav]);
  useEffect(() => { cargar(); }, []);

  async function cargar(){
    setLoading(true);
    try { setItems(await api('/clientes') || []); }
    catch { setMsg('Error al listar clientes'); }
    finally { setLoading(false); }
  }

  function onEdit(c){
    setForm({
      id:c.id,
      nombre:c.nombre || '',
      direccion:c.direccion || '',
      telefono:c.telefono || ''
    });
    window.scrollTo(0,0);
  }

  function onCancel(){
    setForm({ id:null, nombre:'', direccion:'', telefono:'' });
    setMsg('');
  }

  async function onSubmit(e){
    e.preventDefault();
    setMsg('Guardando...');
    const body = {
      nombre: form.nombre.trim(),
      direccion: form.direccion.trim(),
      telefono: form.telefono.trim()
    };
    try{
      if(!body.nombre || !body.direccion || !body.telefono)
        throw new Error('Faltan datos');

      if(form.id == null)
        await api('/clientes',{method:'POST', body:JSON.stringify(body)});
      else
        await api(`/clientes/${form.id}`,{method:'PUT', body:JSON.stringify(body)});

      setMsg(form.id == null ? 'Cliente creado' : 'Cliente actualizado');
      onCancel();
      await cargar();
    }catch(err){
      setMsg(err?.data?.error || err.message || 'Error al guardar');
    }
  }

  async function onDelete(id){
    if(!confirm('¿Eliminar este cliente?')) return;
    try{
      await api(`/clientes/${id}`,{method:'DELETE'});
      setMsg('Cliente eliminado');
      await cargar();
    }catch(err){
      setMsg(err?.data?.error || 'Error al eliminar');
    }
  }

  return (
    <section className="admin-clientes">
      <h2 className="t">Admin · Clientes</h2>
      <p><Link to="/admin" className="a">Volver al panel</Link></p>

      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <label>
            Nombre
            <input
              value={form.nombre}
              onChange={e=>setForm(f=>({...f, nombre:e.target.value}))}
            />
          </label>
          <label>
            Dirección
            <input
              value={form.direccion}
              onChange={e=>setForm(f=>({...f, direccion:e.target.value}))}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Teléfono
            <input
              value={form.telefono}
              onChange={e=>setForm(f=>({...f, telefono:e.target.value}))}
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
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.direccion}</td>
                  <td>{c.telefono}</td>
                  <td className="act">
                    <button onClick={() => onEdit(c)}>Editar</button>
                    <button onClick={() => onDelete(c.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5">Sin clientes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
