import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./banner.css";
import { Link } from "react-router-dom";

// Importá tus imágenes (JPG). Si además generás .webp, abajo te dejo la versión <picture/>.
import hero1 from "../assets/banner.jpg";
import hero2 from "../assets/banner2.jpg";
import hero3 from "../assets/banner3.jpg";

const slides = [
  {
    src: hero1,
    alt: "Cortes seleccionados",
    title: "Carnes Argentinas",
    subtitle: "Calidad premium todos los días",
    cta: { text: "Ver productos", to: "/productos" }
  },
  {
    src: hero2,
    alt: "Parrilla lista",
    title: "Tu asado, sin vueltas",
    subtitle: "Elegí, añadí al carrito y disfrutá",
    cta: { text: "Armar pedido", to: "/productos" }
  },
  {
    src: hero3,
    alt: "Ofertas semanales",
    title: "Ofertas de la semana",
    subtitle: "Cortes seleccionados a precio especial",
    cta: { text: "Ver ofertas", to: "/ofertas" }
  }
];

export default function Banner() {
  return (
    <div className="banner-wrap">
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        speed={900}
        loop
        slidesPerView={1}
        spaceBetween={0}
        className="banner-swiper"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            {/* Imagen de fondo */}
            <img src={s.src} className="banner-img" alt={s.alt} />
            {/* Overlay oscuro para contraste */}
            <div className="banner-overlay" />
            {/* Texto/CTA */}
            <div className="banner-cta">
              <h2 className="banner-title">{s.title}</h2>
              <p className="banner-sub">{s.subtitle}</p>
              <Link to={s.cta.to} className="btn btn-hero">
                {s.cta.text}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
