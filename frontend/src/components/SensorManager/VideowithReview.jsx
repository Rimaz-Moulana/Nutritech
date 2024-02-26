import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player';

function VideowithReview({Id,text}) {
 const videoId = Id;
 const productId =Id;
 
 const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5a7d59",
      confirmButtonText: "Yes, decline it!",
      iconColor: "#294B29",
      customClass: {
        popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        cancelButton: 'bg-gradient-to-t from-buttonGreen to-darkGreen',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
        Swal.fire({
          // title: "Deleted!",
          showConfirmButton: false,
          text: "Video has been deleted.",
          timer: 2000,
          icon: "success",
          iconColor: '#294B29',
          customClass: {
            popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
          },
        });
      }
    });
  };

if (text==="video") {
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
        setData(response.data.video);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [videoId]);
}else{
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/reviewproduct/${productId}`);
        setData(response.data.product);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [productId]);
}
 

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

  const handleDelete = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/videos/reviewvideo/${videoId}`, {
      });
  
      window.history.back();
  
    } catch (error) {
      console.error('Error declining video:', error);
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
            {text === "video" && (
              <ReactPlayer
                className='react-player fixed-bottom'
                url={handleurl(Data.videoPath)}
                width='100%'
                height='100%'
                controls={true}
              />
            )}: (
              <img
                // src={handleUrl(Data.frontimage)}  // Replace with your image path handling logic
                alt="Image"
                className="w-full h-auto"
              />
            )
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
      <div className="shadow font-semibold text-center bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{Data.brand}</div>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4">
        Product
      </label>
    </div>
    <div className="md:w-2/3">
      {text==="video" && (
        <div className="shadow font-semibold text-center bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{Data.product}</div> 
      )}
      {text==="product" && (
        <div className="shadow font-semibold text-center bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{Data.productName}</div> 
      )}
      </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4">
        Variation
      </label>
    </div>
    <div className="md:w-2/3">
      <div className="shadow bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-black font-semibold text-center leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" >{Data.variation}</div>
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
    </div>
  )
}

export default VideowithReview