import { useEffect, useState } from 'react';
import './Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error('Error al traer productos:', err));
  }, []);

  return (
    <section id="productos" className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Stock:</strong> {producto.stock} unidades</p>
        </div>
      ))}
    </section>
  );
}

export default Productos;

