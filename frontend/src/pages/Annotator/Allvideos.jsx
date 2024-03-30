import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import Sidebar from '../../components/sidebar/SideBar';

function Allvideos() {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }



  useEffect(() => {
    const fetchData = async () => {
      
      try{
        console.log("fetching session details..");
      const authData = localStorage.getItem('token');
      console.log(authData)

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
    }, 150000); // 60 seconds


      if(authData){
        const {accessToken} = authData;
        console.log(accessToken);
        const config = {
          headers : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        };

      
      console.log(config)
       const response = await fetch('http://localhost:3000/api/videos/all', config);
      const data = await response.json();
      setVideoData(data);
      
    
  }
  else{
    navigate('/');  //login path when token is expired
  }
  }catch(error){
    console.error('Error fetching data:', error);
  }
  }
  fetchData();
}, []); 

  // console.log(videoData)

  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex h-full min-h-screen w-full justify-between pr-3'>
      <div className="fixed h-full hidden sm:flex flex-col">
        <Sidebar type="annotator" />
      </div>
      <div className="w-full h-full center-l  lg:ml-[15%] px-3">
        <Navbar type='annotator' />
        <div className='flex justify-between'>
          <h1 className=' mb-8 mt-32 lg:text-3xl sm:text-xl font-semibold text-sidebarGreen pl-3'>
                  All Videos
                </h1>
<div className='pr-3'>
<label className='themeSwitcherTwo shadow-card relative mt-32 lg:h-10 sm:h-6  inline-flex  cursor-pointer select-none rounded-md bg-white '>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex space-x-4 rounded pt-2 pb-2 px-2 text-sm font-medium ${
            !isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
        
          List View
        </span>
        <span
          className={`flex space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
</div>
     
</div>
        
<VideoContainer 
        type={'all'}
        videoData={videoData}
        viewType={isChecked ? 'Grid' : 'List'}         
      /> 
       
      </div>
    </div>
  );
}

export default Allvideos;
