import { getChannel } from "../../config/rabbitmq";
import { TenantServices } from "./tenant.service";

export async function startTenantConsumer() {
  const channel = getChannel();
  const queue = "get_tenant_info";

  await channel.assertQueue(queue, { durable: false });

  console.log(`✅ Listening for tenant info requests on queue: ${queue}`);

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const tenantId = msg.content.toString();
    console.log(`🔹 Received Tenant Info Request for ID: ${tenantId}`);

    try {
      const tenant = await TenantServices.getSingleTenant(tenantId);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(tenant)),
        { correlationId: msg.properties.correlationId }
      );
      console.log(`✅ Tenant Info sent back to Product Service`);
    } catch (error: any) {
      console.error("❌ Failed to get Tenant Info:", error.message);

      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify({ error: "Tenant not found" })),
        { correlationId: msg.properties.correlationId }
      );
    }

    channel.ack(msg);
  });
}
