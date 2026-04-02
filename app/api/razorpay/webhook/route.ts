import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const email = payment.email;
      const paymentId = payment.id;

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      await prisma.subscriber.upsert({
        where: { email },
        update: {
          plan: "paid",
          status: "active",
          razorpaySubId: paymentId,
          startedAt: new Date(),
          expiresAt,
        },
        create: {
          email,
          plan: "paid",
          status: "active",
          razorpaySubId: paymentId,
          startedAt: new Date(),
          expiresAt,
        },
      });
    }

    if (event.event === "subscription.cancelled") {
      const sub = event.payload.subscription.entity;
      await prisma.subscriber.updateMany({
        where: { razorpaySubId: sub.id },
        data: { status: "cancelled", plan: "free" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
