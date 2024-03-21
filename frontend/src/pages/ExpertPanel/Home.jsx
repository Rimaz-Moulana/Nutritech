import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import ProductTable from '../../components/tables/LogTable';
import ExpertPanelSidebar from '../../components/sidebar/ExpertPanelSidebar';

function Home() {

  const navigate= useNavigate();
  const [videoData, setVideoData] = useState([]);
  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/annotator/all')
  }
  const handleProducts = () =>{
    navigate('/annotator/product');
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://localhost:3000/api/videos/annotatedvideosExpert');
      const data = await response.json();
      setVideoData(data);
    };
  
    fetchData();
  }, []); 


  const fetchData = async () => {
    try {
      console.log("fetching session details..");
      const authData = localStorage.getItem('token');
      console.log(authData)

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
    }, 30000); // 60 seconds


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
      const response = await axios.get('http://localhost:3000/api/product/getAll', config ); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
      setProducts(response.data);
       // Schedule token expiration check
       
      }
      else{
        navigate('/');  //login path when token is expired
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(videoData)
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <ExpertPanelSidebar/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64">
        <div className='p-1'>
        <Navbar />
        </div>
        <div className='flex justify-between z-9999 mt-12'>
        <h1 className='ml-8 mb-8 mt-12 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           Videos
        </h1>
        <button className="text-white mt-24 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleVideos}>All Videos</button>
        </div>
        <HomeSwiper videoData={videoData}/>
        <div className='flex mt-24 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Products</h1>
        <button className="text-white mt-4 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleProducts}>All Products</button> 
        </div>
        
        <div className='flex'>

        {/* <ProductTable data={products} /> */}
        </div>
        {/* <div className='mt-4 left-0'>
        <ProductTable data={products} />
        </div> */}
        <div className='mt-4 left-0'>

        <ProductTable data={products} />
        </div>
      </div>

      </div>
      
    // </div>

    // </div>

  );
}

export default Home;
