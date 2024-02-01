import React from 'react'
import UploadForm from '../../components/UploadVideo/UploadForm';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import UploadNewVideoUIBtnSet from '../../components/button/UploadNewVideoUIBtnSet';
import NavbarMediaStation from '../../components/navbar/NavbarMediaStation';


function UploadVideo() {
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
