import { getChannel } from '../../config/rabbitmq';
import { v4 as uuidv4 } from 'uuid';

export async function getTenantInfo(tenantId: string): Promise<any> {
  const channel = getChannel();
  const correlationId = uuidv4();

  return new Promise((resolve, reject) => {
    const responseQueue = 'tenant_info_response';

    channel.consume(
      responseQueue,
      (msg) => {
        if (msg?.properties.correlationId === correlationId) {
          const tenantData = JSON.parse(msg.content.toString());
          resolve(tenantData);
        }
      },
      { noAck: true }
    );

    // ✅ Send request to user-service via RabbitMQ
    channel.sendToQueue(
      'tenant_info_request',
      Buffer.from(JSON.stringify({ tenantId })),
      {
        correlationId,
        replyTo: responseQueue,
      }
    );
  });
}
