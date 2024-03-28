import React , {useRef} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Video from '../../assets/videos/astra.mp4'
import arrow from '../../assets/Images/arrowgreen.png'

const HomeSwiper = () => {
  const videos = [
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
    Video,
  ];

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

  return (
    <div className=' ml-12 mr-12'>
        <div className='gap-6 w-6/8'>
        <Slider ref={sliderRef} {...settings}>
        {videos.map((video, index) => (
          <div key={index} className='ml-4 gap-6 p-4'>
            <video controls width="100%" height="auto">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
        
      </Slider>
        </div>
      
      
    </div>
  );
};

export default HomeSwiper;
