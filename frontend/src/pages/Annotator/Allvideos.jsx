import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';

function Allvideos() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      // try {
        // Allvideos.jsx
        const response = await fetch('http://localhost:3001/videos/all');
        const data = await response.json();
      setVideoData(data);

    };

    fetchData();
  }, []);

  return (
    <div className='bg-backgroundGreen flex h-full'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col">
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='annotator' />
        <h1 className=' mb-8 mt-24 lg:mr-[880px] text-3xl font-semibold text-sidebarGreen left-0'>
          All Videos
        </h1>
        <VideoContainer videoData={videoData} />
      </div>
    </div>
  );
}

export default Allvideos;
