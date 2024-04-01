import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';

function ViewComment({ videoId, type }) {
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(true);


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

  const renderCommentsAndReplies = () => {
    const result = [];

    if (Data.comment && Data.comment.length > 0) {
      // Interleave comments and replies
      for (let i = 0; i < Data.comment.length; i++) {
        result.push(
          <div key={`comment-${i}`} className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
            <p className='text-gray-600'>Expert Panel</p>
            {Data.comment[i].text}
            {console.log(Data.comment[i].text)}
            <div className='flex space-x-8 text-sm mt-4'>
              <p>{Data.comment[i].commenteddate}</p>
              <p>{Data.comment[i].commentedtime}</p>
            </div>
          </div>
        );

        // Check if there are replies for this comment
        if (Data.reply && Data.reply.length > 0 && Data.reply[i]) {
          // Interleave replies
          // for (let j = 0; j < Data.reply.length; j++) {
            
            result.push(
              <div key={`reply-${i}`} className='bg-gray-300 text-black mt-4 p-3 text-xl text-left'>
                {/* {console.log(Data.reply[i][j].text)} */}
                <p className='text-gray-600'>Industry</p>
                {Data.reply[i].text}
                {/* {console.log(Data.reply[i][j].text)} */}
                <div className='flex space-x-8 text-sm mt-4'>
                  <p>{Data.reply[i].commenteddate}</p>
                  <p>{Data.reply[i].commentedtime}</p>
                </div>
              </div>
            );
          }
        // }
      }
    }

    return result;
  };
  console.log(Data)
  return (
    <div className='mt-8 w-1/2 font-semibold mx-auto text-center'>
      <h1 className='text-sidebarGreen text-2xl text-left'>Comment section</h1>

      {loading ? (
        <div>Loading...</div>
      ) : renderCommentsAndReplies().length > 0 ? (
        <>
          {renderCommentsAndReplies()}
          <div className='bg-gray-300 text-white p-3 mt-4 text-xl text-left'>
            <Comments type={type} videoId={videoId} />
          </div>
        </>
      ) : (
        <div className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
          Not yet reviewed this video
        </div>
      )}
    </div>
  );
}

export default ViewComment;
