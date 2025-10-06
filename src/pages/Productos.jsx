import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductsCard";
import data from "../data/products.json";
import "./Productos.css"; // usa tu hoja local de estilos

const CATEGORIES = ["Todos", "Vacuno", "Pollo", "Cerdo", "Embutidos", "Packs", "Anexos"];

export default function Productos() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState("relevancia"); // relevancia | precio-asc | precio-desc
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simula fetch de backend
    setProducts(data);
  }, []);

  const filtered = useMemo(() => {
    let arr = [...products];

    if (cat !== "Todos") arr = arr.filter(p => p.category === cat);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t));
    }

    if (sort === "precio-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") arr.sort((a, b) => b.price - a.price);

    return arr;
  }, [products, q, cat, sort]);

  return (
    <section className="catalogo">
      <h1>Catálogo</h1>

      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar: vacío, pollo, bondiola…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select value={cat} onChange={e => setCat(e.target.value)}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="relevancia">Ordenar por relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="grid-productos">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={(prod) => console.log("Agregar", prod)} />
        ))}
        {filtered.length === 0 && <p className="vacio">No se encontraron productos.</p>}
      </div>
    </section>
  );
}
