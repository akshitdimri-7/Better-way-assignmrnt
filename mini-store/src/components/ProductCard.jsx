import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);

  // find if product already in cart
  const inCart = cart.find((item) => item.id === product.id);
  const qtyInCart = inCart ? inCart.quantity : 0;

  const isOutOfStock = product.stock === 0;
  const isMaxed = qtyInCart >= product.stock;

  return (
    <div className="product-card">
      <div className="product-header">
        <h4 className="product-name">{product.name}</h4>
        <span className="product-category">{product.category}</span>
      </div>

      <img src={product.image} alt={product.name} className="product-img" />

      <p className="price">₹{product.price}</p>

      <p className={`stock ${isOutOfStock ? "out" : "in"}`}>
        {isOutOfStock
          ? "Out of Stock"
          : `In Stock: ${product.stock - qtyInCart} left`}
      </p>

      <button
        disabled={isOutOfStock || isMaxed}
        className="add-btn"
        onClick={() => addToCart(product)}
      >
        {isMaxed ? "Max Added" : "Add to Cart"}
      </button>
    </div>
  );
}
