import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewVideos() {
  return (
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="sensormanager" />
      </div>
      <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
        <Navbar type='sensormanager'/>
      </div>
    </div>
);
}

export default ReviewVideos
