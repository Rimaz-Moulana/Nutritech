import axios from 'axios';
import React, { useState } from 'react';
import UploadForm from '../../components/UploadVideo/UploadForm';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import UploadNewVideoUIBtnSet from '../../components/button/UploadNewVideoUIBtnSet';
import NavbarMediaStation from '../../components/navbar/NavbarMediaStation';
import Swal from 'sweetalert2';


function UploadVideo() {
  const padZero = (num) => (num < 10 ? `0${num}` : num);

  const formattedTime = `${padZero(new Date().getHours())}:${padZero(new Date().getMinutes())}:${padZero(new Date().getSeconds())}`;
  
    const [uploadStatus, setUploadStatus] = useState('');

    const [formData, setFormData] = useState({
        brand: '',
        product: '',
        size: '',
        count:'',
        createdIn: new Date().toLocaleDateString(),
        createdAt: formattedTime ,
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
        formD.append('size', formData.size);
        formD.append('unit', formData.unit);
        formD.append('createdIn', formData.createdIn);
        formD.append('createdAt', formData.createdAt);
        formD.append('video', formData.videoFile);
        
        try {
          console.log(formData)
          console.log(formD)
          const response  = await axios.post("http://localhost:3000/api/videos/upload", formD);
          console.log(response.data);
          setUploadStatus("Video uploaded successfully!");
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
          window.history.back();

          }catch(error){
            console.error('Error uploading video:', error);
            setUploadStatus('Error uploading video.');
          }
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
      </div>
      
    </div>
  </div>
);
}

export default UploadVideo