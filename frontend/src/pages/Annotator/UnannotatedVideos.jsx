import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';

function Unannotatedvideos() {
  const [unannotatedVideoData, setUnannotatedVideoData] = useState([]);

  useEffect(() => {
    const fetchUnannotatedVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos/unannotated-videos');
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
    <div className='bg-backgroundGreen flex h-full'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar type='annotator'/>
        <h1 className=' mb-8 mt-24 lg:mr-[760px] text-3xl font-semibold text-sidebarGreen left-0'>
           Unannotated Videos
        </h1>
        <VideoContainer type="unannotated" videoData={unannotatedVideoData}/>
      </div>
    </div>
  );
}

export default Unannotatedvideos;
