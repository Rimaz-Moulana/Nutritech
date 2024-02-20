import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const filteredFiles = files.filter((file) => {
      const fileType = file.type.split('/')[0];
      return fileType === 'image';
    });

    const imagePreviews = filteredFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  return (
    <div className="flex flex-wrap">
      <label htmlFor="imageUpload" className="relative cursor-pointer border border-gray-300 rounded-md overflow-hidden">
        <input id="imageUpload" type="file" className="sr-only" multiple onChange={handleImageChange} />
        <span className="absolute inset-0 bg-gray-50 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="mt-2 text-sm leading-5 text-gray-600">Select Images</span>
        </span>
      </label>
      {images.map((image, index) => (
        <div key={index} className="w-32 h-32 m-2 relative">
          <img src={image} alt={`Uploaded Image ${index + 1}`} className="object-cover w-full h-full rounded-md" />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
            onClick={() => setImages((prevImages) => prevImages.filter((_, i) => i !== index))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 00-1 1v10a1 1 0 102 0V4a1 1 0 00-1-1zm-4 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm11 10a1 1 0 00-1 1v1a1 1 0 11-2 0v-1a1 1 0 00-1-1H7a1 1 0 00-1 1v1a1 1 0 11-2 0v-1a3 3 0 013-3h10a3 3 0 013 3v1a1 1 0 11-2 0v-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
