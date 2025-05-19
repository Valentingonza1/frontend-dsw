import { useEffect, useState } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error('Error al traer productos:', err));
  }, []);

  return (
    <div>
      <h1>Productos disponibles</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> - {producto.descripcion} - ${producto.precio} ({producto.stock} unidades)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
