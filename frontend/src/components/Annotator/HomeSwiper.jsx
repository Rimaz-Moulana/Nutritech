import React , {useEffect, useRef, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeSwiper = ({count,type}) => {
  
  return (
    <div className='h-36 w-36 bg-gray-300 p-4 rounded'>
      <h1>{type}</h1>
      <div>
        <p>{count}</p>
      </div>
      <div><button className="text-white mt-24 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" >All Videos</button></div>
    </div>
  );
}




export default HomeSwiper;
