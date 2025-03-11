import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentSuccessModal from './PaymentSuccessModal'; // Certifique-se de importar o modal

function Checkout({ cart }) {
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  // Calcula o total baseado nos itens do carrinho
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const paymentResponse = JSON.parse(event.data);
      
      if (paymentResponse.status === "APROVADO") {
        setStatus(`Pagamento APROVADO! Total: R$ ${paymentResponse.totalAmount.toFixed(2)}`);
        setModalOpen(true); // Exibir modal de sucesso
      } else {
        setStatus('Erro no pagamento.');
      }

      setIsProcessing(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handlePayment = () => {
    if (!cardNumber) {
      setStatus("Insira um número de cartão válido.");
      return;
    }

    setIsProcessing(true);
    setStatus('Processando pagamento...');

    // 🔹 Delay de 3 segundos antes de enviar a requisição
    setTimeout(() => {
        axios.post('http://localhost:5000/checkout', {
          cardNumber,
          totalAmount: parseFloat(totalAmount)
        })
        .catch(() => setStatus('Erro ao processar pagamento.'));
    }, 3000); // ⏳ 3 segundos de delay antes de processar
};

  return (
    <div className="container">
      <h2>Finalizar Compra</h2>
      <strong>Total a pagar:</strong> R$ {totalAmount}
      <input 
        type="text"
        placeholder="Número do Cartão"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processando...' : 'Pagar'}
      </button>
      <p>{status}</p>

      {modalOpen && <PaymentSuccessModal totalAmount={parseFloat(totalAmount)} closeModal={() => setModalOpen(false)} />}

    </div>
  );
}

export default Checkout;
