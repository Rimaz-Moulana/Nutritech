import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Annotations from '../../components/AnnotationTable/RowHistory'
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewHistory() {
const navigate= useNavigate();
let [isEnlarge, setEnlarge] = useState(true);
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

  let text;

  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };
 
  // console.log(Data)
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
       
        <Navbar type='expert' />
        <VideowithReview Id={videoId} text={"experthistory"}/>
      
        <div className='mt-12 ml-24'>
            <Annotations videoId={videoId} usertype={"expert"}/>
        </div>
        {/* {!videoData.reannotations>0 && ( */}
        <ViewComment videoId={videoId} type={"comment"}/>
        
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

export default ReviewHistory;
