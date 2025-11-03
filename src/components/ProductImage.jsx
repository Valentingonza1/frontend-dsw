import React from "react";
import "./ProductImage.css";

/**
 * Componente de imagen con fallback y soporte de rutas absolutas/relativas.
 */
export default function ProductImage({
  url,
  alt = "Producto",
  className = "",
  basePath = "",
  placeholder = "/images/placeholder.jpg",
}) {
  const src = resolveUrl(url, basePath) || placeholder;

  return (
    <div className={`pi-wrap ${className}`}>
      <img
        src={src}
        alt={alt || "Producto"}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.src = placeholder; }}
        className="pi-img"
      />
    </div>
  );
}

function resolveUrl(u, base) {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("/")) return u;
  return `${base}${u}`; // si viene "vacio.jpg", lo prefija con basePath/BASE_URL
}
