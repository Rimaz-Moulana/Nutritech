import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player';
import red from '../assets/Images/redflag.png'
import green from '../assets/Images/greenflag.png'
import VideowithReview from './SensorManager/VideowithReview';


function Decision({Id, text, type}) {
    const videoId = Id;
    const [Data, setData] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showButtons, setShowButtons]=useState(false);
  const email  = localStorage.getItem('email');

 
  
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
       try {
          const response = await axios.get(`http://localhost:3000/api/users/getUser/${email}`);
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
       }
    };
  
    fetchUser();
}, []);

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

const handleStatus = () => {
 
  setShowButtons(true);
  

};

const renderDecision = () => {
  // console.log("hello");
  let statusvalue = '';
  if (Data.panelstatus && Data.panelstatus.length > 0) {
    console.log("hello");
    
    for (let i = 0; i < Data.panelstatus.length; i++) {
      if (Data.panelstatus[i].email === email) {
        statusvalue = Data.panelstatus[i].status;
      }
    }
  }
    
    return (
      <div className=''>
        
        <h1 className='text-xl mb-8'>Your Decision : {statusvalue}</h1>
    {statusvalue === "red" ? (
      <div>
        <img src={red} className="h-8 w-8 ml-4" alt="Red status" />
      </div>
    ) : (
      <div>
        <img src={green} className="h-8 w-8 ml-4" alt="Green status" />
      </div>
    )}
      
      </div>

    ) 
}

  return (
    <div className="flex h-fit justify-center gap-6 text-xl  p-4  mb-12">
      
      {userData.role === "expert head" && (
  <>
    <h1>{Data.status}</h1>
    {Data.status === "Red" ? (
      <div>
        <img src={red} className="h-8 w-8 ml-4" alt="Red status" />
      </div>
    ) : (
      <div>
        <img src={green} className="h-8 w-8 ml-4" alt="Green status" />
      </div>
    )}
  </>
)}

 
        {userData.role !== "expert head" && (
          // <h1>hello</h1>
          <>
        <div>
          
          {renderDecision()}
          
        </div>
          
          {!showButtons && (
  <button
  className="z-10 mt-8 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  onClick={handleStatus}
>
  Change Decision
</button>
)}
          </>

          
      

        )}


        {showButtons && (
          <VideowithReview Id={videoId} type={"videoDecision"} text={"expert"} showButtons={true}/>
        )}
  
  </div>
  )
}

export default Decision