import { Link } from "react-router-dom";
import "./howto.css";

const STEPS = [
  {
    id: 1,
    title: "Elegí tus cortes",
    desc: <>Explorá el <Link to="/productos">catálogo</Link> y agregá al carrito.</>,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4h-2a1 1 0 0 0-1 1v1h2l2.4 8.1A2 2 0 0 0 10.3 15h7.4a2 2 0 0 0 1.9-1.4l2.1-7.1A1 1 0 0 0 21.7 5H8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="19.5" r="1.5"/>
        <circle cx="18" cy="19.5" r="1.5"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Confirmá tu pedido",
    desc: "Revisá cantidades y dejá notas (ej: grosor o peso aprox.).",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m15 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Elegí entrega o retiro",
    desc: "Envío en Rosario o retiro por Urquiza 1020 según horarios.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="18" r="1.7"/><circle cx="18" cy="18" r="1.7"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Pagá y ¡listo!",
    desc: "Efectivo o tarjetas. Te confirmamos por WhatsApp.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="6" y="11" width="7" height="2" rx="1"/>
      </svg>
    ),
  },
];

export default function HowToBuy() {
  return (
    <section className="home-section howto">
      <div className="container">
        <header className="howto__head">
          <h2 className="home-section__title">¿CÓMO COMPRAR?</h2>
          <p className="howto__sub">Son solo cuatro pasos. Si tenés dudas, te asistimos por WhatsApp.</p>
        </header>

        <ol className="howto__grid">
          {STEPS.map(s => (
            <li key={s.id} className="step-card">
              <span className="step-card__num">{s.id}</span>
              <div className="step-card__icon" aria-hidden="true">{s.icon}</div>
              <h3 className="step-card__title">{s.title}</h3>
              <p className="step-card__desc">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="howto__cta">
          <Link to="/productos" className="btn howto__btn">Ver catálogo</Link>
        </div>
      </div>
    </section>
  );
}
