import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Banner from './components/banner';

import Productos from './pages/Productos';
import Locales from './pages/Locales';
import Ofertas from './pages/Ofertas';
import Contacto from './pages/Contacto';
import Cuenta from './pages/Cuenta';

function AppWrapper() {
  const location = useLocation();
  const mostrarFooter = location.pathname === '/locales';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Hero />
          </>
        } />
        <Route path="/productos" element={<Productos />} />
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