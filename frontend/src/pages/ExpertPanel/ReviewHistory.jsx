import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Annotations from '../../components/AnnotationTable/RowHistory';
import ViewComment from '../../components/CommentSection/ViewComment';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import Decision from '../../components/Decision';

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
        const response = await axios.get(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
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
        const response = await axios.get(`http://localhost:3000/api/videos/brandproducts/${videoId}`);
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [videoId]);

  const handlePoductDetails = (product, brand, size) => {
    navigate(`/product/view/${size}${product}/${brand}`);
  };

  const handleValueChange = (value) => {
    setEnlarge(value);
  };
 
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col">
        <Sidebar type="expert" onValueChange={handleValueChange} />
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <Navbar type='expert' />
        <VideowithReview Id={videoId} text={"experthistory"} />
        <div className='mt-12 ml-24'>
          <Annotations videoId={videoId} usertype={"expert"} />
        </div>
        <div className='flex gap-6'>
          <div className='mt-4 ml-24'>
          <ViewComment videoId={videoId} type={"comment"} />
          </div>
       
        <div className="mt-24 ml-8 bg-gray-300 p-4 " >
        <h1 className='text-xl font-bold text-sidebarGreen mb-8 h-fit'>Decision for Video</h1>
        <Decision Id={videoId} text={"experthitory"} type={"expertDecision"}/>
        </div>
       
      </div>
        <div className="flex items-end justify-center mt-4 z-10 h-full">
          <button
            onClick={() => handlePoductDetails(responseData.product, responseData.brand, responseData.size)}
            className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >
            View Product Details
          </button>
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
