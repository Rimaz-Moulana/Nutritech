import React, { useEffect, useState } from 'react'
import VideoContainer from '../../components/videoContainer/VideoContainer';
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar';
import Navbar from '../../components/navbar/Navbar';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewVideos() {
  const { videoId } = useParams();
  const [responseData, setResponseData] = useState([]);
  // const { videoReviewData, brandVideoData } = responseData;
  const [loading, setLoading] = useState(true);

  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/brandproducts/${videoId}`);
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [videoId]);
  
  console.log(responseData)
  return (
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="sensormanager" />
      </div>
      <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
        <Navbar type='sensormanager'/>
      
       <VideowithReview Id={videoId} text={"video"}/>
       <div className='flex justify-between mt-8'>
       <h1 className='text-xl ml-8 font-semibold'>
       Existing Ads related to this product
       </h1>

       <label className='themeSwitcherTwo shadow-card relative h-10  inline-flex  cursor-pointer select-none rounded-md bg-white '>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
        
          List View
        </span>
        <span
          className={`flex space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
       </div>
      

      <div className='left-0'>
      <VideoContainer type={"reviewvideo"}  videoData={responseData} viewType={isChecked ? 'Grid' : 'List'} />
      </div>
       
      </div>
    </div>
);
}

export default ReviewVideos
