import React, { useEffect, useState } from 'react'
import VideoContainer from '../../components/videoContainer/VideoContainer';
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar';
import Navbar from '../../components/navbar/Navbar';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import { useParams } from 'react-router-dom';

function ReviewVideos() {
  const { videoId } = useParams();

  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }



  return (
    <div className='bg-backgroundGreen flex h-full'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <SensorManagerSidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='sensormanager'/>
       <VideowithReview videoId={videoId}/>
       <h1 className='mt-12 lg:mr-[700px] text-xl'>
       Existing Ads related to this product
       </h1>
      <div>
  
      </div>
       
      </div>
    </div>
);
}

export default ReviewVideos
