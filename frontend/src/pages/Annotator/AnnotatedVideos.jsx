import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';

function AnnotatedVideos() {
  const navigate = useNavigate();
  const [annotatedVideoData, setannotatedVideoData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
  const [isChecked, setIsChecked] = useState(() => {
    // Retrieve the checkbox state from localStorage, defaulting to false if not found
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });

   // Add type as a dependency
  

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }



  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        // Allvideos.jsx
        console.log("fetching session details..");
        const authData = localStorage.getItem('token');
        console.log(authData)

        setTimeout(() => {
          // Remove token from local storage after 5 seconds
          localStorage.removeItem('token');
          localStorage.removeItem('email');
      }, 7200000); // 2hours

      if(authData){
          const parsedAuthData = JSON.parse(authData);
          const { accessToken } = parsedAuthData;  // Ensure the structure of parsedAuthData has accessToken
          console.log(accessToken);
        const config = {
          headers : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        };
       // Replace with your actual API endpoint
           
        const response = await fetch('http://localhost:3000/api/videos/annotated-videos',config);
        console.log('Data:', response.data);
        const data = await response.json();
        setannotatedVideoData(data);

      }else{
        navigate('/');
      }
      }catch(error){
        console.error(error);
      }
       
    };

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
  
  return (
    <div className='bg-backgroundGreen w-full lg:overflow-x-hidden min-w-screen flex min-h-screen sm:text-sm'>
      <div className="fixed h-full hidden sm:flex flex-col">
        <Sidebar type="annotator" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>

        <Navbar type='annotator'/>
        <div className='pr-8 flex justify-between'>
        <h1 className=' mb-8 mt-32 lg:text-3xl sm:text-xl font-semibold text-sidebarGreen pl-3'>
           Annotated Videos
        </h1>
        
        <div className='pr-3'>
        <label className='themeSwitcherTwo shadow-card relative mt-32 lg:h-10 md:h-8 sm:h-6  inline-flex  cursor-pointer select-none rounded-md bg-white '>
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
          className={`flex space-x-2 rounded py-2 px-2 text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
</div>
     
      </div>
      <VideoContainer 
        type={'annotated'}
        videoData={annotatedVideoData}
        viewType={isChecked ? 'Grid' : 'List'} 
        
      /> 
      </div>
    </div>
  );
}

export default AnnotatedVideos;
