import axios from 'axios';
import React, { useEffect, useNavigate, useState } from 'react';
import { useParams } from 'react-router-dom';
import Annotations from '../../components/AnnotationTable/RowHistory';
import ViewComment from '../../components/CommentSection/ViewComment';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewHistory() {
const navigate= useNavigate();
const {videoId} = useParams(); 
const [responseData, setResponseData] = useState([]);
const [loading, setLoading] = useState(true);
const [allProducts, setAllProducts] = useState([]);
const [isLoading, setIsLoading] = useState(false); // Added loading state
const [error, setError] = useState(null); // Added error state

 
  let text;

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

  const handlePoductDetails = (product,brand,size) =>{
    navigate(`/product/view/${size}${product}/${brand}`)
  }

  console.log(allProducts)
 
  // console.log(Data)
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64 ">
        <div className='px-12'>
        <Navbar type='annotator' />
        </div>
        <div className='flex justify-between z-9999 mt-24'>
        <VideowithReview Id={videoId} text={"experthistory"}/>
        </div>
        <div className='mt-12 ml-24'>
            <Annotations videoId={videoId} usertype={"expert"}/>
        </div>

        <ViewComment videoId={videoId} type={"comment"}/>
        <div className=" flex items-end justify-center mt-4 z-10 h-full"> {/* Position cancel button at the bottom */}
 
        <button  onClick={handlePoductDetails(responseData.size,responseData.product,responseData.brand)}
                  className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                  >
                  View Product Details
                </button>

                <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 onClick={() => window.history.back()}>
                  Cancel
                </button>
      </div>

      
      </div>
    </div>
  );
}

export default ReviewHistory;
