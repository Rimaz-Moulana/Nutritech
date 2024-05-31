import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';

function Allvideos() {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
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

const handleValueChange = (value) => {
  console.log(value)
  if(value==true){
    setEnlarge(true);
  }else{
    setEnlarge(false);
  }
};

  // console.log(videoData)

  return (
    <div className='bg-backgroundGreen w-full lg:overflow-x-hidden min-w-screen flex min-h-screen sm:text-sm'>
      <div className="fixed h-full hidden sm:flex flex-col">
        <Sidebar type="annotator" onValueChange={handleValueChange} />
      </div>
      <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <div>
          
        <Navbar type='annotator' />
        </div>
        {/* <div className='pr-8 pt-8 flex justify-center items-center h-full'> */}
          {/* <div className='flex flex-col items-center'> */}
        <div className='pr-8 flex justify-between'>
          <h1 className='mb-8 mt-32 lg:text-3xl sm:text-2xl p-2 font-semibold text-sidebarGreen'>
                  All Videos
                </h1>
<div className='pr-3'>
<label className='themeSwitcherTwo shadow-card relative mt-32 lg:h-10 md:h-8 sm:h-6  inline-flex  cursor-pointer select-none rounded-md bg-white text-center '>
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
          className={`flex space-x-4 rounded py-2 px-2 text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
{/* </div> */}
     {/* </div> */}
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
