import React from 'react'
import astra from '../../../src/assets/videos/astra.mp4'

function VideoContainer() {
    const videoSources = [
        astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, astra, 
      ];
    
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ml-7.5 mr-7.5 mb-8">
          {videoSources.map((videoSrc, index) => (
            <div key={index}>
              <video className="h-auto max-w-full rounded-lg" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      );
    }

export default VideoContainer
