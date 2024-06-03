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
let [isEnlarge, setEnlarge] = useState(true);
const {videoId} = useParams(); 
const [responseData, setResponseData] = useState([]);
const [loading, setLoading] = useState(true);

const [allProducts, setAllProducts] = useState([]);
const [isLoading, setIsLoading] = useState(false); // Added loading state
const [error, setError] = useState(null); // Added error state
const [videoData, setVideoData] = useState([]);
// const [loading,setLoading] =useState(true);

//   const [RuleData, setRuleData] = useState([]);

useEffect(() => {
const fetchReviewDetails = async () => {
  try {
    console.log("fetching session details..");
      const authData = JSON.stringify(localStorage.getItem('token'));
      console.log("authData:", authData);

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
    const response = await axios.get(`http://localhost:3000/api/videos/reviewvideo/${videoId}`, config);
    setVideoData(response.data.video);

    }
    else{
    navigate('/')
    }
  } catch (error) {
    console.error('Error fetching ReviewDetails:', error);
  } finally {
    setLoading(false);
  }
};

fetchReviewDetails();
}, [videoId]);

  let text;

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        console.log("fetching session details..");
      const authData = JSON.stringify(localStorage.getItem('token'));
      console.log("authData:", authData);

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
        const response = await axios.get(`http://localhost:3000/api/videos/brandproducts/${videoId}`, config);
        setResponseData(response.data);
        
    }
        else{
          navigate("/")
        }
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

  // const handlePoductDetails = (product,brand,size) =>{
  //   navigate(`/product/view/${size}${product}/${brand}`)
  // }

  console.log(allProducts)
  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        console.log("fetching session details..");
      const authData = JSON.stringify(localStorage.getItem('token'));
      console.log("authData:", authData);

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
        const response = await axios.get(`http://localhost:3000/api/videos/brandproducts/${videoId}`, config);
        setResponseData(response.data);

    }else{
      navigate('/')
    }
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

  const handlePoductDetails = (product,brand,size,unit) =>{
    navigate(`/product/view/${size}${product}/${brand}/${unit}`)
  }

  console.log(allProducts)
 
  // console.log(Data)
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
       
        <Navbar type='expert' />
        <VideowithReview Id={videoId} text={"experthistory"}/>
      
        <div className='mt-12 ml-24'>
            <Annotations videoId={videoId} usertype={"expert"}/>
        </div>
        {/* {!videoData.reannotations>0 && ( */}
        <ViewComment videoId={videoId} type={"comment"}/>
        
        <div className=" flex items-end justify-center mt-4 z-10 h-full"> {/* Position cancel button at the bottom */}
 
        <button  onClick={()=>handlePoductDetails(responseData.size,responseData.product,responseData.brand,responseData.unit)}
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
