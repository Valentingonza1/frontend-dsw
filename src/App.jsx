import './styles/App.css';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import Ofertas from './pages/Ofertas.jsx';
import Cuenta from './pages/Cuenta.jsx';
import CuentaAdmin from './pages/CuentaAdmin.jsx';
import Admin from './pages/Admin.jsx';
import AdminProductos from './pages/AdminProductos.jsx';
import AdminClientes from './pages/AdminClientes.jsx';
import Carrito from './pages/Carrito.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import { CartProvider } from './context/CartContext.jsx';

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/cuenta" element={<Cuenta />} />
        <Route path="/cuenta-admin" element={<CuentaAdmin />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/productos" element={<ProtectedRoute><AdminProductos /></ProtectedRoute>} />
        <Route path="/admin/clientes" element={<ProtectedRoute><AdminClientes /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}