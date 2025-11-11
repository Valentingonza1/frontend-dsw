
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);
const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });


  const [lastError, setLastError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  function clearError() {
    setLastError("");
  }


  function add(producto, cantidad = 1) {
    if (!producto || !producto.id) return;

    const nombre = producto.nombre ?? producto.name ?? "";
    const precio = Number(producto.precio ?? producto.price ?? 0);
    const imagen = producto.imagen ?? producto.image ?? "";
    const stockSrc = producto.stock;
    const stock = Number.isFinite(Number(stockSrc)) ? Number(stockSrc) : Infinity;

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === producto.id);
      if (idx >= 0) {
        const current = prev[idx];
        const nextQty = current.cantidad + cantidad;
        if (nextQty > stock) {
          setLastError("STOCK INSUFICIENTE");
          return prev;
        }
        const copy = [...prev];
        copy[idx] = { ...current, cantidad: nextQty };
        return copy;
      }

      const startQty = Math.max(1, Number(cantidad) || 1);
      const finalQty = startQty > stock ? (setLastError("STOCK INSUFICIENTE"), stock) : startQty;

      return [
        ...prev,
        { id: producto.id, nombre, precio, imagen, stock, cantidad: finalQty },
      ];
    });
  }

  function remove(id) { setItems((prev) => prev.filter((x) => x.id !== id)); }

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

  function clear() { setItems([]); }

  const totalItems = useMemo(() => items.reduce((a, b) => a + b.cantidad, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((a, b) => a + Number(b.precio) * Number(b.cantidad), 0),
    [items]
  );

  const money = (n) =>
    Number(n || 0).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

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
    money,
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
