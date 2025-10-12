import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import { API_BASE } from "../services/api";
import "./Home.css";
import HowToBuy from "../components/howtobuy"; // <— mayúsculas

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/productos`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) =>
        (Array.isArray(rows) ? rows : [])
          .slice(0, 4)
          .map((p) => ({
            id: p.id,
            name: p.nombre,
            price: p.precio,
            image: p.imagen || "/images/placeholder.jpg",
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

  return (
    <>
      <Banner />

      <section className="home-section container">
        <div className="home-heading">
          <h2>Ofertas y destacados</h2>
          <Link to="/ofertas" className="link">Ver más</Link>
        </div>

        <div className="home-grid">
          {(featured.length ? featured : fallback).map((p) => (
            <div className="home-card" key={p.id}>
              <div className="home-card-media">
                <img src={p.image} alt={p.name} loading="lazy" />
              </div>
              <div className="home-card-body">
                <h3>{p.name}</h3>
                {"price" in p && (
                  <p className="price">
                    ${Number(p.price).toLocaleString("es-AR")}
                  </p>
                )}
                <Link className="btn" to="/productos">Comprar</Link>
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
