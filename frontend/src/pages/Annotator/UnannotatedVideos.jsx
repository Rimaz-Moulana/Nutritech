import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import GridListView from '../../components/Toggle/GridListView';

function Unannotatedvideos() {
  const [unannotatedVideoData, setUnannotatedVideoData] = useState([]);

  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });
  
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }

  useEffect(() => {
    const fetchUnannotatedVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos/unannotated-videos');
        if (!response.ok) {
          throw new Error(`Failed to fetch unannotated videos. Status: ${response.status}`);
        }
        const data = await response.json();
        setUnannotatedVideoData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnannotatedVideos();
  }, []);

  return (
    <div className='bg-backgroundGreen flex h-full min-h-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='annotator'/>
        <div className='flex'>
        <h1 className=' mb-8 ml-24 mt-32 mr-4.5 text-3xl font-semibold text-sidebarGreen left-0'>
           Unannotated Videos
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
        type={'unannotated'}
        videoData={unannotatedVideoData}
        viewType={isChecked ? 'Grid' : 'List'} 
        
      /> 
      </div>
    </div>
  );
}

export default Unannotatedvideos;
