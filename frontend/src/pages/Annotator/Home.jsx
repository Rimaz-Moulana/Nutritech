import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';

function Home() {
  return (
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='annotator' />
        <h1 className=' mb-8 mt-24 text-3xl font-semibold text-sidebarGreen left-0'>
           Videos
        </h1>
        <VideoContainer />

        <h1 className=' mb-8 mt-24 text-3xl font-semibold text-sidebarGreen left-0'>
           Products
        </h1>
        <VideoContainer />
      </div>
    </div>
  );
}

export default Home;
