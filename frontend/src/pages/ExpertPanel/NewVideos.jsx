import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import ProductTable from '../../components/tables/LogTable';
import Rule from '../../components/Rule';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import Sidebar from '../../components/sidebar/SideBar';

function NewVideos() {

  const [videoData, setVideoData] = useState([]);
  const [Data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });
  const email  = localStorage.getItem('email');

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }

  const navigate= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos/annotatedvideosExpert');
        const data = await response.json();
  
        // Filter out videos where the commenter's email doesn't match the user's email
        const filteredData = data.filter(video => {
          return !video.comment.some(comment => comment.commenter === email);
        });
  
        // Update the state with the filtered data
        setVideoData(data);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [email]); // Add email to the dependency array to re-fetch data when email changes
  
console.log("Data",Data);
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64 ">
        <div className='px-12'>
        <Navbar type='annotator' />
        </div>
        <div className='flex justify-between z-9999 mt-12'>
        <h1 className='ml-24 mb-8 mt-24 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           New Videos
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
      </div>
      <div>
      <VideoContainer
        type={'expertnew'}
        videoData={Data}
        viewType={isChecked ? 'Grid' : 'List'}         
      /> 
      </div>
        
      </div>
    </div>
  );
}

export default NewVideos
