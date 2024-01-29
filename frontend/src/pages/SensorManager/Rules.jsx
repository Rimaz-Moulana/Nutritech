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
        <h1 className=' mb-8 mt-24 ml-8 lg:mr-[920px] text-3xl font-semibold text-sidebarGreen left-0'>
           Rules and Regulations
        </h1>
        
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
