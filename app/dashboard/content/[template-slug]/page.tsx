"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageCredit } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { UserSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageCredit);

  /**
   * Used to generate content from AI
   * @param formData 
   * @returns 
   */
  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !UserSubscription) {
      console.log("Please upgrade");
      router.push('/dashboard/billing');
      return;
    }
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
    const result = await chatSession.sendMessage(FinalAIPrompt);

    setAiOutput(await result?.response.text());
    await saveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      await result?.response.text()
    );
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const saveInDb = async (formData: any, slug: any, aiResp: string) => {
    // Ensure that formData, slug, and aiResp are defined
    if (!formData || !slug || !aiResp || !user?.primaryEmailAddress?.emailAddress) {
      console.error("Missing required fields for saving to the database");
      return;
    }

    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user.primaryEmailAddress.emailAddress, // Ensure this is defined
        createdAt: moment().format("DD/MM/yyyy"), // You may want to use a different date format if needed
      });

      console.log("Saved result to DB:", result);
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFromInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
