import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import API from '../../config/config';

function Videowithtext({videoId}) {
  console.log(videoId)
  const [videoData, setVideoData] = useState([]);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${API}/api/videos/annotation/${videoId}`);
        const data = response.data;  // Access the data property directly
        setVideoData(data);
        setConversionResult(response.data.text);
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
    <div className='lg:flex sm:relative justify-center '>
      {videoData[0] && (
        <div className='p-3'>
        <ReactPlayer
                className='react-player fixed-bottom'
                url={`/videos/${handleVideo(videoData[0].videoPath)}`}
                width='100%'
                height='100%'
                controls={true}
            />

        </div>

      )}
      <div className='bg-white lg:w-[55%] sm:w-full text-justify border rounded-lg lg:ml-12 p-3 '>
        <p>
        {conversionResult && <div>{conversionResult}</div>}
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
