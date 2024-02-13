import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import SensorManagerSidebar from '../../components/sidebar/SensorManagerSidebar';
import Navbar from '../../components/navbar/Navbar';
import GridListView from '../../components/Toggle/GridListView';

function NewVideos() {
  const [pendingVideoData, setPendingVideoData] = useState([]);
  const [isChecked, setIsChecked] = useState(() => {
    // Retrieve the checkbox state from localStorage, defaulting to false if not found
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }


  

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      // try {
        // Allvideos.jsx
        const response = await fetch('http://localhost:3000/videos/sensormanagernewvideo');
        const data = await response.json();
        setPendingVideoData(data);

    };

    fetchData();
  }, []);
  return (
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <SensorManagerSidebar />
      </div>
      <div className="w-full ml-0 h-full sm:ml-64">
        <Navbar type='sensormanager'/>
        <div className='flex'>
        <h1 className=' mb-8 ml-8 mt-32 lg:mr-[860px] text-3xl font-semibold text-sidebarGreen left-0'>
           New Videos
        </h1>
        {/* <GridListView type="annotated" videoData={annotatedVideoData}/> */}
        <label className='themeSwitcherTwo shadow-card relative mt-32 h-10  inline-flex  cursor-pointer select-none rounded-md bg-white '>
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
      <VideoContainer 
        type={'pending'}
        videoData={pendingVideoData}
        viewType={isChecked ? 'Grid' : 'List'} 
        
      /> 
        
      </div>
    </div>
);
}

export default NewVideos
