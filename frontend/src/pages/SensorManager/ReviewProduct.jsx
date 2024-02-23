import React from 'react'
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar'
import Navbar from '../../components/navbar/Navbar'

function ReviewProduct() {
  return (
    
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
          <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
            <SensorManagerSidebar />
          </div>
          <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
            <Navbar type='sensormanager'/>
            <div className='flex justify-between w-full min-w-screen'>
          
           
            
          </div>
          </div>
        </div>
  )
}

export default ReviewProduct
