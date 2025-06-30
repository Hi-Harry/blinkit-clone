import React from 'react';
import { Button } from '../../ui/Button';
import { ShoppingCart } from 'lucide-react';
import './Header.css'; 

const Header: React.FC<{ onCartClick: () => void }> = ({ onCartClick }) => (
  <header className="header">
    <h1 className="header-title">Blinkit Clone</h1>
    <Button className="cart-button" onClick={onCartClick} aria-label="Cart">
      <ShoppingCart className="cart-icon" />
    </Button>
  </header>
);

export default Header;