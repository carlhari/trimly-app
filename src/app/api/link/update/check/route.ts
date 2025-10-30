import prisma from "@/app/lib/prisma";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { NextResponse } from "next/server";

function getPrimaryEmail(evt: any): string | null {
  const emailId = evt.data.primary_email_address_id;
  const emailObj = evt.data.email_addresses?.find(
    (email: { id: string; email_address: string }) => email.id === emailId,
  );
  return emailObj?.email_address ?? null;
}

export async function POST(request: Request) {
  try {
    const evt = await verifyWebhook(request);
    const email = getPrimaryEmail(evt);

    if (!email) {
      return NextResponse.json(
        { error: "Primary email not found" },
        { status: 400 },
      );
    }

    console.log("Clerk Webhook type:", evt.type);

    if (evt.type === "user.created") {
      await prisma.user.create({ data: { email } });
    }

    if (evt.type === "user.deleted") {
      await prisma.user.delete({ where: { email } });
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 500 },
    );
  }
}
