//arquivo específico para gerenciar a conexão com o RabbitMQ.

import amqplib from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost';

async function sendToQueue(queue, message) {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

    console.log(`📩 Mensagem enviada para a fila "${queue}":`, message);
    
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Erro ao enviar mensagem para a fila:', error);
  }
}

export { sendToQueue };
