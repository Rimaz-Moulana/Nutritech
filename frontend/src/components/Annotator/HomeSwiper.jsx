import React , {useEffect, useRef, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeSwiper = ({videoData}) => {
  
  console.log(videoData)
  const sliderRef = useRef(null);

  const SampleNextArrow=(props)=>{
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", color:"black" }}
        onClick={onClick}
      />
    );
  }
  
  const SamplePrevArrow=(props)=> {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", color:"black"}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // nextArrow: <FaChevronRight />, // Use imported arrow icons
    // prevArrow: <FaChevronLeft />,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow /> 
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
    <div className='p-4'>
        <div className=''>
        <Slider {...settings} ref={sliderRef}>
        {videoData.map((video, index) => (
          <div key={index} className=' gap-2 p-4 h-44'>
              <ReactPlayer
                className='react-player p-1'
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
