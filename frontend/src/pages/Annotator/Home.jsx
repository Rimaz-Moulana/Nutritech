import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeSwiper from '../../components/Annotator/HomeSwiper';
import Navbar from '../../components/navbar/Navbar';
import ProductTable from '../../components/tables/LogTable';
import Sidebar from '../../components/sidebar/SideBar';

function Home() {

  const navigate= useNavigate();
  const [videoData, setVideoData]= useState([]);
  const [annotatedVideoData, setAnnotatedVideoData]= useState([]);
  const [unannotatedVideoData, setUnannotatedVideoData]= useState([]);
  const [reannotateVideoData, setreannotateVideoData]=useState([]);
  let [isEnlarge, setEnlarge] = useState(true);
  

  const user = localStorage.getItem('email');
  console.log(user)

  const handleVideos = () =>{
    console.log('button clicked')
    navigate('/all')
  }
  const handleProducts = () =>{
    console.log('button clicked')
    navigate('/addedproduct');
  }

 
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
    }, 150000); // 60 seconds


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
      // const response = await axios.get('http://localhost:3000/api/product/getAll', config ); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
      // setProducts(response.data);
       // Schedule token expiration check
       
      }
      else{
        navigate('/');  //login path when token is expired
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
  
       const response = await fetch('http://localhost:3000/api/videos/all');
      const data = await response.json();
      setVideoData(data);
      
  }catch(error){
    console.error('Error fetching data:', error);
  }
  }
  fetchData();
}, []); 


useEffect(() => {
  // Fetch data from your backend API
  const fetchData = async () => {
    // try {
      // Allvideos.jsx
      const response = await fetch('http://localhost:3000/api/videos/annotated-videos');
      const data = await response.json();
      setAnnotatedVideoData(data);

  };

  fetchData();
}, []);

useEffect(() => {
  const fetchUnannotatedVideos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/videos/unannotated-videos');
      if (!response.ok) {
        throw new Error(`Failed to fetch unannotated videos. Status: ${response.status}`);
      }
      const data = await response.json();
      setUnannotatedVideoData(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUnannotatedVideos();
}, []);


useEffect(() => {
  // Fetch data from your backend API
  const fetchData = async () => {
    // try {
      // Allvideos.jsx
      const response = await fetch('http://localhost:3000/api/videos/reannotate-videos');
      const data = await response.json();
      setreannotateVideoData(data);

  };

  fetchData();
}, []);

const allvideos = videoData.length;
const annotatedvideos=annotatedVideoData.length;
const unannotatedvideos =unannotatedVideoData.length;
const reannotatedvideos= reannotateVideoData.length;
// const navigate = useNavigate();


  const handlepath = (type) =>{
    console.log(type);
    if(type=="All Videos"){
      navigate('/all');
    }else if(type=="Annotated Videos"){
      navigate('/annotated-videos');
    }else if(type=="Unannotated Videos"){
      navigate('/unannotated-videos');
    }else if(type=="Videos for Reannotation"){
      navigate('/reannotatevideos');
    }
  }

  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };

 

  return (
    <div  className={`bg-backgroundGreen w-full lg:overflow-x-hidden min-w-screen flex min-h-screen sm:text-sm `}>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="annotator" onValueChange={handleValueChange} />
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <div className=''>
        <Navbar type='annotator' />
        </div>
        <div className='lg:pr-8 lg:pt-8 flex justify-center items-center h-full '>
          <div className='flex flex-col items-center'>
        <div className="mt-12 grid grid-cols-2 gap-4 p-8">
        <div>
        <HomeSwiper count={allvideos} type={"All Videos"} handlepath={() => handlepath("All Videos")} />
        </div>
        <div>
          <HomeSwiper count={annotatedvideos} type={"Annotated Videos"} handlepath={()=>handlepath("Annotated Videos")} />
        </div>
        <div>
          <HomeSwiper count={unannotatedvideos} type={"Unannotated Videos"} handlepath={()=>handlepath("Unannotated Videos")} />
        </div>
        <div>
          <HomeSwiper count={reannotatedvideos} type={"Videos for Reannotation"} handlepath={()=>handlepath("Videos for Reannotation")} />
        </div>
      </div>
        
        </div> 
        </div>
        </div>
      
        {/* <div className='flex mt-8 justify-between'>
        <h1 className='ml-8 mb-4 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Products</h1>
        <button className="text-white mt-4 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleProducts}>All Products</button> 
        </div> */}
        
       
        
      </div>
      
      
      
   

  );
}

export default Home;
