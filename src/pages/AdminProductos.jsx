import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminProductos.css";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function cargarProductos() {
    setLoading(true);
    try {
      const res = await fetch("/api/productos");
      console.log("GET /api/productos status:", res.status);
      if (!res.ok) {
        console.error("Error HTTP al pedir productos:", res.statusText);
        setProductos([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("GET /api/productos -> raw data:", data);

      let arr = [];
      if (Array.isArray(data)) arr = data;
      else if (Array.isArray(data.data)) arr = data.data;
      else if (Array.isArray(data.rows)) arr = data.rows;
      else if (data && typeof data === "object") {
        const maybeArray = Object.values(data).filter(
          (v) => v && typeof v === "object" && "id" in v
        );
        arr = maybeArray.length ? maybeArray : [];
      }
      console.log("GET /api/productos -> normalized array length:", arr.length);
      setProductos(arr);
    } catch (err) {
      console.error("Excepción al cargar productos:", err);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }

  // TOKEN ADMIN (simulado para esta app)
  const token = "123456"; // reemplazá por el que usa tu backend si lo cambiás

  async function crearProducto(e) {
    e.preventDefault();
    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio) || 0,
      stock: parseInt(stock) || 0,
      imagen_url: imagenUrl?.trim() || "",
    };

    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoProducto),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error("POST /api/productos no ok:", res.status, txt);
        alert("Error al crear producto. Mirá la consola.");
        return;
      }
      limpiarFormulario();
      await cargarProductos();
    } catch (err) {
      console.error("Error al crear producto:", err);
      alert("Error al crear producto. Mirá la consola.");
    }
  }

  async function eliminarProducto(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error("DELETE fallo:", res.status);
        alert("Error al eliminar. Mirá la consola.");
        return;
      }
      await cargarProductos();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("Error al eliminar. Mirá la consola.");
    }
  }

  function editarProducto(producto) {
    setEditId(producto.id);
    setNombre(producto.nombre ?? "");
    setDescripcion(producto.descripcion ?? "");
    setPrecio(producto.precio ?? "");
    setStock(producto.stock ?? "");
    setImagenUrl(producto.imagen_url ?? "");
    window.scrollTo(0, 0);
  }

  async function guardarCambios(e) {
    e.preventDefault();
    if (editId == null) return;
    const productoActualizado = {
      nombre,
      descripcion,
      precio: parseFloat(precio) || 0,
      stock: parseInt(stock) || 0,
      imagen_url: imagenUrl?.trim() || "",
    };

    try {
      const res = await fetch(`/api/productos/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoActualizado),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error("PUT /api/productos/:id no ok:", res.status, txt);
        alert("Error al actualizar. Mirá la consola.");
        return;
      }
      limpiarFormulario();
      setEditId(null);
      await cargarProductos();
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      alert("Error al actualizar. Mirá la consola.");
    }
  }

  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setImagenUrl("");
  }

  return (
    <div className="admin-container">
      <h2>Admin · Productos</h2>
      <Link to="/admin" className="volver">
        Volver al panel
      </Link>

      <form onSubmit={editId ? guardarCambios : crearProducto}>
        <div className="form-row">
          <div>
            <label>Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción</label>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>Precio</label>
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div style={{ width: "100%" }}>
            <label>URL de imagen</label>
            <input
              type="text"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <button type="submit">{editId ? "Guardar cambios" : "Crear"}</button>
      </form>

      {loading ? (
        <p className="msg">Cargando...</p>
      ) : productos.length === 0 ? (
        <p className="msg">No hay productos</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{Number(p.precio).toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => editarProducto(p)}>Editar</button>
                  <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
