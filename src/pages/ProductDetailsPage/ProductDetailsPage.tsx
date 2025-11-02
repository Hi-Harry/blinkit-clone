import { useCallback, useEffect, useState } from "react";
import { Product } from "../../Types";
import { useParams } from "react-router-dom";
import { Button } from "../../ui/Button";
import "./ProductDetailsPage.css";

const ProductDetailPage: React.FC<{ onAdd: (product: Product) => void }> = ({
  onAdd,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const filterProduct = useCallback(async () => {
    try {
      const products = await (
        await fetch("https://fakestoreapi.com/products")
      ).json();
      const filteredProduct = products.find((product: any) => product.id == id);
      if (filteredProduct) {
        setProduct(filteredProduct);
        setSelectedImage(filteredProduct.image);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }, [id]);

  useEffect(() => {
    filterProduct();
  }, [id, filterProduct]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-page">
      <div>
        <img
          src={selectedImage}
          alt={product.title}
          className="product-detail-image"
        />
      </div>

      <div>
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price}</p>
        <div className="product-detail-action">
          <Button
            className="add-to-cart-button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
          >
            Add to bag
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
