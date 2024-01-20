import React from 'react'
// import TimeStamp from '../../components/AnnotationTable/TimeStamp'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'
import Navbar from '../../components/navbar/Navbar'
import Rownames from '../../components/AnnotationTable/Rownames'
import Row from '../../components/AnnotationTable/Row'
import Buttons from '../../components/AnnotationTable/Buttons'
import { Button } from 'flowbite-react'

function AnnotationTable() {
  return (  
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className="w-full h-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        <div className='ml-4 h-full sm:ml-20 mb-8 mt-64 text-3xl font-semibold text-sidebarGreen'>
          <Rownames />
        <Row />
        <Row />
        <Row />
      </div>
      <div className='flex items-end justify-center h-full'>
        <Buttons />
      </div>
      </div>
    </div>
  )
}

export default AnnotationTable
