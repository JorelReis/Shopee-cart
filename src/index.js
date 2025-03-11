import express from 'express';
import cors from 'cors';
import * as cartService from './services/cart.js';
import createItem from './services/item.js';
// Express cria o servidor e gerencia as requisições.
// CORS permite que o react acesse a API

const app = express();
app.use(express.json());
app.use(cors());

const mycart = [];

// Rota para buscar o carrinho
app.get('/cart', (req, res) => {
  res.json(mycart);
});

// Rota para adicionar um item ao carrinho
app.post('/cart/add', async (req, res) => {
  const { name, price, quantity } = req.body;
  const item = await createItem(name, price, quantity);
  await cartService.addItem(mycart, item);
  res.json(mycart);
});


// Rota para remover um item (reduzir quantidade)
app.post('/cart/remove', async (req, res) => {
  const { name } = req.body;
  await cartService.removeItem(mycart, { name });
  res.json(mycart);
});

// Rota para deletar um item completamente
app.delete('/cart/delete/:name', async (req, res) => {
  const name = req.params.name;
  await cartService.deleteItem(mycart, name);
  res.json(mycart);
});

// Rota para calcular o total
app.get('/cart/total', async (req, res) => {
    const total = mycart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    res.json({ total });
  });
  
// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Rota para aumentar a quantidade de um item
app.post('/cart/increase', async (req, res) => {
  const { name } = req.body;
  const item = mycart.find(p => p.name === name);
  if (item) {
    item.quantity += 1;
  }
  res.json(mycart);
});

// Rota para diminuir a quantidade de um item (se for 1, remove)
app.post('/cart/decrease', async (req, res) => {
  const { name } = req.body;
  const itemIndex = mycart.findIndex(p => p.name === name);

  if (itemIndex !== -1) {
    if (mycart[itemIndex].quantity > 1) {
      mycart[itemIndex].quantity -= 1;
    } else {
      mycart.splice(itemIndex, 1); // Remove se a quantidade for 1
    }
  }
  res.json(mycart);
});

import { sendToQueue } from './services/rabbitmq.js';

// Rota para iniciar o pagamento
app.post('/checkout', async (req, res) => {
  const { cardNumber, totalAmount } = req.body;

  if (!cardNumber || !totalAmount) {
    return res.status(400).json({ error: 'Número do cartão e total são obrigatórios!' });
  }

  const paymentData = {
    cardNumber,
    totalAmount,
    status: 'PROCESSANDO'
  };

  await sendToQueue('pagamentos', paymentData);

  res.json({ message: 'Pagamento enviado para processamento', paymentData });
});

import { WebSocketServer } from 'ws';
import amqplib from 'amqplib';

const wss = new WebSocketServer({ port: 8080 });

console.log("📡 WebSocket Server rodando na porta 8080...");

// Conectar ao RabbitMQ e escutar a fila de respostas
async function listenForPaymentResponses() {
  try {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('respostas_pagamento', { durable: true });

    console.log("🎧 Escutando respostas de pagamento...");

    channel.consume('respostas_pagamento', (msg) => {
      if (msg !== null) {
        const paymentResponse = JSON.parse(msg.content.toString());

        console.log("📩 Enviando resposta para o frontend:", paymentResponse);

        // Enviar para todos os clientes WebSocket conectados
        wss.clients.forEach(client => {
          if (client.readyState === 1) { // 1 significa "open"
            client.send(JSON.stringify(paymentResponse));
          }
        });

        // Confirmar que a mensagem foi processada
        channel.ack(msg);
      }
    });

  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}

listenForPaymentResponses();
