import React, { useState } from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import './styles.css';

function App() {
  const [cart, setCart] = useState([]);
  const [refreshCart, setRefreshCart] = useState(0);

  const triggerCartUpdate = () => {
    setRefreshCart(prev => prev + 1);
  };

  return (
    <div>
      <div className="header-container">
        <h1>Lojinha Online</h1>
      </div>

      <div className="product-list-container">
        <ProductList refreshCart={triggerCartUpdate} />
      </div>

      <div className="container">
        <Cart refreshCart={refreshCart} setCart={setCart} />
      </div>

      <div className="container">
        <Checkout cart={cart} />
      </div>
    </div>
  );
}

export default App;