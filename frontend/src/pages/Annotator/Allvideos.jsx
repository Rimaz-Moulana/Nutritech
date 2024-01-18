import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';

function Allvideos() {
  return (
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:block"> {/* Hide on small screens */}
        <AnnotatorSideBar />
      </div>
      <div>    
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64"> {/* Adjust margin on small screens */}
        <Navbar />
        <h1 className='ml-4 sm:ml-20 mb-8 mt-24 text-3xl font-semibold text-sidebarGreen'>
           All Videos
        </h1>
        <VideoContainer />
      </div>
    </div>
  );
}

export default Allvideos;
