import amqp, { Channel, Connection } from 'amqplib';

let channel: Channel;
let chanes
export async function connectRabbitMQ(retries = 10, interval = 5000) {
  while (retries) {
    try {
      const connection = await amqp.connect(
        process.env.RABBITMQ_URL || 'amqp://localhost'
      );
      channel = await connection.createChannel();
      console.log('✅ RabbitMQ Connected (Product Service)');
      return;
    } catch (error) {
      console.error(
        `❌ RabbitMQ Connection Error: ${error}. Retrying in ${interval / 1000}s...`
      );
      retries -= 1;
      await new Promise((res) => setTimeout(res, interval));
    }
  }
  throw new Error('❌ Could not connect to RabbitMQ after multiple attempts');
}

export function getChannel(): Channel {
  if (!channel) {
    throw new Error('RabbitMQ Channel is not initialized');
  }
  return channel;
}
