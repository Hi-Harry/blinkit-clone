import { useEffect, useState } from "react";
import { Product } from "../../Types";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./HomePage.css";

const HomePage: React.FC<{ onAdd: (product: Product) => void }> = ({ onAdd }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const resp = await (await fetch("https://fakestoreapi.in/api/products")).json();
    const data = resp.products;
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default HomePage;