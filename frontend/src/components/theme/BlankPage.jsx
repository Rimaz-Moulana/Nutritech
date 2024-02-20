import React from 'react'
import Navbar from '../navbar/Navbar'
import Annotatorsidebar from '../sidebar/AnnotatorSideBar'

export default function BlankPage() {
  return (
   
 
    <div className='bg-backgroundGreen  flex overflow-x-auto'>
    <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
      </div>
    
    
     
        
    </div>
   
  )
}