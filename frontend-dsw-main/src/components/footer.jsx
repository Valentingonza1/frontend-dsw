import './Footer.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>Contacto</h3>
        <p><FaPhoneAlt /> 3415 81-0701</p>
        <p><FaWhatsapp /> 3415 81-0701</p>
        <p><FaClock /> Lun a Vie 7:30hs a 20:30hs | Sáb de 8hs a 13:30hs y 17:30hs a 20hs | Domingo 9hs a 13hs</p>
        <p><FaMapMarkerAlt /> Urquiza 1020 - S2000GFE, Rosario</p>
      </div>

      <div className="footer-map">
        <h3 className="map-title">Encontranos</h3>
        <iframe
          title="Ubicación Carnicería"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.2453037989464!2d-60.6667!3d-32.9442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU2JzM5LjIiUyA2MMKwNDAnMDAuMCJX!5e0!3m2!1ses!2sar!4v1627746845891!5m2!1ses!2sar"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </footer>
  );
}

export default Footer;
