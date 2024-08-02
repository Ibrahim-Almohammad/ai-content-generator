"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, StripeCustomer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageCredit } from "@/app/(context)/UpdateCreditUsageContext";
import { wordCount } from '@/utils/wordCount'; // Import the wordCount utility function

const UsageTrack = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { UserSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxWords, setMaxWords] = useState(10000);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageCredit);

  useEffect(() => {
    if (user) {
      GetData();
      IsUserSubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (updateCreditUsage && user) {
      GetData();
    }
  }, [updateCreditUsage, user]);

  const GetData = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error("User email address is undefined");
        return;
      }
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, email));

      console.log("Fetched data:", result); // Log the fetched data for debugging
      GetTotalUsage(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const IsUserSubscribe = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error("User email address is undefined");
        return;
      }
      const result = await db
        .select()
        .from(StripeCustomer)
        .where(eq(StripeCustomer.userId, email));
      if (result.length > 0) {
        setUserSubscription(true);
        setMaxWords(100000);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      if (element && element.aiResponse) {
        const count = wordCount(element.aiResponse);
        total += count;
      }
    });
    setTotalUsage(total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary p-3 text-white rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: (totalUsage / maxWords) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/{maxWords} credits used</h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
