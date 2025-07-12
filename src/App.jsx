import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Banner from './components/banner';

import Productos from './pages/Productos'; // O donde esté el archivo correcto
// Si tenés otras páginas como Locales, Ofertas, etc., también importalas.

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Hero />
          </>
        } />
        <Route path="/productos" element={<Productos />} />
        {/* Agregá más rutas si hacés más páginas */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
