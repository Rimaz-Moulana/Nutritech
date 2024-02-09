import axios from 'axios';
import { default as React, default as useState } from 'react';
import UploadForm from '../../components/UploadVideo/UploadForm';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import UploadNewVideoUIBtnSet from '../../components/button/UploadNewVideoUIBtnSet';
import NavbarMediaStation from '../../components/navbar/NavbarMediaStation';


function UploadVideo() {
    const [formData, setFormData] = useState({
        brandName: '',
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
        try {
          // Make POST request to the backend
          const response = await axios.post("http://localhost:3000/api/videos/upload", formData);
          console.log(response.data); // Handle response accordingly
        } catch (error) {
          console.error('Error:', error);
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
      <div className=''>
      <UploadNewVideoUIBtnSet handleSubmit={handleSubmit} />
      </div>
      
    </div>
  </div>
);
}

export default UploadVideo
