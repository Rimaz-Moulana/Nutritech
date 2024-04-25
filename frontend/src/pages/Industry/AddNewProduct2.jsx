import axios from 'axios';
import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImages(prevImages => {
        const newImages = [...prevImages];
        newImages[index] = reader.result;
        return newImages;
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e,index) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    
    reader.onloadend = () => {
      setVideo(prevImages => {
        const newImages = [...prevImages];
        newImages[index] = reader.result;
        return newImages;
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadData = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    formData.append('video', video);

    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="flex px-8">
      <div className="grid grid-cols-4 gap-2 ">
        {[...Array(4).keys()].map(index => (
          <div key={index} className="relative w-full h-full flex-col px-10 py-24 items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0  cursor-pointer"
              style={{ width: '200px', height: '150px' }}
              onChange={e => handleImageChange(e, index)}
            />
            <div className="w-full h-full flex-col items-center justify-center border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              {images[index] ? (
                <img
                  src={images[index]}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-400">Upload Image {index + 1}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-1/2 items-center justify-center">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Advertisement Video(MP4)</p>
          </div>
          <input id="dropzone-file" type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
        </label>
      </div> 

      <button className='z-10 w-[100%] text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ' onClick={uploadData}>Upload</button>
    </div>
  );
};

export default ImageUploader;
