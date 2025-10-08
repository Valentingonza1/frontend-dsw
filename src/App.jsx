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

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/cuenta" element={<Cuenta />} />
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
      <Layout />
    </Router>
  );
}
