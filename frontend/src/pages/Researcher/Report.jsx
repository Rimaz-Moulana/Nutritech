import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import AnnotatedVideos from '../../components/tables/AnnotatedVidoes';

function Home() {

  const navigate= useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // const handleVideos = () =>{
  //   console.log('button clicked')
  //   navigate('/all')
  // }
  // const handleProducts = () =>{
  //   navigate('/product');
  // }

  // const videoupload= () => {
  //   navigate('/uploadvideo');
  // };

  // const [products, setProducts] = useState([]);
  // const [videoData, setVideoData] = useState([]);

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   fetchData();
  // }, []);
  
  // const fetchData = async () => {
  //   try {
  //     console.log("hi")
  //     const response = await axios.get('http://localhost:3000/api/product/getAll'); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setError('Error fetching data. Please try again.'); // Set error message
  //   } finally {
  //     setIsLoading(false); // Set loading state to false after fetching data
  //   }
  // }

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/videos/history');
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch History. Status: ${response.uploader}`);
  //       }
  //       const data = await response.json();
  //       setVideoData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchVideos();
  // }, []);
  
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="researcher"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64">
        <div className='p-1'>
        <Navbar type='researcher' />
        </div>
        <div className='flex mt-20 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Annotated Vidoes</h1>
        </div>
        <div className='w-full lg:mb-10 lg:ml-5 sm:w-[90%] h-full z-10 '>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
            <AnnotatedVideos /> // Pass fetched products as props to Table component
        )}
        
      </div>
      </div>
    </div>
  );
}

export default Home;
