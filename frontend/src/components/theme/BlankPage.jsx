import React from 'react'
import Navbar from '../navbar/Navbar'
import Annotatorsidebar from '../sidebar/AnnotatorSideBar'

export default function BlankPage() {
  return (
    <>
    
    <div className='bg-[#E5EBD6] md:flex absolute w-full h-full'>
    <Annotatorsidebar />
    <Navbar />
    
        
    </div>
    </>
  )
}
