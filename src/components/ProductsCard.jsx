export default function ProductCard({ product, onAdd }) {
  const { name, category, price, image, unit } = product;

  return (
    <div className="producto-card">
      <div className="producto-media">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="producto-body">
        <h3 className="producto-title">{name}</h3>
        <p className="producto-cat">{category}</p>
        <p className="producto-precio">
          ${price.toLocaleString("es-AR")} {unit === "kg" ? "/ kg" : unit === "unidad" ? "/ un." : ""}
        </p>
        {onAdd && (
          <button className="btn-agregar" onClick={() => onAdd(product)}>
            Agregar
          </button>
        )}
      </div>
    </div>
  );
}
