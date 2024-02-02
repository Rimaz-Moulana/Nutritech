import React from 'react'
import astra from '../../../src/assets/videos/astra.mp4'
import pen from '../../../src/assets/Images/pen.png'
import { useNavigate } from 'react-router-dom';
import review from '../../assets/Images/review.png'

function VideoContainer({type}) {
  const navigate = useNavigate(); 

    const videoSources = [
        astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, 
      ];

      const handleAnnotate= () =>{
        navigate('/annotation')
      }

      const handleReview= () =>{
        navigate('/reviewvideos')
      }
    
    
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ml-12 mt-8 mr-5 mb-8 h-full bg-backgroundGreen">
          {videoSources.map((videoSrc, index) => (
            <div key={index} className='relative'>
              
              <div className=''>
              <video className="h-auto max-w-full rounded-lg" controls>
                <source src={videoSrc} type="video/mp4" />
                
                Your browser does not support the video tag.
              </video>
              <div className='border-2 mt-2 border-gray-300 text-left'>
              <p>Date :</p>
              <p>Time :</p>
              <p>Uploader :</p>
              <p>Status   :</p>
              </div>
              </div>
              
              {type === 'unannotated' && (
              <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
                <img src={pen} alt="Annotate" onClick={handleAnnotate} />
              </div>
            )}  

            {type === 'sensormanagernewvideos' && (
              <div className="h-24 w-8 icon-overlay absolute top-0 right-0 cursor-pointer ">
                <img src={review} alt="Review" onClick={handleReview} />
              </div>
            )}  
  </div>
           
          ))}
        </div>
      );
    }

export default VideoContainer
