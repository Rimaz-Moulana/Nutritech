import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Annotations from '../../components/AnnotationTable/RowHistory';
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button, Modal } from 'flowbite-react';
import Message from '../../components/Popup/Message';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewVideos() {
  // const navigate= useNavigate();
  const {videoId} = useParams(); 
  let [isEnlarge, setEnlarge] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(videoId)

//   const [RuleData, setRuleData] = useState([]);

useEffect(() => {
  const fetchReviewDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/videos/brandproducts/${videoId}`);
      setResponseData(response.data);
      console.log(response.data);
      //let result = JSON.parse(res);
      //let firstKeyValues = result.map(obj => obj[Object.keys(obj)[0]]);
      console.log("hi"+response.data[0].brand+responseData[0])
      setVideoData(response.data.video);
    } catch (error) {
      console.error('Error fetching ReviewDetails:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchReviewDetails();
}, [videoId]);

    const handlePoductDetails = (size,product,brand,unit) =>{
      navigate(`/product/view/${size}/${product}/${brand}/${unit}`)
    }
 
  //console.log(videoData)
  console.log("hir"+responseData)
const handleValueChange = (value) => {
  console.log(value)
  if(value==true){
    setEnlarge(true);
  }else{
    setEnlarge(false);
  }
};

const [openModal, setOpenModal] = useState(false);
const handleMessage = () => {
  setOpenModal(true); // Set openModal state to true to display the modal
};
 
  // console.log(videoData.reannotations.length);
  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
    <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert" onValueChange={handleValueChange}/>
    </div>
    <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
      
      <Navbar type='expert' />
      
      <div className='flex justify-between z-9999 mt-24'>
        <VideowithReview Id={videoId} text="expert"/>
      </div>
      <div className='mt-12 ml-24'>
        <Annotations videoId={videoId} usertype={"expert"}/>  


      </div>

<div>
{openModal && (
        <div className="fixed border-2 inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-300">
        <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body className='p-0 shadow justify-center'>
              <div className="p-0 text-center">
                {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                <Comments videoId={videoId} type={"message"} section={"message"}/>
              </div>
            </Modal.Body>
          </Modal>
          </div>
        )}

<ViewComment videoId={videoId} type={"comment"}/>
          <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"comment"}/>
        </div>
  
      <div className=" flex items-end justify-center mt-4 z-10 h-full"> {/* Position cancel button at the bottom */}
      <button onClick={() => handlePoductDetails(responseData[0].size,responseData[0].product,responseData[0].brand,responseData[0].unit)}
                  className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                  >
                  View Product Details
                 </button>
  
        <button 
          className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </div>   

      <div>
        
      </div>

</div>
   
       
    </div>
  </div>
  
  );
}

export default ReviewVideos;
