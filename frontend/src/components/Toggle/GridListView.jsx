import React, { useEffect, useState } from 'react'
import VideoContainer from '../videoContainer/VideoContainer';

const GridListView = ({type, videoData}) => {
console.log(videoData)
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



  return (
    <div>
      <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white '>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
        
          List View
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
      <VideoContainer 
        type={type}
        videoData={videoData}
        viewType={isChecked ? 'Grid' : 'List'} 
        
      />
    </div>
  )
}

export default GridListView
