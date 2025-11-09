import { useEffect, useState } from "react";
import { api } from "../services/api";
import ProductImage from "./ProductImage";
import { useCart } from "../context/CartContext.jsx";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const { add, money } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const rows = await api("/productos?destacados=1");
        const arr = Array.isArray(rows) ? rows.slice(0, 4) : [];
        setItems(arr);
      } catch {
        setItems([]);
        setMsg("No se pudieron cargar los destacados");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function onAdd(p) {
    add({
      id: p.id,
      nombre: p.nombre ?? p.name ?? "",
      precio: p.precio ?? p.price ?? 0,
      imagen: p.imagen_url ?? p.url ?? p.imagen ?? "/images/placeholder.jpg",
      stock: p.stock ?? Infinity,
    });
    setMsg(`${p.nombre ?? p.name} agregado al carrito`);
    setTimeout(() => setMsg(""), 1200);
  }

  return (
    <section
      className="home-section like-steps fp"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}
    >
      <div className="steps-head">
        <h2 className="steps-title">PRODUCTOS DESTACADOS</h2>
        <a className="steps-link" href="/productos">
          Ver más
        </a>
      </div>

      {loading && <p className="steps-msg">Cargando…</p>}
      {msg && !loading && <p className="steps-msg">{msg}</p>}
      {!loading && !items.length && (
        <p className="steps-msg">Por ahora no hay destacados.</p>
      )}

      <div className="steps-grid steps-grid-4">
        {items.map((p) => {
          const sinStock = Number(p.stock ?? 0) <= 0;

          // --- Normalización de la imagen ---
          let raw = p.imagen_url || p.url || p.imagen;
          if (!raw) {
            raw = "/images/placeholder.jpg";
          } else if (!/^https?:\/\//i.test(raw)) {
            raw = `http://localhost:3000/${raw.replace(/^\/+/, "")}`;
          }
          const normalized = raw;
          const alt = p.alt_text || p.nombre || "Producto";
          // ----------------------------------

          return (
            <article className="steps-card" key={p.id}>
              <div className="steps-media">
                <ProductImage url={normalized} alt={alt} />
              </div>

              <div className="steps-body">
                <h3 className="steps-name">{p.nombre}</h3>
                <div className="steps-meta">
                  {p.precio != null && (
                    <span className="steps-price">
                      {money(Number(p.precio) || 0)}
                    </span>
                  )}
                  {"stock" in p && (
                    <span className={`steps-badge ${sinStock ? "out" : ""}`}>
                      {sinStock ? "Sin stock" : `Stock: ${p.stock}`}
                    </span>
                  )}
                </div>

                <button
                  className="steps-btn"
                  onClick={() => onAdd(p)}
                  disabled={sinStock}
                  title={sinStock ? "Sin stock" : "Agregar al carrito"}
                >
                  {sinStock ? "Sin stock" : "Agregar al carrito"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
