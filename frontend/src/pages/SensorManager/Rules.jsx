import React from 'react'
// import { useNavigate } from 'react-router-dom';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar';
import Navbar from '../../components/navbar/Navbar';
import Rule from '../../components/SensorManager/Rule';
import backwardarrow from '../../assets/Images/backarrowgreen.png'

function Rules() {
  return (
    <div className='bg-backgroundGreen flex h-full'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> 
        <SensorManagerSidebar />
      </div>
      <div className="w-full ml-0 h-full sm:ml-64">
        <Navbar type='sensormanager'/>
        <div className='flex justify-between'>
        <h1 className=' mb-8 mt-24 ml-8 text-3xl font-semibold text-sidebarGreen left-0'>
           Rules and Regulations
        </h1>
        <button
          className="text-white mt-24 mr-20 bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          // onClick={handleOpen}  // Add parentheses to call the function
        >
          Add New
        </button>
        </div>
        
        <div className='mb-12'>
            <Rule/>
            <Rule/>
            <Rule/>
            <Rule/>
            <Rule/>
            <Rule/>
            <Rule/>
            
        </div>
        
      </div>
    </div>
);
}

export default Rules
