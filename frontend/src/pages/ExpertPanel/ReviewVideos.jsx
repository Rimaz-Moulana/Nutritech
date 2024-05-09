import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Annotations from '../../components/AnnotationTable/RowHistory'
import Comments from '../../components/CommentSection/Comments';
import Sidebar from '../../components/sidebar/SideBar';
import ViewComment from '../../components/CommentSection/ViewComment';
import axios from 'axios';

function ReviewVideos() {

  const navigate= useNavigate();
const {videoId} = useParams(); 
  const [videoData, setVideoData] = useState([]);
  const [loading,setLoading] =useState(true);
//   const [RuleData, setRuleData] = useState([]);

useEffect(() => {
  const fetchReviewDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
      setVideoData(response.data.video);
    } catch (error) {
      console.error('Error fetching ReviewDetails:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchReviewDetails();
}, [videoId]);
 
  // console.log(videoData)
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
        {!videoData.reannotations || !videoData.length>0 && (
          <div className='mt-8 w-full'>
          <p>Write a message to annotator, if video should be reannotate</p>
          <Comments videoId={videoId} type={"comment"} section={"message"}/>
        </div>
         )
        }

        <ViewComment videoId={videoId} type={"comment"}/>
        <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"comment"}/>
        </div>

        <div className=" flex items-end justify-center mt-4 z-10 h-full"> {/* Position cancel button at the bottom */}
        <button
                  className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                  >
                  View Product Details
                </button>

                <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 onClick={() => window.history.back()}>
                  Cancel
                </button>
      </div>
        
      </div>
    </div>
  );
}

export default ReviewVideos;
