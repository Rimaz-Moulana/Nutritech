import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import GridListView from '../../components/Toggle/GridListView';
import Sidebar from '../../components/sidebar/SideBar';

function ReannotateVideos() {
  
  const [reannotateVideoData, setreannotateVideoData] = useState([]);
  const [isChecked, setIsChecked] = useState(() => {
    // Retrieve the checkbox state from localStorage, defaulting to false if not found
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });

   // Add type as a dependency
  

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
        const response = await fetch('http://localhost:3000/api/videos/reannotate-videos');
        const data = await response.json();
        setreannotateVideoData(data);

    };

    fetchData();
  }, []);
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex h-full min-h-screen w-full justify-between pr-3'>
      <div className="fixed h-full hidden sm:flex flex-col">
        <Sidebar type="annotator" />
      </div>
      <div className="w-full h-full center-l  lg:ml-[15%] md:ml-[25%] px-3">
        <Navbar type='annotator'/>
        <div className='flex justify-between'>
        <h1 className=' mb-8 mt-32 lg:text-3xl sm:text-xl font-semibold text-sidebarGreen pl-3'>
           Videos for annotate again
        </h1>
        
        <div className='pr-3'>
<label className='themeSwitcherTwo shadow-card relative mt-32 lg:h-10 md:h-8 sm:h-6  inline-flex  cursor-pointer select-none rounded-md bg-white '>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex space-x-4 rounded pt-2 pb-2 px-2 text-sm font-medium ${
            !isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
        
          List View
        </span>
        <span
          className={`flex space-x-2 rounded py-2 px-2 text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
</div>
     
      </div>
      <VideoContainer 
        type={'reannotate'}
        videoData={reannotateVideoData}
        viewType={isChecked ? 'Grid' : 'List'} 
        
      /> 
      </div>
    </div>
  );
}

export default ReannotateVideos;
