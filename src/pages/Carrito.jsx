
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./Carrito.css";

export default function Carrito() {
  const {
    items,
    setQty,
    remove,
    clear,
    totalItems,
    totalPrice,
    lastError,
    clearError,
  } = useCart();

  const [nombre, setNombre] = useState("");
  const [confirmado, setConfirmado] = useState(false);
  const [nombreError, setNombreError] = useState("");


  useEffect(() => {
    if (!lastError) return;
    const t = setTimeout(() => clearError(), 2000);
    return () => clearTimeout(t);
  }, [lastError, clearError]);

  useEffect(() => {
    if (nombreError && nombre.trim()) setNombreError("");
  }, [nombre, nombreError]);

  function onConfirmar() {
    if (!nombre.trim()) {
      setNombreError("Por favor, ingresá tu nombre.");
      return;
    }
    clear();
    setConfirmado(true);
  }

  if (confirmado) {
    return (
      <section className="carrito-wrap">
        <div className="confirm-panel">
          <h2 className="carrito-title">Pedido confirmado</h2>
          <p className="confirm-msg">
            <b>{nombre}</b>, su pedido fue encargado. Comuníquese con el local para retirarlo.
          </p>
          <Link to="/productos" className="btn">Volver</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="carrito-wrap">
      <h2 className="carrito-title">Carrito</h2>

      {lastError && (
        <div className="alert alert-error">
          {lastError}
        </div>
      )}

      {items.length === 0 ? (
        <div className="empty-block">
          <p>No hay productos en el carrito.</p>
          <Link to="/productos" className="btn">Volver</Link>
        </div>
      ) : (
        <>
          <div className="carrito-list">
            {items.map((it) => {
              const precio = Number(it.precio) || 0;
              const cantidad = Number(it.cantidad) || 1;
              const subtotal = precio * cantidad;
              const stock = Number.isFinite(Number(it.stock)) ? Number(it.stock) : null;

              return (
                <div className="carrito-row" key={it.id}>
                  <div className="carrito-name">
                    <strong>{it.nombre}</strong>
                    <div className="muted">${precio.toLocaleString("es-AR")}</div>
                    {stock !== null && <div className="muted small">Stock: {stock}</div>}
                  </div>

                  <div className="carrito-qty">
                    <input
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setQty(it.id, e.target.value)}
                    />
                  </div>

                  <div className="carrito-subtotal">
                    ${subtotal.toLocaleString("es-AR")}
                  </div>

                  <div className="carrito-actions">
                    <button className="link" onClick={() => remove(it.id)}>Quitar</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="carrito-resume">
            <div>Items: <b>{totalItems}</b></div>
            <div>Total: <b>${Number(totalPrice).toLocaleString("es-AR")}</b></div>
          </div>

          <div className="pedido-form">
            <label>
              Nombre de quien encarga:
              <input
                type="text"
                placeholder="Ingresar nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            {nombreError && <div className="form-error">{nombreError}</div>}
          </div>

          <div className="carrito-buttons">
            <button className="btn-outline" onClick={clear}>Vaciar</button>
            <button className="btn" onClick={onConfirmar}>Confirmar pedido</button>
          </div>
        </>
      )}
    </section>
  );
}
