 'use client'
 import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
 
   function UsageTrack() {
    const {user}=useUser();
    const [totalUsage,setTotaleUsage] =useState<number>(0);
    useEffect(()=>{
        user&&GetData();
    },[ user]);
    const GetData= async()=>{
         {/* @ts-ignore*/}
        const result:HISTORY[] = await db.select().from(AIOutput)
    .where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress));
    GetTotalUsage(result)
    }
    const GetTotalUsage=(result:HISTORY[])=>{
        let total:number=0;
        result.forEach(element => {
            total= total+Number(element.aiResponse?.length)
        
            });
            setTotaleUsage(total);
            console.log(total);
        
    }
   return (
     <div className='m-5'>
        <div className='bg-primary p-3 text-white rounded-lg '>
            <h2 className='font-medium'>Credits</h2>
            <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                <div className='h-2 bg-white rounded-full'  
                    style={{
                        width:(totalUsage/10000)*100+"%"
                    }}
                    >
                        
                </div>
            </div>
            <h2 className='text-sm my-2'>{totalUsage}/10,000 credit used</h2>
        </div>
            <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
     </div> 
   )
 }
 
 export default UsageTrack
