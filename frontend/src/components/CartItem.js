//→ Componente de cada item do carrinho

import React from 'react';
import axios from 'axios';

function CartItem({ item, updateCart }) {
  if (!item) {
    return null; // Se o item for undefined, não renderiza nada
  }

  // Garante que item.price existe antes de chamar toFixed()
  const subtotal = item.price ? (item.price * item.quantity).toFixed(2) : "0.00";

  const increaseQuantity = () => {
    axios.post('http://localhost:5000/cart/increase', { name: item.name })
      .then(response => updateCart(response.data))
      .catch(error => console.error('Erro ao aumentar quantidade:', error));
  };

  const decreaseQuantity = () => {
    axios.post('http://localhost:5000/cart/decrease', { name: item.name })
      .then(response => updateCart(response.data))
      .catch(error => console.error('Erro ao diminuir quantidade:', error));
  };

  const removeItem = () => {
    axios.delete(`http://localhost:5000/cart/delete/${item.name}`)
      .then(response => updateCart(response.data))
      .catch(error => console.error('Erro ao remover item:', error));
  };

  return (
    <li className="cart-item">
      <span className="item-info">
        {item.name} - R$ {item.price ? item.price.toFixed(2) : "0.00"} | 
        <strong> Subtotal: R$ {subtotal} </strong>
      </span>

      <div className="cart-controls">
        <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
        <span className="item-quantity">{item.quantity}</span>
        <button className="quantity-btn" onClick={increaseQuantity}>+</button>
        <button className="remove-btn" onClick={removeItem}>🗑 Remover</button>
      </div>
    </li>
  );
}

export default CartItem;


