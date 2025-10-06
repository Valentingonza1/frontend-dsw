import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ofertas from './pages/Ofertas'; 
import Locales from './pages/Locales';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos'; // O donde esté el archivo correcto
import Home from './pages/Home';
// Si tenés otras páginas como Locales, Ofertas, etc., también importalas.

function App() {
  return (
    <div>
    <Router>
      <Navbar />

      {/* Acá vamos a poner el Hero con la imagen grande */}
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        
        
        
        <Route path="/productos" element={<Productos />} />
        <Route path="/locales" element={<Locales />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Agregá más rutas si hacés más páginas */}
      </Routes>
      <Footer />
</Router>
    </div>
    
  );
}

export default App;
