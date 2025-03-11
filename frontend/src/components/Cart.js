//→ Componente do carrinho
//Buscar os itens do carrinho no backend
//Exibir os produtos no carrinho
//Permitir remover itens

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

function Cart({ refreshCart, setCart }) {
  const [cart, setLocalCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(response => {
        console.log("Dados do carrinho:", response.data);
        setLocalCart(response.data);
        setCart(response.data); // 🔥 Atualiza o estado global do carrinho
      })
      .catch(error => console.error('Erro ao buscar carrinho:', error));
  }, [refreshCart, setCart]); // ✅ Agora inclui `setCart` corretamente

  if (!cart || cart.length === 0) {
    return <div className="container"><h2>Meu Carrinho</h2><p>O carrinho está vazio.</p></div>;
  }

  return (
    <div className="container">
      <h2>Meu Carrinho</h2>
      <ul className="cart-list">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} updateCart={setCart} />
        ))}
      </ul>
    </div>
  );
}

export default Cart;
