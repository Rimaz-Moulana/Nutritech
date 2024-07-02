import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/SideBar'

export default function BlankPage({type}) {
  return (
   
 
    <div className='bg-backgroundGreen  flex overflow-x-auto'>
    <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type={type} />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
      </div>
    
    
     
        
    </div>
   
  )
}