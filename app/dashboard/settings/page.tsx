import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function settings() {
  return (
    <div className='flex item-center justify-center h-full'>
        <UserProfile/>
    </div>
  )
}

export default settings