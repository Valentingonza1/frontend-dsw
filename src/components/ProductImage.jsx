
export default function ProductImage({ url, alt }) {
  if (!url) {
    return <img src="/images/placeholder.jpg" alt={alt || "Producto"} />;
  }


  const isAbsolute = /^https?:\/\//i.test(url);
  const src = isAbsolute ? url : `/${url.replace(/^\/+/, '')}`;

  return <img src={src} alt={alt || "Producto"} />;
}
