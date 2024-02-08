import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import GridListView from '../../components/Toggle/GridListView';

function AnnotatedVideos() {
  const [annotatedVideoData, setannotatedVideoData] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      // try {
        // Allvideos.jsx
        const response = await fetch('http://localhost:3000/videos/annotated-videos');
        const data = await response.json();
        setannotatedVideoData(data);

    };

    fetchData();
  }, []);
  return (
    <div className='bg-backgroundGreen flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='annotator'/>
        <h1 className=' mb-8 mt-24 lg:mr-[780px] text-3xl font-semibold text-sidebarGreen left-0'>
           Annotated Videos
        </h1>
        <GridListView type="annotated" videoData={annotatedVideoData}/>
      </div>
    </div>
  );
}

export default AnnotatedVideos;
