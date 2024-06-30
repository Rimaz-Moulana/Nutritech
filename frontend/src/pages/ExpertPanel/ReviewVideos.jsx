import axios from 'axios';
import { Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Annotations from '../../components/AnnotationTable/RowHistory';
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';
import RulePopup from '../../components/Popup/RulePopup';

function ReviewVideos() {
  // const navigate= useNavigate();
  const {videoId} = useParams(); 
  let [isEnlarge, setEnlarge] = useState(true);
  const [videoData, setVideoData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const email  = localStorage.getItem('email');
  const [userData, setUserData] = useState([]);
  const [rules, setRules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
          const response = await axios.get(`${API}/api/users/getUser/${email}`);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);

  console.log(videoId)

  const [RuleData, setRuleData] = useState([]);
  const handlePoductDetails = (size,product,brand,unit) =>{
    navigate(`/product/view/${size}/${product}/${brand}/${unit}`)
  }
  

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response=await axios.get(`${API}/api/rules/rules`);
        const data= response.data;
        setRules(data);
      }catch(error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[])
useEffect(() => {
  const fetchReviewDetails = async () => {
    try {
      const response = await axios.get(`${API}/api/videos/annotation/${videoId}`);
      console.log(response.data[0]);
      setVideoData(response.data[0]);
    } catch (error) {
      console.error('Error fetching ReviewDetails:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchReviewDetails();
}, [videoId]);


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

 
const openPopup = () => {
  setIsPopupOpen(true);
};

const closePopup = () => {
  setIsPopupOpen(false);
};
 

  return (
    <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
    <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
      <Sidebar type="expert" onValueChange={handleValueChange}/>
    </div>
    <div className={`w-full z-10 mb-10 min-w-screen center-l md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
      
      <Navbar type='expert' />
      
      <div className='w-full justify-between z-9999 mt-24'>
        <VideowithReview Id={videoId} text="expert"/>
      </div>
      <div>
    <button onClick={openPopup} className='mt-4 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2'>View Rules</button>
   </div>
      <div className='mt-12 ml-24'>
        <Annotations videoId={videoId} usertype={"expert"}/>  
      </div>

      

   {isPopupOpen && (
        <RulePopup rules={rules} onClose={closePopup} />
      )}
<div>
<div className='flex justify-center gap-[10%]'>
  <div className='w-1/2 justify-center '>
    {(userData.role ==="expert head" && videoData && videoData.reannotations && videoData.reannotations.length < 1 && videoData.finalcomment && videoData.finalcomment.length<1) && (
      <button
      className="text-white bg-gradient-to-t justify-center from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center mt-4 lg:px-8 py-2.5 sm:px-2 "
        onClick={() => handleMessage(videoId)}
    >Send a message to annotator for annotating again</button>
    )}
{videoData.message && videoData.message.length>0 &&
<div className='p-2'>
  <p className="text-sidebarGreen text-xl"><strong>Your message for annotator</strong></p>
  {videoData.message?.map((msg, index) => (
    <p key={index}>{msg.text}</p>
  ))}
</div>
}
{openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Comments</h3>
                  <div className="mt-2">
                    <Comments videoId={videoId} type={"message"} section={"message"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={() => setOpenModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-buttonGreen text-base font-medium text-white hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGreen sm:ml-3 sm:w-auto sm:text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      
        // <Message videoId={videoId} onClose={closePopup}/>
        )}
      </div>
</div>
<div className='m-12'>
<ViewComment videoId={videoId} type={"comment"}/>
</div>
        

<div className=' w-full flex gap-4  justify-center'>
  {userData.role==="expert head" && videoData.message && videoData.message.length<1 || (userData.role==="expert head" && videoData.reannotations && videoData.reannotations.length>0) &&
          <div className='mt-12 w-full'>
            <h1>Add your comment(This is important to display your decision)</h1>
          <Comments videoId={videoId} type={"comment"}/>
          </div>
}       
          <div className="mt-8 mr-16 p-4  bg-gray-200 rounded h-fit border-gray-800" >
          
      <h1 className='text-xl font-bold mb-4 w-full text-sidebarGreen '>Decision for Video</h1>
      <div className='mt-8 h-full'>
      <VideowithReview Id={videoId} text="expert" type="videoDecision" showButtons={userData.role !== "expert head"} />
  
      </div>
       </div>
</div>

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
       
    </div>
  </div>
  
  );
}

export default ReviewVideos;
