import './styles/App.css';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

>>>>>>> aac2e47e68cce33916fff863b8d796190bc2f354
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Banner from './components/banner';
<<<<<<< HEAD

import Productos from './pages/Productos';
import Locales from './pages/Locales';
import Ofertas from './pages/Ofertas';
import Contacto from './pages/Contacto';
import Cuenta from './pages/Cuenta';

function AppWrapper() {
  const location = useLocation();
  const mostrarFooter = location.pathname === '/locales';
=======

import Productos from './pages/Productos'; // O donde esté el archivo correcto
// Si tenés otras páginas como Locales, Ofertas, etc., también importalas.
>>>>>>> aac2e47e68cce33916fff863b8d796190bc2f354

  return (
<<<<<<< HEAD
    <>
=======
    <Router>
>>>>>>> aac2e47e68cce33916fff863b8d796190bc2f354
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Hero />
          </>
        } />
        <Route path="/productos" element={<Productos />} />
<<<<<<< HEAD
        <Route path="/locales" element={<Locales />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cuenta" element={<Cuenta />} />
      </Routes>
      {mostrarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
=======
        {/* Agregá más rutas si hacés más páginas */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
>>>>>>> aac2e47e68cce33916fff863b8d796190bc2f354
