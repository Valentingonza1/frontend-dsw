import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { FaSearch } from 'react-icons/fa';
import './Productos.css';
import { useCart } from '../context/CartContext.jsx';
import ProductImage from "../components/ProductImage";

export default function Productos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('relevancia');

  const { add, money, lastError, clearError } = useCart();

  useEffect(() => {
    load();
    const handler = () => load();
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

  useEffect(() => {
    if (!lastError) return;
    setMsg(lastError);
    const t = setTimeout(() => {
      clearError();
      setMsg('');
    }, 2200);
    return () => clearTimeout(t);
  }, [lastError, clearError]);

  const filtered = useMemo(() => {
    let arr = [...items];
    const t = q.trim().toLowerCase();

    if (t) {
      arr = arr.filter(p =>
        (p.nombre || '').toLowerCase().includes(t) ||
        (p.descripcion || '').toLowerCase().includes(t)
      );
    }

    const num = v => Number.isFinite(Number(v)) ? Number(v) : 0;
    if (sort === 'precio-asc') arr.sort((a, b) => num(a.precio) - num(b.precio));
    if (sort === 'precio-desc') arr.sort((a, b) => num(b.precio) - num(a.precio));

    return arr;
  }, [items, q, sort]);

  function onAdd(p) {
    add({
      id: p.id,
      nombre: p.nombre ?? '',
      precio: p.precio ?? 0,
      imagen: p.imagen_url ?? '/images/placeholder.jpg',
      stock: p.stock ?? Infinity,
    });
    if (!(Number(p.stock) <= 0)) {
      setMsg(`${p.nombre} agregado al carrito`);
      setTimeout(() => setMsg(''), 1500);
    }
  }

  return (
    <section className="catalogo" style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 16px' }}>
      <h2 className="t">Catálogo</h2>

      {/* Filtros */}
      <div className="filters">
        <div className="search">
          <span className="icon"><FaSearch size={14} /></span>
          <input
            type="search"
            placeholder="Buscar: vacío, pollo, bondiola…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}>
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
          const sinStock = Number(p.stock ?? 0) <= 0;

          // Usamos imagen_url directamente
          const imagen = p.imagen_url && p.imagen_url.trim() !== ''
            ? p.imagen_url
            : '/images/placeholder.jpg';

          return (
            <article className="card" key={p.id}>
              <div className="media">
                <ProductImage
                  url={imagen}
                  alt={p.nombre || 'Producto'}
                  basePath={import.meta.env.BASE_URL}
                />
              </div>
              <div className="body">
                <h3>{p.nombre}</h3>
                {p.descripcion && <p className="desc">{p.descripcion}</p>}
                <div className="meta">
                  {p.precio != null && (
                    <span className="price">{money(Number(p.precio) || 0)}</span>
                  )}
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
