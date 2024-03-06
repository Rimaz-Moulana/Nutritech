import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ViewComment({videoId}) {
    const [Data, setData] = useState([]);
    const [loading, setLoading] =useState();
    
useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
        setData(response.data.video);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [videoId]);

  
  return (
    <div className='mt-8 w-1/2 font-semibold mx-auto text-center'>
  <h1 className='text-sidebarGreen text-2xl text-left'>Expert Panel Comment</h1>

  {Data.comment ? (
    <div className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
      {Data.comment}
    </div>
  ) : (
    <div className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
      Not yet reviewed this video
    </div>
  )}
</div>

  )
}

export default ViewComment
