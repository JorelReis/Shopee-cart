//→ Componente de cada item do carrinho

import React from 'react';
import axios from 'axios';

function CartItem({ item, updateCart }) {
  const subtotal = (item.price * item.quantity).toFixed(2);

  // Função para aumentar a quantidade
  const increaseQuantity = () => {
    axios
      .post('http://localhost:5000/cart/increase', { name: item.name })
      .then((response) => updateCart(response.data)) // Atualiza o carrinho corretamente
      .catch((error) => console.error('Erro ao aumentar quantidade:', error));
  };

  // Função para diminuir a quantidade
  const decreaseQuantity = () => {
    axios
      .post('http://localhost:5000/cart/decrease', { name: item.name })
      .then((response) => updateCart(response.data)) // Atualiza o carrinho corretamente
      .catch((error) => console.error('Erro ao diminuir quantidade:', error));
  };

  // Função para remover o item do carrinho
  const removeItem = () => {
    axios
      .delete(`http://localhost:5000/cart/delete/${item.name}`)
      .then((response) => updateCart(response.data)) // Atualiza o carrinho corretamente
      .catch((error) => console.error('Erro ao remover item:', error));
  };

  return (
    <li className="cart-item">
      <span className="item-info">
        {item.name} - R$ {item.price.toFixed(2)} | {item.quantity}x |{' '}
        <strong>Subtotal: R$ {subtotal}</strong>
      </span>

      <div className="cart-controls">
        <button className="quantity-btn" onClick={decreaseQuantity}>
          -
        </button>
        <span className="item-quantity">{item.quantity}</span>
        <button className="quantity-btn" onClick={increaseQuantity}>
          +
        </button>
        <button className="remove-btn" onClick={removeItem}>
          🗑 Remover
        </button>
      </div>
    </li>
  );
}

export default CartItem;
