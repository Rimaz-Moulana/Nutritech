import React, { useState } from 'react';

const ImageUploadField = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='inline-block px-5 w-[25%] '>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
            />
            <label htmlFor="imageUpload" className="flex flex-col items-center justify-center w-40 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-24 h-24 object-cover rounded"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                        <span className="text-gray-400">Upload Front Image</span>
                    </div>
                )}
            </label>
        </div>
    );
};

export default ImageUploadField;
