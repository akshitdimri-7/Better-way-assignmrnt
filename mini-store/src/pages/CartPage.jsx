import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "./CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return <p className="empty-cart">Your cart is empty</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          
          <div className="cart-left">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-img"
            />

            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">₹{item.price}</p>
            </div>
          </div>

          <div className="cart-actions">
            <input
              type="number"
              min="1"
              max={item.stock}
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, Number(e.target.value))
              }
              className="qty-input"
            />

            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <p>
          Total Items: <strong>{cart.length}</strong>
        </p>
        <p>
          Total Price: <strong>₹{total}</strong>
        </p>
      </div>
    </div>
  );
}
