"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";

export const wordCount = (text: string | null): number => {
  return text ? text.trim().split(/\s+/).length : 0;
};

const UsageTrack = () => {
  const { user } = useUser();
  const {totalUsage, setTotalUsage} =useContext(TotalUsageContext);

  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      GetData();
    }
  }, [user]);

  const GetData = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.error("User email address is undefined");
        return;
      }

      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

      console.log("Fetched data:", result); // Log the fetched data for debugging
      GetTotalUsage(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      if (element && element.aiResponse) {
        const count = wordCount(element.aiResponse);
       // Log each AI response word count
        total += count;
      }
    });
    setTotalUsage(total);
    console.log("Total usage updated:", total); // Log the total usage for debugging
  };

  return (
    <div className="m-5">
      <div className="bg-primary p-3 text-white rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: (totalUsage / 10000) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/10,000 credits used</h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
