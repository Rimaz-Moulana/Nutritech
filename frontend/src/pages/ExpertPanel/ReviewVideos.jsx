import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Annotations from '../../components/AnnotationTable/RowHistory'
import Comments from '../../components/CommentSection/Comments';
import Sidebar from '../../components/sidebar/SideBar';
import ViewComment from '../../components/CommentSection/ViewComment';

function ReviewVideos() {

  const navigate= useNavigate();
const {videoId} = useParams(); 
  const [videoData, setVideoData] = useState([]);
//   const [RuleData, setRuleData] = useState([]);
 
  console.log(videoData)
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64 ">
        <div className='px-12'>
        <Navbar type='annotator' />
        </div>
        <div className='flex justify-between z-9999 mt-24'>
        <VideowithReview Id={videoId} text="expert"/>
        </div>
        <div className='mt-12 ml-24'>
            <Annotations videoId={videoId} usertype={"expert"}/>
        </div>
        <ViewComment videoId={videoId} type={"comment"}/>
        <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"comment"}/>
        </div>
        
      </div>
    </div>
  );
}

export default ReviewVideos;
