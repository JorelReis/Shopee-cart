import React from 'react';

function PaymentSuccessModal({ totalAmount, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagamento Aprovado!</h2>
        <p>Total pago: R$ {totalAmount ? totalAmount.toFixed(2) : "0.00"}</p>
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
}

export default PaymentSuccessModal;
