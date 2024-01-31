import React, { useEffect, useState } from 'react'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'
import Navbar from '../../components/navbar/Navbar'
import Videowithtext from '../../components/AnnotationTable/Videowithtext'
import RowHistory from '../../components/AnnotationTable/RowHistory'

function History() {

  return (  
    <div className='bg-backgroundGreen h-full flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className="w-full h-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar type='annotator'/>
        <div className='w-full mt-28'>
            <Videowithtext />
        </div>
        <div className='ml-16 h-full sm:ml-20 mb-8 mt-10 text-sm font-semibold text-black'>
          <RowHistory />
          <RowHistory />
          <RowHistory />
          
          
          <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => window.history.back()}>Cancel</button>
      </div>
      
      </div>
    </div>
  )
}

export default History