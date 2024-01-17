import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';

function Unannotatedvideos() {
  return (
    <div className='bg-backgroundGreen flex'>
      {/* Sidebar */}
      <div className="w-2/8 fixed h-full">
        <AnnotatorSideBar />
      </div>
      <div>
        
      </div>
      {/* Content */}
      <div className="w-3/4 ml-64">
        <Navbar />
        <h1 className='ml-20 mb-8 mt-8 text-3xl font-semibold text-sidebarGreen'>
           Unannotated Videos
        </h1>
        <VideoContainer />
      </div>
    </div>
  );
}

export default Unannotatedvideos;
