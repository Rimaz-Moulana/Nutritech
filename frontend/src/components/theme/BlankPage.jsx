import React from 'react'
import Navbar from '../navbar/Navbar'
import AnnotatorSideBar from '../sidebar/AnnotatorSideBar'

export default function BlankPage() {
  return (
    <>
    <Navbar />
    <div className='bg-[#B8C294] position-relative h-screen w-full flex'>
    <AnnotatorSideBar />  
        
    </div>
    </>
  )
}
