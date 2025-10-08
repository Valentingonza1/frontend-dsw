import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Hero from "../components/Hero";
import { API_BASE } from "../services/api";
import "./Home.css";

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
      <Hero />

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
                  <p className="price">${Number(p.price).toLocaleString("es-AR")}</p>
                )}
                <Link className="btn" to="/productos">Comprar</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section container">
        <h2>¿Cómo comprar?</h2>
        <div className="steps">
          <div className="step"><div className="step-num">1</div><p>Elegí tus cortes en <Link to="/productos">Productos</Link>.</p></div>
          <div className="step"><div className="step-num">2</div><p>Confirmá cantidades y finalizá el pedido.</p></div>
          <div className="step"><div className="step-num">3</div><p>Retiro en local o envío a domicilio.</p></div>
        </div>
      </section>

      <section className="home-section container benefits">
        <div className="benefit"><span>🥩</span><div><h3>Cortes seleccionados</h3><p>Calidad premium todos los días.</p></div></div>
        <div className="benefit"><span>🚚</span><div><h3>Envíos en zona</h3><p>Consultá cobertura y horarios.</p></div></div>
        <div className="benefit"><span>💳</span><div><h3>Medios de pago</h3><p>Efectivo y tarjetas.</p></div></div>

        <div className="cta-strip">
          <div><h3>¿Listo para tu asado?</h3><p>Entrá al catálogo y armá tu pedido.</p></div>
          <Link className="btn btn-strong" to="/productos">Ver catálogo</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
