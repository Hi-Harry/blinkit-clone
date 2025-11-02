import { useEffect, useState } from "react";
import { Product } from "../../Types";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./HomePage.css";

const HomePage: React.FC<{ onAdd: (product: Product) => void }> = ({
  onAdd,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const data = await (
      await fetch("https://fakestoreapi.com/products")
    ).json();
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
