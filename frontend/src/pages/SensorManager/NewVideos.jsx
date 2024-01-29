import React from 'react'
// import { useNavigate } from 'react-router-dom';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar';
import Navbar from '../../components/navbar/Navbar';

function NewVideos() {
//   const navigate = useNavigate(); 
//   const videoupload= () => {
//     navigate('/uploadvideo');
//   };
  return (
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <SensorManagerSidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='sensormanager'/>
        <h1 className=' mb-8 mt-24 ml-4 lg:mr-[960px] text-3xl font-semibold text-sidebarGreen left-0'>
           New Videos
        </h1>
        <VideoContainer type='sensormanagernewvideos'/>
      </div>
    </div>
);
}

export default NewVideos