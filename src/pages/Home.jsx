import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import { API_BASE } from "../services/api";
import "./Home.css";
import HowToBuy from "../components/HowToBuy"; // ✅ corregido: mayúsculas
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "../components/ProductImage";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const { add, money } = useCart(); // ✅ usamos el contexto del carrito

  useEffect(() => {
    fetch(`${API_BASE}/productos`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) =>
        (Array.isArray(rows) ? rows : [])
          .slice(0, 4)
          .map((p) => ({
            id: p.id,
            name: p.nombre, // tu API viene en español
            price: p.precio,
            image: p.imagen || "/images/placeholder.jpg",
            stock: p.stock ?? Infinity,
          }))
      )
      .then(setFeatured)
      .catch(() => setFeatured([]));
  }, []);

  const fallback = [
    { id: "a", name: "Asado de tira", price: 8200, image: "/images/asado.jpg" },
    { id: "b", name: "Bondiola", price: 7200, image: "/images/bondiola.jpg" },
    { id: "c", name: "Pack Parrillero (4 pers.)", price: 25900, image: "/images/pack-parrillero.jpg" },
    { id: "d", name: "Vacio", price: 9300, image: "/images/vacio.jpg" },
  ];

  const data = featured.length ? featured : fallback;

  return (
    <>
      <Banner />

      <section className="home-section container">
        <div className="home-heading">
          <h2>Ofertas y destacados</h2>
          <Link to="/ofertas" className="link">Ver más</Link>
        </div>

        <div className="home-grid">
          {data.map((p) => (
            <div className="home-card" key={p.id}>
              <div className="home-card-media">
                <ProductImage url={p.image} alt={p.name} />
              </div>
              <div className="home-card-body">
                <h3>{p.name}</h3>

                {"price" in p && (
                  <p className="price">{money(Number(p.price) || 0)}</p> // ✅ formato ARS
                )}

                {/* ✅ botón que agrega al carrito */}
                <button
                  className="btn"
                  onClick={() =>
                    add({
                      id: p.id,
                      // el contexto acepta name/price/image o nombre/precio/imagen
                      name: p.name,
                      price: p.price,
                      image: p.image,
                      stock: p.stock ?? Infinity,
                    })
                  }
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ sección moderna con pasos */}
      <HowToBuy />

      {/* …resto del Home (beneficios, CTA, footer)… */}
    </>
  );
};

export default Home;
