import React from 'react';
import './Button.scss';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', className = '', disabled = false }) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;