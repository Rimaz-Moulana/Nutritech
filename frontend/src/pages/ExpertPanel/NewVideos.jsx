import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import API from '../../config/config';



function NewVideos() {

  const [videoData, setVideoData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
  const [Data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });
  const email  = localStorage.getItem('email');

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
       try {
          const response = await axios.get(`${API}/api/users/getUser/${email}`);
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
       }
    };
  
    fetchUser();
}, []);


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }

  const navigate= useNavigate();

  // const fetchData = async (url, email, setVideoData, setData) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
      
  //     const filteredData = data.filter(video => {
  //         return !video.panelstatus.some(status => status.email === email);
  //       });
  //     setVideoData(data);
  //     setData(filteredData);
  //     console.log(filteredData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   const url = userData.role === "expert head" 
  //     ? 'http://localhost:3000/api/videos/annotatedvideosExpert' 
  //     : 'http://localhost:3000/api/videos/allAnnotatedUploadedVideos';
    
  //   fetchData(url, email, setVideoData, setData);
  // }, [email, userData.role, setVideoData, setData]); // Add dependencies
  
useEffect(() => {
  const fetchData = async (url, email, setVideoData, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Filter videos based on the conditions
      const filteredData = data.filter(video => {
        // If the user is an expert head, no filtering based on panelstatus
        if (userData.role === "expert head") {
          return true;
        }
        // If the user is not an expert head, apply the filtering
        return (video.status === "annotated" && !video.panelstatus.some(status => status.email === email));
      });
  
      setVideoData(data);
      setData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

},[]);
  
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
        const response = await fetch(`${API}/api/videos/annotatedvideosExpert`, config);
        const data = await response.json();
        const filteredData = data.filter(video => {
          return !video.comment.some(comment => comment.commenter === email);
        });
        setVideoData(data);
        setData(filteredData);

      }else{
        navigate('/');
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const url = userData.role === "expert head" 
      ? `${API}/api/videos/annotatedvideosExpert`
      : `${API}/api/videos/allAnnotatedUploadedVideos`;

  
    fetchData(url, email, setVideoData, setData);
  }, [email, userData.role, setVideoData, setData]);

  
  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };
  console.log(Data);

  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full pr-8 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <Navbar type='expert' />
        <div className='flex justify-between z-9999 mt-12'>
        <h1 className='ml-24 mb-8 mt-24 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           New Videos
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
        type={'expertnew'}
        videoData={Data}
        viewType={isChecked ? 'Grid' : 'List'}         
      /> 
      </div>
        
      </div>
    </div>
  );
}

export default NewVideos
