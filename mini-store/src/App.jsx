import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import ProductList from "./pages/ProductList.jsx";
import CartPage from "./pages/CartPage.jsx";
import { CartProvider, CartContext } from "./context/CartContext.jsx";
import "./App.css";

function Header() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <h2 className="logo">
        <Link to="/">Mini Store</Link>
      </h2>

      <nav className="nav">
        <Link to="/">Products</Link>

        <Link to="/cart" className="cart-link">
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </nav>
    </header>
  );
}

function AppContent() {
  return (
    <div className="app-container">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main className="products-page">
              <ProductList />
            </main>
          }
        />

        <Route
          path="/cart"
          element={
            <main className="cart-layout">
              <CartPage />
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}
