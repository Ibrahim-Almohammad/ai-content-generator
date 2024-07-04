"use client"
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname,useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {
    const MenuList=[
        {
            name:'Home',
            icon:Home,
            path:'/dashboard'
        },
        {
            name:'History',
            icon:FileClock,
            path:'/dashboard/history'
        },
        {
            name:'Billing',
            icon:WalletCards,
            path:'/dashboard/billing'
        },
        {
            name:'Setting',
            icon:Settings,
            path:'/dashboard/sitting'
        },
        
    ]
    const path=usePathname();
    const router = useRouter();
    useEffect(()=>{
        console.log(path);
    },[])
  return (
    <div className='h-screen p-5 shadow-sm border bg-white'>
        <div className=' flex justify-center '>
        <Image src={'/logo2.svg'} alt='logo' width={57} height={50}/>
        </div>
        <hr className='my-6 border'/>
        <div className='mt-3'>
            {/* //👍👍👍👍👍 */}
            {MenuList.map((menu,index)=>(
                <div className={`flex  gap-2 mb-2 p-3 hover:bg-primary
                 hover:text-white rounded-lg cursor-pointer items-center
                 ${path==menu.path&& 'bg-primary text-white'}
                 `}
                 onClick={()=> router.push(menu.path)}
                 >
                    <menu.icon className='h-6 w-6'/>
                <h2 className='text-lg'>{menu.name}</h2>
                </div>
            ) )}
        </div>
    </div>
  )
}

export default SideNav