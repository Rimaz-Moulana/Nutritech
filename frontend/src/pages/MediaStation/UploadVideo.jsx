import React from 'react'
import UploadForm from '../../components/UploadVideo/UploadForm';
import VideoUpload from '../../components/UploadVideo/VideoUpload';
import UploadNewVideoUIBtnSet from '../../components/button/UploadNewVideoUIBtnSet';
import NavbarMediaStation from '../../components/navbar/NavbarMediaStation';


function UploadVideo() {
  return (
    <div className='bg-backgroundGreen flex'>
    <div className="w-full ml-12 mr-4 h-full ">
      <NavbarMediaStation />
      <div className='flex h-full justify-between'>
      <h1 className=' mb-8 mt-32 text-3xl ml-4 font-semibold text-sidebarGreen justify-start h-full '>
         Upload Advertisement Video
      </h1>
      
      </div>
      <div className='flex mt-16 h-full'>
      <UploadForm/>
      <VideoUpload/>
      </div>
      <UploadNewVideoUIBtnSet/>
    </div>
  </div>
);
}

export default UploadVideo
