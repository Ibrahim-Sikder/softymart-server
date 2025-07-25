import amqp from 'amqplib';
import { Tenant } from '../tenant/tenant.model';

export async function connectRabbitMQUserService() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue('tenant_info_request', { durable: false });
    await channel.assertQueue('tenant_info_response', { durable: false });

    console.log('✅ RabbitMQ Connected (User Service)');

    channel.consume('tenant_info_request', async (msg) => {
      if (msg) {
        const { tenantId } = JSON.parse(msg.content.toString());

        const tenant = await Tenant.findById(tenantId).lean();

        // ✅ Send response back to Product Service
        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(tenant || {})),
          { correlationId: msg.properties.correlationId }
        );

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('❌ RabbitMQ Connection Error (User Service):', error);
    setTimeout(connectRabbitMQUserService, 5000); // retry
  }
}
