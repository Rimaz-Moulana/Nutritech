import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import GridListView from '../../components/Toggle/GridListView';

function Allvideos() {
  const [videoData, setVideoData] = useState([]);
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
       const response = await fetch('http://localhost:3000/videos/all');
      const data = await response.json();
      setVideoData(data);
    };
  
    fetchData();
  }, []); 

  console.log(videoData)
  
  return (
    <div className='bg-backgroundGreen flex h-full min-h-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col">
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64 z-10">
        <Navbar type='annotator' />
        <div className='flex'>
          <h1 className=' mb-8 ml-24 mt-32 text-3xl lg:mr-[960px] font-semibold text-sidebarGreen left-0'>
                  All Videos
                </h1>

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
      {/* <GridListView type="all" videoData={videoData}/> */}
</div>
        
<VideoContainer 
        type={'all'}
        videoData={videoData}
        viewType={isChecked ? 'Grid' : 'List'} 
        
      /> 
       
      </div>
    </div>
  );
}

export default Allvideos;
