import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';

function ReviewedVideos() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });
  const email  = localStorage.getItem('email');

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching session details..");
      const authData = JSON.stringify(localStorage.getItem('token'));
      console.log("authData:", authData);

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, 7200000); // 2hours

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
        const response = await fetch('http://localhost:3000/api/videos/annotatedvideosExpert');
        const data = await response.json();
  
        // Filter out videos where the commenter's email doesn't match the user's email
        const filteredData = data.filter(video => {
          return video.comment.some(comment => comment.commenter === email) && video.status ==="annotated";
        });
  
        // Update the state with the filtered data
        // setVideoData(data);
        setData(filteredData);

      }else{
        navigate('/')
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [email]); // Add email to the dependency array to re-fetch data when email changes
  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };

  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        
        <Navbar type='expert' />
      
        <div className='flex justify-between z-9999 mt-12'>
        <h1 className='ml-24 mb-8 mt-24 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           Reviewed Videos By You
        </h1>

        <label className='themeSwitcherTwo shadow-card relative mt-32 h-10  inline-flex  cursor-pointer select-none rounded-md bg-white '>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
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
      <div>
      <VideoContainer
        type={'expertreviewed'}
        videoData={Data}
        viewType={isChecked ? 'Grid' : 'List'}         
      /> 
      </div>
        
      </div>
    </div>
  );
}

export default ReviewedVideos
