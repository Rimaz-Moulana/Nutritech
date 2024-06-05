import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ProductBar from '../../components/fields/ProductBar';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import LogTable from '../../components/tables/ProductTableAnnotator';

function Home() {

  const navigate= useNavigate();

  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/all')
  }
  const handleProducts = () =>{
    navigate('/product');
  }

  const videoupload= () => {
    navigate('/addnewproduct');
  };

  const [products, setProducts] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      console.log("fetching session details..");
        const authData = localStorage.getItem('token');
        // console.log(authData)

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
      const response = await axios.get('http://localhost:3000/api/product/getAll' , config); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
      setProducts(response.data);

      }
      else{
        navigate('/')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("fetching session details..");
        const authData = localStorage.getItem('token');
        // console.log(authData)

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
        const response = await fetch('http://localhost:3000/api/videos/history',config);
        if (!response.ok) {
          throw new Error(`Failed to fetch History. Status: ${response.uploader}`);
        }
        const data = await response.json();
        setVideoData(data);

      }else{
        navigate("/");
      }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchVideos();
  }, []);

  const handleFilter = (filter) => {
    if (filter === 'all') {
      setFilteredProducts(products);
    } else if (filter === 'updated') {
      // Filter updated products based on lastUpdatedTime
      const updatedProducts = products.filter(product => product.lastUpdatedTime !== undefined);
      setFilteredProducts(updatedProducts);
    } else if (filter === 'lastDay') {
      // Filter products updated within the last day
      const lastDayProducts = products.filter(product => {
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        return new Date(product.lastUpdatedTime) > lastDay;
      });
      setFilteredProducts(lastDayProducts);
    } else if (filter === 'lastWeek') {
      // Filter products updated within the last week
      const lastWeekProducts = products.filter(product => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return new Date(product.lastUpdatedTime) > lastWeek;
      });
      setFilteredProducts(lastWeekProducts);
    }
  };
  
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="researcher"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-0 sm:ml-72">
        <div className='p-5'>
        <Navbar type='researcher' />
        </div>
        <div className=' flex items-end mt-24 mr-4'>
      <button className="text-white h- bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " onClick={videoupload}>Upload New Product</button>
      </div>
       
        <div className='flex mt-4 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Products</h1>
        </div>
        <div className='w-full mb-10 ml-0 h-full '>
        <div className='z-50'>
          <ProductBar handleFilter={handleFilter} />
          <LogTable products={filteredProducts} />
        </div>
      </div>   
      </div>
    </div>
    
  );
}

export default Home;