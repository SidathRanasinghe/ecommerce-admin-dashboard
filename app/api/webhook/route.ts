import { NextResponse } from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEB_HOOK_SECRET;
    if (!webhookSecret) {
      return new NextResponse(
        "Stripe webhook secret is not set in environment variables",
        {
          status: 500,
        }
      );
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Error with webhook signature: ${error.message}`, {
      status: 500,
    });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressValue = [
    address?.line1,
    address?.line2,
    address?.postal_code,
    address?.city,
    address?.country,
    address?.state,
  ];

  const addressStr = addressValue.filter(add => add !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const orderId = session?.metadata?.orderId;
    if (!orderId) {
      return new NextResponse("Order ID is missing in session metadata", {
        status: 400,
      });
    }
    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        address: addressStr,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });
    const productIds = order?.orderItems?.map(
      (order: { productId: string }) => order?.productId
    );
    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }
  return new NextResponse("webhooks provided successfully", { status: 200 });
}
