import React from 'react'
import TimeStamp from '../../components/AnnotationTable/TimeStamp'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'
import Navbar from '../../components/navbar/Navbar'

function AnnotationTable() {
  return (  
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        <div className='ml-4 sm:ml-20 mb-8 mt-24 text-3xl font-semibold text-sidebarGreen'>
           
        </div>
        <TimeStamp />
      </div>
    </div>
  )
}

export default AnnotationTable
