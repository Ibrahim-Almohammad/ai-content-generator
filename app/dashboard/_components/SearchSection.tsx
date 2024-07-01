import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600
    flex flex-col justify-center items-center text-white'>

        <h2 className='text-3xl font-bold text-white'>Brows All Templates </h2>
        <p>What would you like to create tody? </p>
        <div className='w-full flex justify-center items-center'>
            <div className=' flex gap-2 items-center p-2 border rounded-md my-5 w-[50%]'>
                <Search/>
                <input type="text" placeholder='Search'
                onChange={(event)=>onSearchInput(event.target.value)}
                className='bg-transparent outline-none'/>
                
            </div>
        </div>
    </div>
  )
}

export default SearchSection