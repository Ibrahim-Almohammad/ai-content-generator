import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/utils/db";
import { Purchase, StripeCustomer } from "@/utils/schema";
import { auth,currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const user=await currentUser();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "100,000 words/Month",
                        description: "all $9.9 worth of credit",
                    },
                    unit_amount: 990,
                },
            },
        ];
        
        // Insert a new purchase record
        await db.insert(Purchase).values({
            userId: userId,
            credit: 10000,
        }).execute(); 

        // Fetch the Stripe customer
        const stripeCustomer = await db
            .select()
            .from(StripeCustomer)
            .where(eq(StripeCustomer.userId, userId))
            .limit(1)
            .execute();
            if (stripeCustomer.length === 0) {
              // Create a new Stripe customer
              const customer = await stripe.customers.create({
                  email: user?.emailAddresses[0].emailAddress,
              });
  
              // Insert new Stripe customer record into the database
              await db.insert(StripeCustomer).values({
                  userId: userId,
                  stripeCustomerId: customer.id,
              }).execute();
          }

        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `https://localhost:3000/dashboard`,
            cancel_url: `https://localhost:3000/`,
            metadata: {
                userId: userId,
            },
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        // console.error("Internal Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
