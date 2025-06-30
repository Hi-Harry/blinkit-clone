import React from 'react';
import './Button.css';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button className={`custom-button ${className}`} {...props}>{children}</button>
);