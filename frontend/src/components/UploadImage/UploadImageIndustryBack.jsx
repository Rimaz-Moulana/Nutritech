import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

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

  const getImageAltText = index => {
    switch (index) {
      case 0:
        return 'FOP Image';
      case 1:
        return 'BOP Image';
      case 2:
        return 'ROP Image';
      case 3:
        return 'LOP Image';
      default:
        return '';
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
                  alt={getImageAltText(index)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-400">Upload {getImageAltText(index)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
