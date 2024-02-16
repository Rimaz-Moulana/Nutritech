import React, { useEffect, useState } from 'react'
import video from '../../assets/videos/astra.mp4'
import axios from 'axios';
import Swal from 'sweetalert2';
import Popup from './Popup';
import ReactPlayer from 'react-player';

function VideowithReview({videoId}) {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

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

  const handlesave= async (e) => {
    e.preventDefault();
    console.log(videoId)
    try {
      const response = await axios.post(`http://localhost:3000/api/videos/reviewvideo/${videoId}`, {
        status: 'unannotated'
      });
      Swal.fire({
        icon: 'success',
        title: 'Video saved successfully!',
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
      window.history.back();
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

  const handleDelete= async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/videos/reviewvideo/${videoId}`, {

      });
      Swal.fire({
        icon: 'success',
        title: 'Video was Declined successfully!',
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });

      window.history.back();

    } catch (error) {
      console.error('Error declined video:', error);
    }
  };

  const handleurl = (inputurl) => {
    if (loading) {
      console.log('Video data is still loading');
      return null;
    } else {
      const url = inputurl.replace(/\\/g, '/');
      const desiredPart = url.split('/').pop();
      const videourl = `/videos/${desiredPart}`;
      console.log('Video URL:', videourl);
      return videourl;
    }
  };
  
  return (
    <div className='lg:flex justify-right ml-8'>
         <div className='w-1/2 h-1/12 mt-24'>
         <div>
        <ReactPlayer
                className='react-player fixed-bottom'
                url={handleurl(videoData.videoPath)}
                width='100%'
                height='100%'
                controls={true}
            />

        </div>
        </div> 
      
        <form className="w-full mt-32 max-w-sm lg:ml-36">
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4">
        Brand Name
      </label>
    </div>
    <div className="md:w-2/3">
      <div className="shadow font-semibold text-center bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{videoData.brand}</div>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4">
        Product
      </label>
    </div>
    <div className="md:w-2/3">
      <div className="shadow font-semibold text-center bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{videoData.product}</div> 
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4">
        Variation
      </label>
    </div>
    <div className="md:w-2/3">
      <div className="shadow bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-black font-semibold text-center leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{videoData.variation}</div>
    </div>
  </div>
  <div className="flex items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="text-white  bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button"
      onClick={handleOpen} >
        Decline
      </button>
    </div>
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button"
      onClick={handlesave}
      disabled={loading}>
        Save
      </button>
    </div>
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button"
       onClick={() => window.history.back()}>
        Cancel
      </button>
    </div>
  </div>
</form>
<Popup text1={"decline"} text2={"video"} button={"Decline"} openModal={openModal} setOpenModal={setOpenModal} onDelete={handleDelete}/>

    </div>
  )
}

export default VideowithReview
