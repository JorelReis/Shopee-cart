//→ Componente do carrinho
//Buscar os itens do carrinho no backend
//Exibir os produtos no carrinho
//Permitir remover itens

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

function Cart({ refreshCart, setCart }) {
  const [cart, setLocalCart] = useState([]);

  // Função para buscar os itens do carrinho no backend
  const fetchCart = useCallback(() => {
    axios
      .get('http://localhost:5000/cart')
      .then((response) => {
        setLocalCart(response.data); // Atualiza o estado do carrinho local
        setCart(response.data); // Atualiza o estado global do carrinho
      })
      .catch((error) => console.error('Erro ao buscar o carrinho:', error));
  }, [setCart]); // Adicionando setCart como dependência para evitar warning

  useEffect(() => {
    fetchCart();
  }, [refreshCart, fetchCart]); // ✅ Agora inclui fetchCart corretamente

  return (
    <div className="container">
      <h2>Meu Carrinho</h2>
      <ul className="cart-list">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem key={item.name} item={item} updateCart={fetchCart} />
          ))
        ) : (
          <p>O carrinho está vazio.</p>
        )}
      </ul>
    </div>
  );
}

export default Cart;
