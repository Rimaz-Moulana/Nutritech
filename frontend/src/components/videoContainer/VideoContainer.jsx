import React from 'react';
import astra from '../../../src/assets/videos/astra.mp4';
import pen from '../../../src/assets/Images/pen.png';
import history from '../../../src/assets/Images/history.png';
import { useNavigate } from 'react-router-dom';
import review from '../../assets/Images/review.png';

function VideoContainer({ type, videoData }) {
  const navigate = useNavigate();

  const handleAnnotate = (videoId) => {
    navigate(`/annotation/${videoId}`);
  };

  const ViewAnnotate = (videoId) => {
    navigate(`/annotationhistory/${videoId}`)
  };
  

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ml-12 mt-8 mr-5 mb-8 h-screen bg-backgroundGreen">
      {videoData.map((video, index) => (
        <div key={index} className='relative'>
          <div className=''>
            <video className="h-auto max-w-full rounded-lg" controls>
              <source src={astra} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className='border-2 mt-2 border-gray-300 text-left'>
              <p>Date: {video.date}</p>
              <p>Time: {video.time}</p>
              <p>Uploader: {video.uploader}</p>
              <p>Status: {video.status}</p>
            </div>
          </div>

          {type === 'unannotated' && (
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img
                src={pen}
                alt="Annotate"
                onClick={() => handleAnnotate(video._id)} // Pass video ID to handleAnnotate
              />
            </div>
          )}

          {type === 'annotated' && (
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={history} alt="Annotate" onClick={() => ViewAnnotate(video._id)}/>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}

export default VideoContainer;
