import React, { useEffect, useState } from 'react'
import video from '../../assets/videos/astra.mp4'
import axios from 'axios';
import ReactPlayer from 'react-player';

function Videowithtext({videoId}) {
  console.log(videoId)
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/annotation/${videoId}`);
        const data = response.data;  // Access the data property directly
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching Video:', error);
      } 
    };
  
    fetchVideo();
  }, [videoId]);
  
  const handleVideo = (inputUrl) =>{
    const url = inputUrl.replace(/\\/g, '/');
  
  // Split the URL based on backslash ("\")
    const urlParts = url.split('/');
  
  // Take the last part of the array
    const desiredPart = urlParts[urlParts.length - 1];
  console.log(desiredPart)
  return desiredPart;
  }

 
console.log(videoData)
  return (
    <div className='lg:flex sm:relative justify-center'>
      {videoData[0] && (
        <div>
        <ReactPlayer
                className='react-player fixed-bottom'
                url={`/videos/${handleVideo(videoData[0].videoPath)}`}
                width='100%'
                height='100%'
                controls={true}
            />

        </div>

      )}
      <div className='bg-white lg:w-1/2 lg:ml-12 sm:w-full p-3 text-justify border rounded-lg'>
        <p>
        Cake? Bake!
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Share the love of baking with Astra  
        </p>
      </div>
    </div>
  )
}

export default Videowithtext
