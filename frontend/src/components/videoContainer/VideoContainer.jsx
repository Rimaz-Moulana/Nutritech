import React from 'react'
import astra from '../../../src/assets/videos/astra.mp4'
import edit from '../../../src/assets/Images/edit.png'
import { useNavigate } from 'react-router-dom';

function VideoContainer({type}) {
  const navigate = useNavigate(); 

    const videoSources = [
        astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, 
      ];

      const handleAnnotate= () =>{
        navigate('/annotation')
      }
    
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ml-4 mt-8 mr-5 mb-8 h-full bg-backgroundGreen">
          {videoSources.map((videoSrc, index) => (
            <div key={index} className='relative'>
              <video className="h-auto max-w-full rounded-lg" controls>
                <source src={videoSrc} type="video/mp4" />
                
                Your browser does not support the video tag.
              </video>
              {type === 'unannotated' && (
              <div className="h-24 w-8 icon-overlay absolute top-0 right-0 cursor-pointer ">
                <img src={edit} alt="Annotate" onClick={handleAnnotate} />
              </div>
            )}  
            </div>
          ))}
        </div>
      );
    }

export default VideoContainer
