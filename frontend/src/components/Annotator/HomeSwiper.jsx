import React , {useEffect, useRef, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Video from '../../assets/videos/astra.mp4'
import arrow from '../../assets/Images/arrowgreen.png'
import ReactPlayer from 'react-player';

const HomeSwiper = ({videoData}) => {
  
  console.log(videoData)
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Number of videos visible in the row
    slidesToScroll: 1,
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const handleVideo = (inputUrl) =>{
    const url = inputUrl.replace(/\\/g, '/');
  
  // Split the URL based on backslash ("\")
    const urlParts = url.split('/');
  
  // Take the last part of the array
    const desiredPart = urlParts[urlParts.length - 1];
  // console.log(desiredPart)
  return desiredPart;
  }

  return (
    <div className=' ml-12 mr-12'>
        <div className='gap-6 w-6/8'>
        <Slider ref={sliderRef} {...settings}>
        {videoData.map((video, index) => (
          <div key={index} className='ml-4 gap-4 p-4 h-32'>
            {/* <video controls width="100%" height="auto"> */}
              {/* <source src={video} type="video/mp4" /> */}
              <ReactPlayer
                className='react-player fixed-bottom h-8 w-8 p-1'
                url={`/videos/${handleVideo(video.videoPath)}`}
                width='100%'
                height='100%'
                controls={true}
            />
              {/* Your browser does not support the video tag. */}
            {/* </video> */}
          </div>
        ))}
        
      </Slider>
        </div>
      
      
    </div>
  );
};

export default HomeSwiper;
