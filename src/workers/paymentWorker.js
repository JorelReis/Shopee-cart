channel.consume(QUEUE_NAME, async (msg) => {
  const paymentData = JSON.parse(msg.content.toString());

  console.log("💰 Processando pagamento: ", paymentData);

  // Simulação de processamento de pagamento
  setTimeout(() => {
    const isApproved = Math.random() > 0.3; // 70% de chance de aprovação
    const response = {
      cardNumber: paymentData.cardNumber,
      totalAmount: paymentData.totalAmount,
      status: isApproved ? "APROVADO" : "RECUSADO"
    };

    console.log(isApproved ? `✅ Pagamento Aprovado para o cartão ${response.cardNumber}` : `❌ Pagamento Recusado para o cartão ${response.cardNumber}`);

    // Envia a resposta para o WebSocket
    ws.onmessage = (event) => {
      const paymentResponse = JSON.parse(event.data);
    
      if (paymentResponse.status === "APROVADO") {
        setStatus(`Pagamento APROVADO! Total: R$ ${paymentResponse.totalAmount?.toFixed(2) || "0.00"}`);
        setModalOpen(true);
      } else {
        setStatus('Erro no pagamento.');
      }
    
      setIsProcessing(false);
    };

  }, 3000); // Simula tempo de processamento
}, { noAck: true });
