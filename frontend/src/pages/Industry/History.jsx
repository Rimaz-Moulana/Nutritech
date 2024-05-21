import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { all } from 'axios';
import VideoContainer from '../../components/videoContainer/VideoContainer';
import Sidebar from '../../components/sidebar/SideBar';

function History() {
    const navigate= useNavigate();
    const [videoData, setVideoData] = useState([]);
    let status; 
    let [isEnlarge, setEnlarge] = useState(true);
    const [isChecked, setIsChecked] = useState(() => {
        // Retrieve the checkbox state from localStorage, defaulting to false if not found
        return JSON.parse(localStorage.getItem('isChecked')) || false;
      });
    
      const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
    
        localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
      }

    const handleupload = () =>{
        navigate('/uploadvideo')
    }

    const [videoFilter, setVideoFilter] = useState(() => {
        // Retrieve from localStorage, default to 'all' if not found
        return localStorage.getItem('videoFilter') || 'All';
      });

      

      if (videoFilter === "All") {
        status = "all";
      }else if (videoFilter === "Pending") {
        status= "pending"
      } else if (videoFilter === "Checked") {
        status = "unannotated";
      } else if (videoFilter === "Annotated") {
        status = "annotated";
      } else if (videoFilter === "Verified") {
        status = "green";
      } else if (videoFilter === "Red Flaged") {
        status = "red";
      }
      
      // Now you can use the 'status' variable outside the if-else blocks
      
    
      useEffect(() => {
        const fetchData = async () => {
           const response = await fetch('http://localhost:3000/api/videos/allUploadedVideos');
           const data = await response.json();
          setVideoData(data);
        };
      
        fetchData();
      }, []); 

      const handleFilterChange = (e) => {
        const newFilterValue = e.target.value;
        setVideoFilter(newFilterValue);
        localStorage.setItem('videoFilter', newFilterValue);
      };
    

      const filteredVideos = videoData?.filter((video) => {
        const statusMatch = status === 'all' || video.status === status;
        
        return statusMatch;
        
      
      });

      
  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };

    return (
      <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
        <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="industry" onValueChange={handleValueChange}/>
        </div>
        <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
          <div className='p-1'>
          <Navbar type='industry' />
          </div>
          <div className='flex justify-between z-9999 mt-8'>
          <h1 className='ml-8 mb-8 mt-24 h-4 text-3xl font-semibold text-sidebarGreen left-0'>
             Videos
          </h1>
          <button className="mt-24 text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
           onClick={handleupload}>Upload a video</button>
          </div>    
          <div className='mt-8 ml-8 mr-8 h-12 w-[95%] bg-white rounded'>
            <div className='flex justify-between'>
                <h1 className='ml-8 text-lg p-2'>{videoFilter} Videos</h1>
                
            <label className='themeSwitcherTwo shadow-card mt-1 relative h-10  inline-flex  cursor-pointer select-none rounded-md bg-white '>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
        
          List View
        </span>
        <span
          className={`flex space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
          }`}
        >
          Grid View
        </span>
      </label>
            <select className='bg-filterGreen items-end mr-2 mt-2 mb-2 rounded px-1 py-1'
                value={videoFilter}
                onChange={handleFilterChange}
                // onChange={(e) => setVideoFilter(e.target.value)}
              >
                <option value='All'>All Videos</option>
                <option value='Pending'>Pending Videos</option>
                <option value='Checked'>Checked Videos</option>
                <option value='Annotated'>Annotated Videos</option>
                <option value='Verified'>Verified Videos</option>
                <option value='Red Flaged'>Red Flaged Videos</option>
            </select>


            </div>
          </div>
          <VideoContainer type={"industry"} videoData={filteredVideos} viewType={isChecked ? 'Grid' : 'List'} videotype={status}/>
        </div>
      </div>
    );
}

export default History
