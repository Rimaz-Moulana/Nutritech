import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import API from '../../config/config';

function UploadVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile , setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    formData.append('createdAt' , Date.now())    

    try{
      console.log(formData)
      const response  = await axios.post(`${API}/api/videos/upload`, formData);
      console.log(response.data);
      setUploadStatus("Video uploaded successfully!");
    }catch(error){
      console.error('Error uploading video:', error);
      setUploadStatus('Error uploading video.');
    }
  }

  const loadSession = async ()=>{
    try{
      console.log("")
    }
    catch(error){
      console.error()
    }

  }

  useEffect(()=>{
    loadSession();
  })

  return (
    <div className='bg-backgroundGreen flex h-screen'>
    <div className="w-full ml-12 mr-4 ">
      <Navbar />
      <div className='flex justify-between '>
      <h1 className=' mb-8 mt-32 lg:mr-[820px] text-3xl ml-4 font-semibold text-sidebarGreen justify-start'>
         Upload Advertisement Video
      </h1>
      <div className='mt-40 '>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
          <label>Upload Video:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
        <div className='flex h-full justify-center mt-16 sm:h-full'>
        <button type="submit" className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " >Upload</button>
        <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => window.history.back()}>Cancel</button>
    </div>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
      </div>
      </div>
  </div>
);
}

export default UploadVideo
