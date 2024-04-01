import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Product from '../../components/SensorManager/Product';
import axios from 'axios';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewProduct() {
  const {productId} = useParams();
  const [responseData, setResponseData] = useState([]);
 
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/similarproducts/${productId}`);
        setResponseData(response.data);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        // setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [productId]);
console.log(responseData)
  return ( 
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
          <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
          <Sidebar type="sensormanager" />
          </div>
          <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
            <Navbar type='sensormanager'/>
            <div className='flex justify-between w-full min-w-screen'>
            <VideowithReview Id={productId} text={"product"}/>
           
            
          </div>

          <Product productData={responseData}/>
          </div>
        </div>
  )
}

export default ReviewProduct
