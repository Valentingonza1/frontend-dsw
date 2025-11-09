// src/components/ProductImage.jsx
export default function ProductImage({ url, alt }) {
  if (!url) {
    return <img src="/images/placeholder.jpg" alt={alt || "Producto"} />;
  }

  // Si la URL ya es absoluta (http o https), la usamos tal cual
  const isAbsolute = /^https?:\/\//i.test(url);
  const src = isAbsolute ? url : `/${url.replace(/^\/+/, '')}`;

  return <img src={src} alt={alt || "Producto"} />;
}
