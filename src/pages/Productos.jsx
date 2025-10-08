// src/pages/Productos.jsx
import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { FaSearch } from 'react-icons/fa';
import './Productos.css';

export default function Productos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('relevancia'); // relevancia | precio-asc | precio-desc

  useEffect(() => {
    load();
    const handler = () => load(); // refresco si Admin avisa cambios
    window.addEventListener('productos:changed', handler);
    return () => window.removeEventListener('productos:changed', handler);
  }, []);

  async function load() {
    setLoading(true);
    setMsg('');
    try {
      const rows = await api('/productos');
      setItems(Array.isArray(rows) ? rows : []);
    } catch {
      setMsg('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    let arr = [...items];

    // filtro por texto en nombre o descripción
    const t = q.trim().toLowerCase();
    if (t) {
      arr = arr.filter(p =>
        (p.nombre || '').toLowerCase().includes(t) ||
        (p.descripcion || '').toLowerCase().includes(t)
      );
    }

    // orden
    const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
    if (sort === 'precio-asc')  arr.sort((a, b) => num(a.precio) - num(b.precio));
    if (sort === 'precio-desc') arr.sort((a, b) => num(b.precio) - num(a.precio));

    return arr;
  }, [items, q, sort]);

  function onAdd(prod) {
    // Hook para tu carrito (por ahora solo demostración)
    console.log('Agregar', prod);
    // luego: dispatch al carrito, toast, etc.
  }

  return (
    <section className="catalogo" style={{ maxWidth: 1200, margin:'2rem auto', padding:'0 16px' }}>
      <h2 className="t">Catálogo</h2>

      {/* Filtros */}
      <div className="filters">
        <div className="search">
          <span className="icon"><FaSearch size={14} /></span>
          <input
            type="search"
            placeholder="Buscar: vacío, pollo, bondiola…"
            value={q}
            onChange={e=>setQ(e.target.value)}
          />
        </div>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="relevancia">Ordenar por relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <p className="count">
        {loading ? 'Cargando…' : `${filtered.length} resultado${filtered.length === 1 ? '' : 's'}`}
      </p>
      {msg && !loading && <p className="msg">{msg}</p>}
      {!loading && filtered.length === 0 && <p className="msg">No se encontraron productos.</p>}

      {/* Grid */}
      <div className="grid">
        {filtered.map(p => {
          const sinStock = Number(p.stock) <= 0;
          return (
            <article className="card" key={p.id}>
              <div className="media">
                <img
                  src={p.imagen || '/images/placeholder.jpg'}
                  alt={p.nombre}
                  loading="lazy"
                  onError={e => { e.currentTarget.src = '/images/placeholder.jpg'; }}
                />
              </div>
              <div className="body">
                <h3>{p.nombre}</h3>
                {p.descripcion && <p className="desc">{p.descripcion}</p>}
                <div className="meta">
                  {'precio' in p && <span className="price">
                    ${Number(p.precio).toLocaleString('es-AR')}
                  </span>}
                  {'stock' in p && <span className="badge">Stock: {p.stock}</span>}
                </div>

                <div className="card-actions">
                  <button
                    className="btn-agregar"
                    onClick={() => onAdd(p)}
                    disabled={sinStock}
                    title={sinStock ? 'Sin stock' : 'Agregar al carrito'}
                  >
                    {sinStock ? 'Sin stock' : 'Agregar al carrito'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
