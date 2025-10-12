<<<<<<< HEAD
=======
// src/App.jsx
>>>>>>> bce9135 (carrito listo)
import './styles/App.css';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import Ofertas from './pages/Ofertas.jsx';
import Cuenta from './pages/Cuenta.jsx';
import Admin from './pages/Admin.jsx';
import AdminProductos from './pages/AdminProductos.jsx';
import AdminClientes from './pages/AdminClientes.jsx';
<<<<<<< HEAD
=======
import Carrito from './pages/Carrito.jsx';

import { CartProvider } from './context/CartContext.jsx';
>>>>>>> bce9135 (carrito listo)

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/cuenta" element={<Cuenta />} />
<<<<<<< HEAD
=======
        <Route path="/carrito" element={<Carrito />} />
        {/* Admin */}
>>>>>>> bce9135 (carrito listo)
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/clientes" element={<AdminClientes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Layout />
=======
      <CartProvider>
        <Layout />
      </CartProvider>
>>>>>>> bce9135 (carrito listo)
    </Router>
  );
}
