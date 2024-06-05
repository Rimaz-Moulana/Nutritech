import axios from 'axios';
import { Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Annotations from '../../components/AnnotationTable/RowHistory';
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import MessagePopup from '../../components/Popup/MessagePopup';

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

  console.log(videoId)

  const [RuleData, setRuleData] = useState([]);

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response=await axios.get('http://localhost:3000/api/rules/rules');
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
      const response = await axios.get(`http://localhost:3000/api/videos/annotation/${videoId}`);
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
    <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
      
      <Navbar type='expert' />
      
      <div className=' justify-between z-9999 mt-24'>
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

<div className='flex justify-center gap-[10%]'>
  <div className='w-1/2 justify-center '>
    {(userData.role ==="expert head" && videoData && videoData.reannotations && videoData.reannotations.length < 1) && (
      <button
      className="text-white bg-gradient-to-t justify-center from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center mt-4 lg:px-8 py-2.5 sm:px-2 "
        onClick={() => handleMessage(videoId)}
    >Send a message to annotator for annotating again</button>
    )}
{openModal && (
        <div className="fixed border-2 inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-300">
        <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body className='p-0 shadow justify-center bg-backgroundGreen'>
              <div className="p-0 text-center">
                {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                <Comments videoId={videoId} type={"message"} section={"message"}/>
              </div>
            </Modal.Body>
          </Modal>
          </div>
        // <Message videoId={videoId} onClose={closePopup}/>
        )}

        <ViewComment videoId={videoId} type={"comment"}/>
          <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"comment"}/>
        </div>
    

      <div>
        
      </div>
      </div>
      <div className="mt-16 p-4 bg-gray-200 rounded h-fit border-gray-800" >
      <h1 className='text-2xl font-bold text-sidebarGreen'>Decision for Video</h1>
      <VideowithReview Id={videoId} text="expert" type="videoDecision" showButtons={userData.role !== "expert head"} />
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
