import { NextRequest, NextResponse } from "next/server";
import { createOrder, verifyPaymentSignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

// POST /api/subscribe — create Razorpay order for ₹50/month
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, name } = body;

    if (action === "create_order") {
      // ₹50 = 5000 paise
      const order = await createOrder(5000);
      return NextResponse.json({ orderId: order.id, amount: 5000, currency: "INR" });
    }

    if (action === "verify_payment") {
      const { orderId, paymentId, signature } = body;
      const isValid = verifyPaymentSignature(orderId, paymentId, signature);

      if (!isValid) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }

      // Mark subscriber as paid (expires in 30 days)
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
          name: name || "",
          plan: "paid",
          status: "active",
          razorpaySubId: paymentId,
          startedAt: new Date(),
          expiresAt,
        },
      });

      return NextResponse.json({ success: true, message: "Subscription activated" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
