// src/components/ProductImage.jsx
import React from "react";
import "./ProductImage.css";

/**
 * url puede venir completa o relativa.
 * basePath permite prefijar (ej. desde CDN).
 */
export default function ProductImage({
  url,
  alt = "",
  className = "",
  basePath = "",
  widths = [320, 640, 960],
  placeholder = "/images/placeholder.jpg",
}) {
  const cleanAlt = alt || "Producto";
  const src = resolveUrl(url, basePath) || placeholder;

  // para srcset generamos variantes si la imagen es estática (misma ruta)
  const srcSetJpg = widths.map(w => `${src}?w=${w} ${w}w`).join(", ");
  const srcSetWebp = widths.map(w => `${toWebp(src)}?w=${w} ${w}w`).join(", ");
  const srcSetAvif = widths.map(w => `${toAvif(src)}?w=${w} ${w}w`).join(", ");

  return (
    <div className={`pi-wrap ${className}`}>
      <div className="pi-shimmer" aria-hidden="true" />
      <picture>
        {/* AVIF */}
        <source type="image/avif" srcSet={srcSetAvif} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw" />
        {/* WEBP */}
        <source type="image/webp" srcSet={srcSetWebp} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw" />
        {/* JPG/PNG fallback */}
        <img
          src={src}
          srcSet={srcSetJpg}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          alt={cleanAlt}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.src = placeholder; }}
          className="pi-img"
        />
      </picture>
    </div>
  );
}

function resolveUrl(u, base) {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("/")) return u;
  return `${base}${u}`; // si guardás solo el nombre de archivo
}

function toWebp(u) {
  return u.replace(/\.(jpg|jpeg|png)$/i, ".webp");
}
function toAvif(u) {
  return u.replace(/\.(jpg|jpeg|png|webp)$/i, ".avif");
}
