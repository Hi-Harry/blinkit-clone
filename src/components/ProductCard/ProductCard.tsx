import { useNavigate } from "react-router-dom";
import { Product } from "../../Types";
import { Button } from "../../ui/Button";
import "./ProductCard.css";

const ProductCard: React.FC<{
  product: Product;
  onAdd: (p: Product) => void;
}> = ({ product, onAdd }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">
        {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
      </h3>
      <p className="product-price">${product.price}</p>
      <Button
        className="add-button"
        onClick={(e) => {
          e.stopPropagation();
          onAdd(product);
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default ProductCard;