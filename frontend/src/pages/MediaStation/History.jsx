import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMediaStation from '../../components/navbar/NavbarMediaStation';
import VideoContainer from '../../components/videoContainer/VideoContainer';

function History() {
  const navigate = useNavigate(); 
  const videoupload= () => {
    navigate('/uploadvideo');
  };
  return (
    <div className='bg-backgroundGreen flex'>
    <div className="w-full ml-20 mr-24 h-full ">
      <NavbarMediaStation />
      <div className='flex justify-between'>
      <h1 className=' mb-8 mt-24 text-3xl lg:mr-[820px] ml-4 font-semibold text-sidebarGreen justify-start '>
         Upload History
      </h1>
      <div className=' flex items-end mt-24 mr-4'>
      <button className="text-white h- bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 "onClick={videoupload}>Upload New Video</button>
      </div>
      
      </div>
      
      <VideoContainer />
    </div>
  </div>
);
}

export default History