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
  const [RuleData, setRuleData] = useState([]);

  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/all')
  }
  const handleProducts = () =>{
    navigate('/addedproduct');
  }

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   fetchData();
  // }, []);
  useEffect(()=> {
  const fetchData = async () => {
    try {
      console.log("hi")
      const response = await axios.get('http://localhost:3000/api/product/getAll'); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchData();
},[]);

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
      try {
        const response = await axios.get('http://localhost:3000/api/rules/rules');
        const data = response.data;
        // console.log(data); // This should log the fetched data
        setRuleData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleupload = () =>{
    navigate('/uploadvideo')
  }

  const addproducts= () => {
    navigate('/addnewproduct');
  };

  const type="industry";
  const viewrules= () => {
    navigate(`/rules/${type}`);
  };


  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="industry"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64">
        <div className=''>
        <Navbar />
        </div>
        <div className='flex ml-8'>
        <button className="mt-24 text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
           onClick={handleupload}>
            Upload a video
           </button>
           <button className="mt-24 text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={addproducts}>
          Add a Product
      </button>
        </div>
        <div className='flex justify-between z-9999 mt-4'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           Videos
        </h1>
        <button className="text-white mt-4 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleVideos}>View All Videos</button>
        </div>
        <HomeSwiper videoData={videoData}/>
        <div className='flex mt-8 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Products</h1>
        <button className="text-white mt-4 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleProducts}>View All Products</button> 
        </div>
        <div className='left-0'>
        <ProductTable data={products} />
        </div>
        <div>
          <div className='flex mt-8 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Rules and Regulations</h1>
        <button className="mt-4 text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={viewrules}>
          View All rules
      </button>
        </div>
        {RuleData.map((rule, index) => (
          index<4 &&
        <Rule key={index} rule={rule} type={"industry"}/>
          
      ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
