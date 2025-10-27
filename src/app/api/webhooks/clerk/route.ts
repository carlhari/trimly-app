import { prisma } from "@/app/lib/prismaConfig";
import { verifyWebhook } from "@clerk/backend/webhooks";

export async function POST(request: Request) {
  try {
    const evt = await verifyWebhook(request);

    // Access the event data
    const { id } = evt.data;
    const eventType = evt.type;

    // Handle specific event types
    if (evt.type === "user.created") {
      console.log("New user created:", evt.data.id);
      // Handle user creation
      try {
        //await prisma.user.
      } catch (error) {}
    }

    return new Response("Success", { status: 200 });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
