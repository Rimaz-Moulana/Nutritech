

import React from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import API from '../../config/config';


function History() {
  const [videoData, setVideoData] = useState([]);
  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }



  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("fetching session details..");
        const authData = localStorage.getItem('token');
        // console.log(authData)

        setTimeout(() => {
          // Remove token from local storage after 5 seconds
          localStorage.removeItem('token');
          localStorage.removeItem('email');
      }, 7200000); // 2hours

      if(authData){
        const {accessToken} = authData;
        console.log(accessToken);
        const config = {
          headers : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        };
        const response = await fetch(`${API}/api/videos/history`, config);
        if (!response.ok) {
          throw new Error(`Failed to fetch History. Status: ${response.uploader}`);
        }
        const data = await response.json();
        setVideoData(data);



      }else{
        navigate('/');
      }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchVideos();
  }, []);
  

  const navigate = useNavigate(); 
  const videoupload= () => {
    navigate('/uploadvideo');
  };
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="researcher"/>
        </div>
    <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64">
      <div className='p-1'>
      <Navbar />
      </div>    
      <div className='flex justify-between'>
      <h1 className=' mb-8 mt-24 text-3xl ml-4 font-semibold text-sidebarGreen justify-start '>
         Upload History
      </h1>
      <div className=' flex items-end mt-12 mr-4'>
      <button className="text-white h- bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 "onClick={videoupload}>Upload New Video</button>
      </div>
      </div>

      <label className='themeSwitcherTwo shadow-card relative mt-8 h-10  inline-flex  cursor-pointer select-none rounded-md bg-white '>
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
      <VideoContainer type={"history"} videoData={videoData} viewType={isChecked ? 'Grid' : 'List'} />
    </div>
  </div>
);
}

export default History