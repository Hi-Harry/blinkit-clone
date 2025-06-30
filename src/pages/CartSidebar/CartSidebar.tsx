import React from "react";
import { Product } from "../../Types";
import { Button } from "../../ui/Button";
import "./CartSidebar.css"; // Assuming you have a CSS file for styling

const CartSidebar: React.FC<{
  cart: Record<string, Product & { quantity?: number }>;
  removeFromCart: (id: string) => void;
  onClose?: () => void;
  updateQuantity?: (id: string, delta: number) => void;
}> = ({ cart, removeFromCart, onClose, updateQuantity }) => {
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-sidebar">
      <div>
        <div className="cart-sidebar-header">
          <h2 className="cart-sidebar-title">Your Cart</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="cart-close-button"
              aria-label="Close cart"
            >
              ✕
            </button>
          )}
        </div>

        {Object.values(cart).length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          Object.values(cart).map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-title">{product.title}</p>
                <p className="cart-item-price">
                  ${product.price.toFixed(2)} x {product.quantity || 1}
                </p>
                <div className="cart-quantity-controls">
                  <Button onClick={() => updateQuantity?.(product.id, -1)}>-</Button>
                  <span>{product.quantity || 1}</span>
                  <Button onClick={() => updateQuantity?.(product.id, +1)}>+</Button>
                </div>
                <Button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button className="checkout-button">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSidebar;