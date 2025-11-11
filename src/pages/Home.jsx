import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import { API_BASE } from "../services/api";
import "./Home.css";
import HowToBuy from "../components/HowToBuy"; // ✅ corregido: mayúsculas
import { useCart } from "../context/CartContext.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";


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
      <FeaturedProducts />
      <HowToBuy />
    </>
  );
};

export default Home;
