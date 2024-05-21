import React , {useEffect, useRef, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeSwiper = ({count,type,user,handlepath}) => {
  return (
<div className='bg-white rounded-lg shadow-md p-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between h-full' onClick={() => handlepath(type)}>
      <h1 className="text-lg font-semibold mb-2">{type}</h1>
      <p className='text-3xl'>{count}</p>
      {user=="Annotator" && type == "All Videos" && (
      <p className='mt-4'>Contain all annotated, unannotated, and reannotated videos. </p>
  
      )}
      {user=="Annotator" && type == "Annotated Videos" && (
      <p className='mt-4'>Contain videos that you have previously annotated, pending review by the expert panel. </p>
  
      )}
      {user=="Annotator" && type == "Unannotated Videos" && (
      <p className='mt-4'>Contain videos that still need to be annotated. </p>
  
      )}
      {user=="Annotator" && type == "Videos for Reannotation" && (
      <p className='mt-4'>Contain videos that the expert panel has requested to be annotated again. </p>
  
      )}

{     user=="Industry" && type == "All Uploaded Videos" && (
      <p className='mt-4'>Contain all uploaded videos. </p>
  
      )}
      {user=="Industry" && type == "Annotated Videos" && (
      <p className='mt-4'>Contain videos that annotated by annotator, pending review by the expert panel. </p>
  
      )}
      {user=="Industry" && type == "Unannotated Videos" && (
      <p className='mt-4'>Contain videos that still need to be annotated. </p>
  
      )}
      {user=="Industry" && type == "Red Flag Videos" && (
      <p className='mt-4'>Contain Red Flag Videos. These videos are based on unhealthy products or violated food advertisement regulations </p>
  
      )}

{user=="Industry" && type == "Pending Videos" && (
      <p className='mt-4'>Contain videos that you uploaded but not yet starting reviewing process </p>
  
      )}

{user=="Industry" && type == "Green Flag Videos" && (
      <p className='mt-4'>Contain verified videos </p>
  
      )}

{user=="Sensor Manager" && type == "All Videos" && (
      <p className='mt-4'>Contain both videos you reviewed and not reviewed</p>
  
      )}

{user=="Sensor Manager" && type == "Pending Videos" && (
      <p className='mt-4'>Contain videos that want to be reviewed</p>
  
      )}

{user=="Sensor Manager" && type == "Reviewed Videos" && (
      <p className='mt-4'>Contain reviewed videos </p>
  
      )}


      {/* <button className="bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen text-white font-medium rounded-lg text-sm px-5 py-2.5">View {type}</button> */}
    </div>
  );
}




export default HomeSwiper;
