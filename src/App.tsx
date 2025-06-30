import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Product } from './Types';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ProductDetailPage from './pages/ProductDetailsPage/ProductDetailsPage';
import CartSidebar from './pages/CartSidebar/CartSidebar';

const App: React.FC = () => {
  const [cart, setCart] = useState<Record<string, Product>>({});
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      const quantity = existing ? (existing.quantity || 1) + 1 : 1;
      return {
        ...prev,
        [product.id]: { ...product, quantity },
      };
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        const newQty = (updated[id].quantity || 1) + delta;
        if (newQty <= 0) {
          delete updated[id];
        } else {
          updated[id].quantity = newQty;
        }
      }
      return updated;
    });
  };

  return (
    <Router>
      <div className="app-container">
        <Header onCartClick={() => setCartOpen((prev) => !prev)} />
        {isCartOpen && (
          <CartSidebar
            cart={cart}
            removeFromCart={removeFromCart}
            onClose={() => setCartOpen(false)}
            updateQuantity={updateQuantity}
          />
        )}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage onAdd={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage onAdd={addToCart} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;