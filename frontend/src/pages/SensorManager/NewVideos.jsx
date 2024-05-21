import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import Navbar from '../../components/navbar/Navbar';
import GridListView from '../../components/Toggle/GridListView';
import Sidebar from '../../components/sidebar/SideBar';

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
        const response = await fetch('http://localhost:3000/api/videos/sensormanagernewvideo');
        const data = await response.json();
        setPendingVideoData(data);

    };

    fetchData();
  }, []);

  console.log(pendingVideoData)
  return (
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="sensormanager" />
      </div>
      <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
        <Navbar type='sensormanager'/>
        <div className='flex justify-between w-full min-w-screen'>
        <h1 className=' mb-8 ml-24 mt-32 text-3xl font-semibold text-sidebarGreen'>
           New Videos
        </h1>
        {/* <GridListView type="annotated" videoData={annotatedVideoData}/> */}
        <label className='themeSwitcherTwo shadow-card relative mt-32 h-10 mr-10 inline-flex  cursor-pointer select-none rounded-md bg-white '>
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
