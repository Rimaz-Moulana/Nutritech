import React from 'react'
import Navbar from '../navbar/Navbar'
import AnnotatorSideBar from '../sidebar/AnnotatorSideBar'

export default function BlankPage() {
  return (
    <>
    <Navbar />
    <div className='bg-[#E5EBD6] relative w-full h-auto flex'>
    <AnnotatorSideBar />  
        
    </div>
    </>
  )
}
