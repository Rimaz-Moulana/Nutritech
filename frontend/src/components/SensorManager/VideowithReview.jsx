import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player';
import red from '../../assets/Images/redflag.png'
import green from '../../assets/Images/greenflag.png'

function VideowithReview({Id,text,type}) {
 const videoId = Id;
 const productId =Id;
 
 const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greenFlagDisabled, setGreenFlagDisabled] = useState(false);
  const [redFlagDisabled, setRedFlagDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleOpen = (text) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5a7d59",
      confirmButtonText: "Yes",
      iconColor: "#294B29",
      customClass: {
        popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        cancelButton: 'bg-gradient-to-t from-buttonGreen to-darkGreen',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(text)
        setButtonDisabled(true);
        if(text==="expert"){
          if (Data.status==="red") {
            handleApprove(text);
          }else{
            handleDelete(text);
          }         
        }else{
          handleDelete(text);
        Swal.fire({
          showConfirmButton: false,
          text: text === "expert" ? "Done" : `${text} has been deleted.`,
          timer: 2000,
          icon: "success",
          iconColor: '#294B29',
          customClass: {
            popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
          },
        })
        // .then(() => {
          // Check if buttons are disabled, and if yes, navigate to the previous page
          if (buttonDisabled) {
            localStorage.removeItem('savedButtonDisabled')
            // window.history.back();
          }
        // });
        }
        
      }
      
    });
  };

if (text==="video"|| text==="expert" || text==='experthistory')  {
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
    // e.preventDefault();
    console.log(videoId)
    try {
      if(text==="expert" ){
        console.log(text)
        await axios.post(`http://localhost:3000/api/videos/greenflag/${videoId}`);
      }   
      else if (text === "video") {
       await axios.post(`http://localhost:3000/api/videos/reviewvideo/${videoId}`, {
        status: 'unannotated'
      });
    }else{
      await axios.post(`http://localhost:3000/api/product/reviewproduct/${productId}`, {
        status: 'reviewed'
      });
    }
      Swal.fire({
        icon: 'success',
        title: `${text} saved successfully!`,
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
      if (text !== "expert") {
        window.history.back();
      }
      
    } catch (error) {
      console.error(`Error saving ${text}:`, error);
    }
  };

  const handleApprove= async(text)=>{
    await axios.post(`http://localhost:3000/api/videos/greenflag/${videoId}`);

    Swal.fire({
      icon: 'success',
      title: `Done`,
      showConfirmButton: false,
      timer: 2000, 
      customClass: {
        popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
      },
      iconColor: '#294B29',
    });
    if (text !== "expert") {
      window.history.back();
    }


  }

  const handleDelete = async (text) => {
    try {

      if(text==="expert"){
        await axios.post(`http://localhost:3000/api/videos/redflag/${videoId}`);
      }else if (text === "video") {
        await axios.delete(`http://localhost:3000/api/videos/reviewvideo/${videoId}`);
      } else {
        await axios.delete(`http://localhost:3000/api/product/reviewproduct/${productId}`);
      }
  
      if (text !== "expert") {
        window.history.back();
      }
    } catch (error) {
      console.error(`Error declining ${text}:`, error);
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
 console.log(Data)
  return (
    <div>
    <div className='lg:flex justify-right ml-24'>
         <div className='w-full h-full mt-12'>
         <div>
            {(text === "video" || text==="expert" || text==="experthistory") && (
              <ReactPlayer
                className='react-player fixed-bottom'
                url={handleurl(Data.videoPath)}
                width='100%'
                height='100%'
                controls={true}
              />
            )}
            {/* : (
              <img
                // src={handleUrl(Data.frontimage)}  // Replace with your image path handling logic
                alt="Image"
                className="w-full h-auto"
              />
            ) */}
        </div>

        </div> 
      
        <form className="w-full mt-24 max-w-sm lg:ml-36">
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
      {(text==="video" || text==="expert" || text==='experthistory') && (
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

  {text!=='experthistory' && (
  <div className="flex items-center gap-2">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
     
    <button
  className={`text-white flex ${
    buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"
  } focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-12 py-2.5 text-center me-2 mb-2`}
  type="button"
  onClick={() => { buttonDisabled ? null : handleOpen(text) }}
>
{text === "expert" && (
    <div className="flex items-center w-full">
      Red Flag
      <img src={red} className="h-4 w-4 ml-4" alt="" />
    </div>
  )}
  {text !== "expert" && (
    "Decline"
  )}
</button>

      
      
    </div>
    <div className="md:w-1/3"></div>
    <div className="w-full md:w-2/3">
    <button
  className={`text-white flex ${
    buttonDisabled ? "bg-gray-500" : "bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br"
  } focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-12 py-2.5 text-center me-2 mb-2`}
  type="button"
  onClick={() => (text === "expert" ? (buttonDisabled ? null : handleOpen(text)) : handlesave())}
  disabled={loading}
>
  {text === "expert" && (
    <div className="flex items-center w-full">
      Green Flag
      <img src={green} className="h-4 w-4 ml-4" alt="" />
    </div>
  )}
  {text !== "expert" && (
    "Save"
  )}
</button>


    </div>
    
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
    {text !== "expert" && (
      <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button"
       onClick={() => window.history.back()}>
        Cancel
      </button>
    )}
    </div>
  </div>
  )}
</form>


    </div>
    <div>
      
    </div>
  </div>
  )
}

export default VideowithReview