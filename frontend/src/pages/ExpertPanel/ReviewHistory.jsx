import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Annotations from '../../components/AnnotationTable/RowHistory';
import ViewComment from '../../components/CommentSection/ViewComment';
import Decision from '../../components/Decision';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';

function ReviewHistory() {

  const navigate = useNavigate();
  let [isEnlarge, setEnlarge] = useState(true);
  const {videoId} = useParams(); 
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`${API}/api/videos/reviewvideo/${videoId}`);
        setVideoData(response.data.video);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [videoId]);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`${API}/api/videos/brandproducts/${videoId}`);
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [videoId]);


  const handlePoductDetails = (product, brand, size, unit) => {
    navigate(`/product/view/${size}/${product}/${brand}/${unit}`);
  };


  const handleValueChange = (value) => {
    setEnlarge(value);
  };
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`${API}/api/videos/brandproducts/${videoId}`);
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [videoId]);

  // useEffect(() => {
  //   fetchData();
  // }, [responseData.product, responseData.brand, responseData.size]); // Added dependency array for useEffect

  // const fetchData = async () => {
  //   setIsLoading(true); // Set loading state to true when fetching data
  //   setError(null); // Reset error state before fetching data
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/product/view/${responseData.size}/${responseData.product}/${responseData.brand}`);
  //     //const result = response.data.filter(product => product.unit === unit); 
  //     //setAllProducts(result);
  //     setAllProducts(response.data);
  //     console.log(response.data);
  //     console.log(allProducts);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setError('Error fetching data. Please try again.'); // Set error message
  //   } finally {
  //     setIsLoading(false); // Set loading state to false after fetching data
  //   }
  // };



  // console.log(allProducts)
 
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen z-10'>
      <div className="w-full fixed h-full hidden sm:flex flex-col">
        <Sidebar type="expert" onValueChange={handleValueChange} />
      </div>
      <div className={`z-10 w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <Navbar type='expert' />
        <VideowithReview Id={videoId} text={"experthistory"} />
        <div className='mt-12 ml-24'>
          <h1 className='justify-center text-sidebarGreen text-xl font-semibold'>Annotations</h1>
          <Annotations videoId={videoId} usertype={"expert"} />
        </div>
        <div className=''>
          <div className='m-12 z-10'>
          <ViewComment videoId={videoId} type={"comment"} />
          </div>
        
      </div>
      <div className="mt-16 ml-24 w-[50%] justify-center items-center bg-gray-300 p-4 " >
        <h1 className='text-xl font-bold text-sidebarGreen mb-8 h-fit'>Decision for Video</h1>
        <Decision Id={videoId} text={"experthitory"} type={"expertDecisionhistory"}/>
        </div>
        <div className="flex items-end justify-center mt-4 z-10 h-full">
        {/* <button onClick={() => handlePoductDetails(responseData[0].size,responseData[0].product,responseData[0].brand,responseData[0].unit)}
                  className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                  >
                  View Product Details
                 </button> */}
          <button
            className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReviewHistory;