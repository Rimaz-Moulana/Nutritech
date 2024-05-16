import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import ProductTable from '../../components/tables/LogTable';
import Sidebar from '../../components/sidebar/SideBar';

function Home() {
  const navigate= useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [newVideoData, setNewVideoData]= useState([]);
  const [redVideoData, setRedVideoData]= useState([]);
  const [greenVideoData, setGreenVideoData]=useState([]);
  const email  = localStorage.getItem('email');
  const [userData, setUserData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
          const response = await axios.get(`http://localhost:3000/api/users/getUser/${email}`);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);

useEffect(() => {
  const fetchData = async () => {
     const response = await fetch('http://localhost:3000/api/videos/redflag');
    const data = await response.json();
    setRedVideoData(data);
  };

  fetchData();
}, []); 


useEffect(() => {
  const fetchData = async () => {
     const response = await fetch('http://localhost:3000/api/videos/greenflag');
    const data = await response.json();
    setGreenVideoData(data);
  };

  fetchData();
}, []); 

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/videos/annotatedvideosExpert');
      const data = await response.json();
      setNewVideoData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

 

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
    }, 1800000); // 60 seconds


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
 
  const newVideos = newVideoData.length;
  const redVideos = redVideoData.length;
  const greenVideos = greenVideoData.length;

  const handlepath = (type) =>{
    console.log(type);
    if(type=="New Videos"){
      navigate('/expertpanelnew');
    }else if(type=="Red flag Videos"){
      navigate('/red');
    }else if(type=="Green flag Videos"){
      navigate('/green');
    }
  }

  const handleValueChange = (value) => {
    // console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };

  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="expert" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <div className='p-1'>
        <Navbar type={"expert"}/>
        </div>
        <div className='flex justify-between z-9999 mt-12'>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 p-8">
        <div>
        <HomeSwiper count={newVideos} type={"New Videos"}  handlepath={() => handlepath("New Videos")}/>
        </div>

        <div>
        <HomeSwiper count={redVideos} type={"Red flag Videos"}  handlepath={() => handlepath("Red flag Videos")}/>
        </div>

        <div>
        <HomeSwiper count={greenVideos} type={"Green flag videos"}  handlepath={() => handlepath("Green flag Videos")}/>
        </div>
        </div>
        
       
      
     </div>

     </div>

  );
}

export default Home;
