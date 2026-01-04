import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data = await res.json();

        const formatted = data.products.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          category: p.category,
          stock: p.stock,
          image: p.thumbnail,
        }));

        setProducts(formatted);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = useMemo(() => {
    let data = [...products];

    if (search)
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    if (category) data = data.filter((p) => p.category === category);

    if (sort === "low") data.sort((a, b) => a.price - b.price);

    if (sort === "high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [search, category, sort, products]);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-container">
      <h2 className="products-title">Products</h2>

      <div className="filters">
        <input
          className="search-input"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        <button
          className="clear-btn"
          onClick={() => {
            setSearch("");
            setCategory("");
            setSort("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="empty-products">No products found</p>
      )}

      <div className="products-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
