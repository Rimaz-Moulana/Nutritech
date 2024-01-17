import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Dropdown from '../components/dropdown/Dropdown';
import VideoContainer from '../components/videoContainer/VideoContainer';
import AnnotatorSideBar from '../components/sidebar/AnnotatorSideBar';

function Allvideos() {
  return (
    <div className='bg-backgroundGreen flex'>
      {/* Sidebar */}
      <div className="w-3/8">
        <AnnotatorSideBar />
      </div>
      <div>
        
      </div>
      {/* Content */}
      <div className="w-5/8 ml-0">
        <Navbar />
        <h1 className='ml-20 mb-8 mt-8 text-3xl font-semibold text-sidebarGreen'>
           All Videos
        </h1>
        <VideoContainer />
      </div>
    </div>
  );
}

export default Allvideos;
