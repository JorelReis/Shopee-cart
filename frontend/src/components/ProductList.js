//→ Componente que mostra os produtos disponíveis
//  Mostrar uma lista de produtos disponíveis.
//  Ter um botão "Adicionar ao Carrinho" para cada item.
//  Enviar a requisição para o backend (POST /cart/add).

import React from 'react';
import axios from 'axios';

function ProductList({ refreshCart }) {
  const products = [
    { name: 'Teclado Mecânico', price: 199.90 },
    { name: 'Mouse Gamer', price: 99.90 },
    { name: 'Monitor 24" Full HD', price: 799.90 }
  ];

  const addToCart = (product) => {
    axios.post('http://localhost:5000/cart/add', { ...product, quantity: 1 })
      .then(() => {
        alert(`${product.name} adicionado ao carrinho!`);
        refreshCart(); // Atualiza o carrinho automaticamente
      })
      .catch(error => console.error('Erro ao adicionar item:', error));
  };

  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - R$ {product.price.toFixed(2)}
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
