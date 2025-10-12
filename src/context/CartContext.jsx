// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // último error mostrado en UI (p.ej. STOCK INSUFICIENTE)
  const [lastError, setLastError] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function clearError() {
    setLastError("");
  }

  function add(producto, cantidad = 1) {
    if (!producto || !producto.id) return;
    const stock = Number.isFinite(Number(producto.stock)) ? Number(producto.stock) : Infinity;

    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === producto.id);
      if (i >= 0) {
        const current = prev[i];
        const nextQty = current.cantidad + cantidad;

        if (nextQty > stock) {
          setLastError("STOCK INSUFICIENTE");
          return prev; // no aumenta si supera stock
        }

        const copy = [...prev];
        copy[i] = { ...current, cantidad: nextQty };
        return copy;
      }

      const startQty = Math.max(1, Number(cantidad) || 1);
      const finalQty = startQty > stock ? (setLastError("STOCK INSUFICIENTE"), stock) : startQty;

      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre ?? "",
          precio: Number(producto.precio ?? 0),
          imagen: producto.imagen ?? "",
          stock, // guardamos stock para validar luego
          cantidad: finalQty,
        },
      ];
    });
  }

  function remove(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function setQty(id, cantidad) {
    setItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const stock = Number.isFinite(Number(x.stock)) ? Number(x.stock) : Infinity;
        const next = Math.max(1, Number(cantidad) || 1);
        if (next > stock) {
          setLastError("STOCK INSUFICIENTE");
          return { ...x, cantidad: stock };
        }
        return { ...x, cantidad: next };
      })
    );
  }

  function clear() {
    setItems([]);
  }

  const totalItems = useMemo(() => items.reduce((a, b) => a + b.cantidad, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((a, b) => a + Number(b.precio) * Number(b.cantidad), 0),
    [items]
  );

  const value = {
    items,
    add,
    remove,
    setQty,
    clear,
    totalItems,
    totalPrice,
    lastError,
    clearError,
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
