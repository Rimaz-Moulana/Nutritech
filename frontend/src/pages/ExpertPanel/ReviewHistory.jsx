import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/ExpertPanelSidebar'
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Annotations from '../../components/AnnotationTable/RowHistory'
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';

function ReviewHistory() {
const navigate= useNavigate();
const {videoId} = useParams(); 
 
  let text;

 
  // console.log(Data)
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar />
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64 ">
        <div className='px-12'>
        <Navbar type='annotator' />
        </div>
        <div className='flex justify-between z-9999 mt-24'>
        <VideowithReview Id={videoId} text={"experthistory"}/>
        </div>
        <div className='mt-12 ml-24'>
            <Annotations videoId={videoId} usertype={"expert"}/>
        </div>

        <ViewComment videoId={videoId} type={"comment"}/>
        <div className="bottom-0 left-0 w-full px-4 py-4"> {/* Position cancel button at the bottom */}
        <button className="mb-12 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " onClick={() => window.history.back()}>Cancel</button>
      </div>
      </div>
    </div>
  );
}

export default ReviewHistory;
