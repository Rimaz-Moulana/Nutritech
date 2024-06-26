import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';

function Home() {

  const navigate= useNavigate();
  let [isEnlarge, setEnlarge] = useState(true);

  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/all')
  }
  const handleProducts = () =>{
    navigate('/addedproduct');
  }

  const type="sensormanager";
  const viewrules= () => {
    navigate(`/rules/${type}`);
  };

  const [VideoData, setVideoData] = useState([]);
  const [unannotatedVideoData, setUnannotatedVideoData]= useState([]);
  const [pendingVideoData, setPendingVideoData] = useState([]);


  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      // try {
        // Allvideos.jsx

        const token = localStorage.getItem('token');
        console.log("token:", token);

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, 7200000); // 2hours


      if (token) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };
        const response = await fetch(`${API}/api/videos/sensormanagerallvideos`, config);

        //const response = await fetch('http://localhost:3000/api/videos/allUploadedVideos',config);

        const data = await response.json();
        setVideoData(data);

      }else{
        navigate('/')
      }

    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchUnannotatedVideos = async () => {
      try {

        const token = localStorage.getItem('token');
        console.log("token:", token);

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, 7200000); // 2hours


      if (token) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };
        const response = await axios.get(`${API}/api/rules/rules`, config);
        const data = response.data;
        console.log(data); // This should log the fetched data
        setRuleData(data);

      }else{
        navigate("/")
      }

        const response = await fetch(`${API}/api/videos/sensormanagerallvideos`);
        if (!response.ok) {
          throw new Error(`Failed to fetch unannotated videos. Status: ${response.status}`);
        }
        const data = await response.json();
        setUnannotatedVideoData(data);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUnannotatedVideos();
  }, []);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      // try {
        // Allvideos.jsx
        const response = await fetch(`${API}/api/videos/sensormanagernewvideo`);
        const data = await response.json();
        setPendingVideoData(data);

    };

    fetchData();
  }, []);

  
  const unannotatedvideos =unannotatedVideoData.length;
  const all =VideoData.length;
  const newVideos = pendingVideoData.length;


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
        <Sidebar type="sensormanager" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <div className='p-1'>
        <Navbar type='sensormanager' />
        </div>
        <div className='lg:pr-8 lg:pt-8 flex justify-center items-center h-full '>
          <div className='flex flex-col items-center'>
        <div className="mt-12 grid grid-cols-2 gap-4 p-8">
        <div>
        <HomeSwiper count={all} type={"All Videos"} user={"Sensor Manager"}  />
        </div>
        <div>
        <HomeSwiper count={unannotatedvideos} type={"Reviewed Videos"} user={"Sensor Manager"}   />
        </div>

        <div>
        <HomeSwiper count={newVideos} type={"Pending Videos"} user={"Sensor Manager"}   />
        </div>
        </div>
        </div>
        </div>
      </div>
    </div>
   
  );
}

export default Home;
