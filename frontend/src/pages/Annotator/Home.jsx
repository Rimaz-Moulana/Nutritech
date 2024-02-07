import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import AnnotatorSideBar from '../../components/sidebar/AnnotatorSideBar';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import ProductTable from '../../components/tables/ProductTable';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate= useNavigate();

  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/all')
  }
  const handleProducts = () =>{
    navigate('/product');
  }

  return (
    <div className='bg-backgroundGreen flex h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <AnnotatorSideBar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full z-10 sm:ml-64">
        <div>
        <Navbar type='annotator' />
        </div>
     
        <div className='flex justify-between z-9999'>
        <h1 className='ml-8 mb-8 mt-24 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
           Videos
        </h1>
        <button className="text-white mt-24 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleVideos}>All Videos</button>
        </div>
        
        <HomeSwiper/>
        <div className='flex mt-16 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
                  Products
                </h1>
        <button className="text-white mt-4 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleProducts}>All Products</button>
                
        </div>
        <ProductTable />
      </div>
    </div>
  );
}

export default Home;
