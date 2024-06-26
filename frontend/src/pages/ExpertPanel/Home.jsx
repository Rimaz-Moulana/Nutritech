import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from "../../config/config";
import ReviewedVideos from './ReviewedVideos';

function Home() {
  const navigate= useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [newVideoData, setNewVideoData]= useState([]);
  const [redVideoData, setRedVideoData]= useState([]);
  const [greenVideoData, setGreenVideoData]=useState([]);
  const [reviewedData, setReviewedData]=useState([]);
  const email  = localStorage.getItem('email');
  const [userData, setUserData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
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
          const response = await axios.get(`${API}/api/users/getUser/${email}`, config);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state

          }else{
            navigate('/')
          }
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);


useEffect(() => {
  const fetchData = async (url, email, setReviewedData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const filteredData = data.filter(video => 
        video.panelstatus.some(status => status.email === email)
      );

      setReviewedData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const url = `${API}/api/videos/allAnnotatedUploadedVideos`;
  fetchData(url, email, setReviewedData);
}, [email, API, setReviewedData, userData.role]); // Ensure all dependencies are included



useEffect(() => {
  const fetchData = async () => {
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
     const response = await fetch(`${API}/api/videos/redflag` , config);
    const data = await response.json();
    setRedVideoData(data);

          }else{
            navigate('/')
          }
  };

  fetchData();
}, []); 


useEffect(() => {
  
  const fetchData = async () => {
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
     const response = await fetch(`${API}/api/videos/greenflag`, config);
    const data = await response.json();
    setGreenVideoData(data);

          }else{
            navigate('/')
          }
  };

  fetchData();
}, []); 

useEffect(() => {
  const fetchData = async () => {
    try {
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
      const response = await fetch(`${API}/api/videos/annotatedvideosExpert` , config);
      const data = await response.json();
      setNewVideoData(data);

          }else{
            navigate('/')
          }
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
       const response = await fetch(`${API}/api/videos/annotatedvideosExpert`, config);
      const data = await response.json();
      setVideoData(data);
    
  }else{
    navigate('/');
  }
}
  
    fetchData();
  }, []); 


  const fetchData = async () => {
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
      
      console.log(config)
      const response = await axios.get(`${API}/api/product/getAll`, config ); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
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
 
  const reviewedVideos = reviewedData.length;
  const newVideos = newVideoData.length;
  const newV = newVideos-reviewedVideos;
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
          {
            userData.role==="expert head" &&
            <div>
            <HomeSwiper user={userData.role}  count={newVideos} type={"New Videos"}  handlepath={() => handlepath("New Videos")}/>
            </div>
          }
       
       {
            userData.role==="expert panel" &&
            <div>
            <HomeSwiper user={userData.role} count={newV} type={"New Videos"}  handlepath={() => handlepath("New Videos")}/>
            </div>
          }

{
            userData.role==="expert panel" &&
            <div>
            <HomeSwiper user={userData.role} count={reviewedVideos} type={"Reviewed Videos"}  handlepath={() => handlepath("New Videos")}/>
            </div>
          }
       
        <div>
        <HomeSwiper user={userData.role} count={redVideos} type={"Red Flag Videos"}  handlepath={() => handlepath("Red flag Videos")}/>
        </div>

        <div>
        <HomeSwiper user={userData.role} count={greenVideos} type={"Green Flag Videos"}  handlepath={() => handlepath("Green flag Videos")}/>
        </div>
        </div>
        
       
      
     </div>

     </div>

  );
}

export default Home;
