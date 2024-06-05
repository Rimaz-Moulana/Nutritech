import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import ProductTable from '../../components/tables/LogTable';
import Rule from '../../components/Rule';
import Rules from '../Rules';
import Sidebar from '../../components/sidebar/SideBar';

function Home() {

  const navigate= useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [pendingVideoData, setPendingVideoData] = useState([]);
  const [annotatedVideoData, setAnnotatedVideoData] = useState([]);
  const [unannotatedVideoData, setUnannotatedVideoData] = useState([]);
  const [redVideoData, setRedVideoData] = useState([]);
  const [greenVideoData, setGreenVideoData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
 

  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/all')
  }
  const handleProducts = () =>{
    navigate('/addedproduct');
  }

  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/allUploadedVideos');
       const data = await response.json();
      setVideoData(data);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/allPendingUploadedVideos');
       const data = await response.json();
       setPendingVideoData(data);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/allUnannotatedUploadedVideos');
       const data = await response.json();
       setUnannotatedVideoData(data);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/allAnnotatedUploadedVideos');
       const data = await response.json();
       setAnnotatedVideoData(data);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/allRedUploadedVideos');
       const data = await response.json();
       setRedVideoData(data);
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/allGreenUploadedVideos');
       const data = await response.json();
       setGreenVideoData(data);
    };
  
    fetchData();
  }, []);
  
  const all= videoData.length;
  const pending = pendingVideoData.length;
  const unannotated = unannotatedVideoData.length;
  const annotated = annotatedVideoData.length;
  const green = greenVideoData.length;
  const red = redVideoData.length;
  
  const handleupload = () =>{
    navigate('/uploadvideo')
  }

  const addproducts= () => {
    navigate('/addnewproduct');
  };

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
        <Sidebar type="researcher" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <div className=''>
        <Navbar />
        </div>
        <div className='justify-center flex ml-8'>
        <button className="mt-24 text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
           onClick={handleupload}>
            Upload a video
           </button>
           <button className="mt-24 text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2" onClick={addproducts}>
          Add a Product
      </button>
        </div>
       
        
        <div className='lg:pr-8 lg:pt-8 flex justify-center items-center h-full '>
          <div className='flex flex-col items-center'>
        <div className="mt-12 grid grid-cols-3 gap-4 p-8">
        <div>
        <HomeSwiper count={all} type={"All Uploaded Videos"} user={"Industry"}/>
        </div>
        <div>
        <HomeSwiper count={annotated} type={"Annotated Videos"} user={"Industry"}/>
        </div>
        <div>
          <HomeSwiper count={pending} type={"Pending Videos"} user={"Industry"} />
        </div>
        <div>
          <HomeSwiper count={unannotated} type={"Unannotated Videos"} user={"Industry"}/>
        </div>
        <div>
          <HomeSwiper count={red} type={"Red Flag Videos"} user={"Industry"} />
        </div>
        <div>
          <HomeSwiper count={green} type={"Green Flag Videos"} user={"Industry"} />
        </div>
      </div>
        
        </div> 
        </div>
       
        </div>
    </div>
  );
}

export default Home;
