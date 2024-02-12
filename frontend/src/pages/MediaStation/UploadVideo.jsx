
import axios from 'axios';
import { React, useState } from 'react';

import React, { useState } from 'react'
import Swal from 'sweetalert2';
import UploadForm from '../../components/UploadVideo/UploadForm';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import NavbarMediaStation from '../../components/navbar/NavbarMediaStation';


function UploadVideo() {

  const [uploadStatus, setUploadStatus] = useState('');
    const [formData, setFormData] = useState({
        brand: '',
        product: '',
        variation: '',
        createdAt: Date.now() ,
        videoFile: null // Assuming you need to upload a video file
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, videoFile: e.target.files[0] });
      };
    
      const handleSubmit = async () => {
        const formD = new FormData();
        formD.append('brand', formData.brand);
        formD.append('product', formData.product);
        formD.append('variation', formData.variation);
        formD.append('createdAt', formData.createdAt);
        formD.append('video', formData.videoFile);
        
        try {
          console.log(formData)
          console.log(formD)
          const response  = await axios.post("http://localhost:3000/api/videos/upload", formD);
          console.log(response.data);
          setUploadStatus("Video uploaded successfully!");
          }catch(error){
            console.error('Error uploading video:', error);
            setUploadStatus('Error uploading video.');
          }
      };



  const [formData, setFormData] = useState({
    brandname: '',
    product: '',
    variation: '',
    // Add other form fields as needed
  });

  const getCurrentDateTime = () => {
    const currentDate = new Date();
  
    // Format the date and time as needed (e.g., "2024-02-01 12:30:45")
    const formattedDateTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;
  
    return formattedDateTime;
  };
  
  // Helper function to pad a single digit number with a leading zero
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  
  
  const saveVideo = async () => {
    try {
      const response = await fetch('http://localhost:3000/videos/uploadvideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, uploader: 'ITN', time: getCurrentDateTime(), date: new Date().toLocaleDateString(), status: 'pending' }),
    });

  
      if (!response.ok) {
        console.error(`Failed to save video. Status: ${response.status}`);
        return;
      }
  
      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Video uploaded successfully!',
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
    } catch (error) {
      console.error('Error while saving video:', error);
    }
  };
  
  
  

  const handleFormChange = (e) => {
    console.log('handleFormChange called'); // Check if this log appears
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    console.log(updatedFormData); // Log the updated form data
    setFormData(updatedFormData); // Update the state immediately
  };
  
  
 

  return (
    <div className='bg-backgroundGreen flex h-screen'>
    <div className="w-full ml-12 mr-4 ">
      <NavbarMediaStation />
      <div className='flex justify-between'>
      <h1 className=' mb-8 mt-32 lg:mr-[820px] text-3xl ml-4 font-semibold text-sidebarGreen justify-start'>
         Upload Advertisement Video
      </h1>
      
      </div>
      <div className='flex mt-16 mr-12'>

      <UploadForm handleChange={handleChange} />
      <VideoUpload handleFileChange={handleFileChange}  />
      </div>
      <div className='mt-10'>
      {uploadStatus && <h3>{uploadStatus}</h3>}
      </div>
      <div className=''>
      <UploadNewVideoUIBtnSet handleSubmit={handleSubmit} />

      <UploadForm formData={formData} handleFormChange={handleFormChange} />
      <VideoUpload/>
      </div>
      <div className=''>
      <div className='flex h-full justify-center mt-16 sm:h-full'>
        <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " onClick={saveVideo}>Save</button>
        <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => window.history.back()}>Cancel</button>
    </div>

      </div>
      
    </div>
  </div>
);
}

export default UploadVideo
