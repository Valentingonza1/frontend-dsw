import './footer.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>Contacto y horarios de atención</h3>
        <p><FaPhoneAlt /> 3415 81-0701</p>
        <p><FaWhatsapp /> 3415 81-0701</p>
        <p><FaClock /> Lun a Vie 7:30–20:30 | Sáb 8–13:30 y 17:30–20 | Dom 9–13</p>
        <p><FaMapMarkerAlt /> Urquiza 1020 - Rosario</p>
      </div>
      <div className="footer-map">
        <h3 className="map-title">Encontranos</h3>
        <iframe
          title="Ubicación"
          src="https://www.google.com/maps?q=Urquiza%201020%20Rosario&output=embed"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
}
