import { db } from "@/utils/db"; // 
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { User } from "@/utils/schema"; // 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
    const body = await req.text();
    const sig = headers().get("stripe-signature");
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;

    if (event.type === 'checkout.session.completed') {
        if (!userId) {
            return new NextResponse("Invalid session", { status: 400 });
        }
        try {
            const findUserByUserID = await db
                .select()
                .from(User)
                .where(eq(User.userId, userId))
                .limit(1)
                .execute();

            if (findUserByUserID.length === 0) {
                await db.insert(User).values({
                    userId: userId,
                    totalCredit: 10000 + 10000,
                }).execute();
            } else {
                const user = findUserByUserID[0];
                await db.update(User).set({
                    totalCredit: user.totalCredit + 10000,
                }).where(eq(User.userId, userId)).execute();
            }

        } catch (error) {
            // console.error("Database error: ", error);
            return new NextResponse("Invalid User not authorized ", { status: 500 });
        }
    } else {
        return new NextResponse("Invalid event", { status: 400 });
    }

    return new NextResponse("Success", { status: 200 });
}
