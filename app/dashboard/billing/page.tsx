"use client";
import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Check, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

// if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
//   throw new Error("process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
// }

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
  {
    apiVersion: "2024-06-20",
  }
);

const  Billing = () => {
  const amount = 9.9;

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const user=useUser();
  const {UserSubscription,setUserSubscription} =useContext(UserSubscriptionContext);

  const router = useRouter();


  const handleGetStartedClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/create-payment-intent/checkout', { amount });
      if (response.data.url) {
          router.push(response.data.url);
      } else {
          // Handle case where URL is not provided
          console.error('No URL provided in response');
          setLoading(false);
      }
  } catch (error) {
      console.error('Failed to create payment intent:', error);
      setLoading(false);
  }
  };
  
  return (
    <div
      className="max-w-6xl gap-3 flex justify-center items-center mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr
    from-blue-500 to-purple-500 h-lvh"
    >
      <div
        className="p-5 w-50 shadow-md rounded-md border bg-white 
    flex justify-center items-center flex-col gap-3 cursor-pointer hover:scale-105 transition-all h-105"
      >
        <h1 className="text-3xl mb-2 text-black">Free</h1>
        <h2 className="text-sm text-black">
          <span className="font-extrabold text-4xl text-purple-500">$0</span>
          /Month
        </h2>
        <div className="text-gray-500">
          <p className="flex">
            <Check /> 10,000 Words/Month
          </p>
          <p className="flex">
            <Check /> 50+ Content Templates
          </p>
          <p className="flex">
            <Check /> Unlimited Downloads & Copy
          </p>
          <p className="flex">
            <Check /> 1 Month Of History
          </p>
          <Button className="mt-3 bg-gray-500 hover:">
            Currently Active Plan
          </Button>
        </div>
      </div>
      <div
        className="p-5 w-50 shadow-md rounded-md border bg-white 
    flex justify-center items-center flex-col gap-3 cursor-pointer hover:scale-105 transition-all h-85"
      >
        <h1 className="text-3xl mb-2 text-black">Monthly</h1>
        <h2 className="text-sm text-black">
          <span className="font-extrabold text-4xl text-purple-500">
          ${amount}
          </span>
          /Month
        </h2>
        <div className="text-gray-500">
          <p className="flex">
            <Check /> 100,000 Words/Month
          </p>
          <p className="flex">
            <Check /> 50+ Content Templates
          </p>
          <p className="flex">
            <Check /> Unlimited Downloads & Copy
          </p>
          <p className="flex">
            <Check /> 1 Year Of History
          </p>
          <Button className="mt-3 w-full " onClick={handleGetStartedClick}>
            {loading && <Loader2Icon className="animate-spin" />}
            {UserSubscription?'Active Plan':'Get Started'} 
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
