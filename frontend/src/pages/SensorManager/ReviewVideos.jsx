import React from 'react'
import VideoContainer from '../../components/videoContainer/VideoContainer';
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar';
import Navbar from '../../components/navbar/Navbar';
import VideowithReview from '../../components/SensorManager/VideowithReview';

function ReviewVideos() {
  return (
    <div className='bg-backgroundGreen flex h-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <SensorManagerSidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='sensormanager'/>
       <VideowithReview/>
       <h1 className='mt-12 lg:mr-[700px] text-xl'>
       Existing Ads related to this product
       </h1>
       <VideoContainer/>
      </div>
    </div>
);
}

export default ReviewVideos
