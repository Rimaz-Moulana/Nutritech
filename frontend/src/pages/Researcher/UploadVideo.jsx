import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UploadForm from '../../components/UploadVideo/UploadForm';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import UploadNewVideoUIBtnSet from '../../components/button/UploadNewVideoUIBtnSet';
import Navbar from '../../components/navbar/Navbar';
import API from '../../config/config';

function UploadVideo() {
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  const formattedTime = `${padZero(new Date().getHours())}:${padZero(new Date().getMinutes())}:${padZero(new Date().getSeconds())}`;

  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();
  const [videoUploader, setVideoUploader] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    product: '',
    unit: '',
    size: '',
    category: '',
    createdIn: new Date().toLocaleDateString(),
    createdAt: formattedTime,
    videoFile: null,
  });

  const email = localStorage.getItem('email');

  const findByEmail = async (email) => {
    try {
      const token = localStorage.getItem('token');
      console.log("token:", token);

      if (token) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };

      const response = await axios.get(`${API}/api/users/getUser/${email}`, config);
      setVideoUploader(response.data);
      console.log("userdata:", response.data.username);
      }else{
        navigate('/')
      }
    } catch (e) {
      console.log("error:", e);
    }
  };

  useEffect(() => {
    if (email) {
      findByEmail(email);
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    const videoElement = document.createElement('video');
    const fileURL = URL.createObjectURL(file);

    videoElement.addEventListener('loadedmetadata', () => {
      const durationInSeconds = Math.round(videoElement.duration);
      console.log('Duration in seconds:', durationInSeconds);
      setFormData({ ...formData, videoFile: file, duration: durationInSeconds });
    });

    videoElement.src = fileURL;
  };

  const handleSubmit = async () => {
    try {
      const formD = new FormData();
      formD.append('brand', formData.brand);
      formD.append('product', formData.product);
      formD.append('unit', formData.unit);
      formD.append('size', formData.size);
      formD.append('category', formData.category);
      formD.append('createdIn', formData.createdIn);
      formD.append('createdAt', formData.createdAt);
      formD.append('video', formData.videoFile);
      formD.append('duration', formData.duration);
      formD.append('uploader', videoUploader.username);

      console.log("formD:", formD);
    
      const token = localStorage.getItem('token');
      console.log("token:", token);

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, 7200000); // 2hours


      if (token) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };

        const response = await axios.post(`${API}/api/videos/upload`, formD , config);
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
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus('Error uploading video.');
    }
  };

  return (
    <div className='bg-backgroundGreen flex h-screen'>
      <div className="w-full ml-12 mr-4 ">
        <Navbar />
        <div className='flex justify-between'>
          <h1 className=' mb-8 mt-32 lg:mr-[820px] text-3xl ml-4 font-semibold text-sidebarGreen justify-start'>
            Upload Advertisement Video
          </h1>
        </div>
        <div className='flex mt-16 mr-12'>
          <UploadForm handleChange={handleChange} />
          <VideoUpload handleFileChange={handleFileChange} />
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

export default UploadVideo;
