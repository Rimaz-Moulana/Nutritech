import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RowHistory from '../../components/AnnotationTable/RowHistory';
import ViewComment from '../../components/CommentSection/ViewComment';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';

function History() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [data, setData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);

  let {user}=useParams();

  if(user==="annotated"){
    user="annotator"
  }else if(user==="industry"){
    user="researcher"
  }

  useEffect(() => {
    const fetchAnnotations = async () => {
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
        const response = await axios.get(`${API}/annotations/annotationhistory/${videoId}`, config);
        setData(response.data.annotations);

      }else{
        navigate('/');
      }
      } catch (error) {
        console.error('Error fetching annotations:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchAnnotations();
  }, [videoId]);

  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };

  const handleViewDetails = (size,product,brand,unit) => {
    navigate(`/product/view/${size}/${product}/${brand}/${unit}`)
  }

  return (
    <div className='bg-backgroundGreen w-full lg:overflow-x-hidden min-w-screen flex min-h-screen sm:text-sm'> {/* Make the main container a flex column */}
      <div className="fixed hidden sm:flex flex-col">
        <Sidebar type={user} onValueChange={handleValueChange}  />
      </div>
      <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}> {/* Make this div take up remaining vertical space */}
        <Navbar type='user' />
        <div className='max-w-screen mt-20'>
        <VideowithReview Id={videoId} text={"video"} type={"annotator"}/>
        </div>
       



        <h1 className='ml-12 justify-center px-3 mb-8 mt-12 text-2xl font-semibold text-sidebarGreen'>
                  Annotations
                </h1>
        <div className='justify-center ml-12 pr-8  text-sm font-semibold text-black center-l lg:w-[100%]'>
        
          {/* Pass videoId and video to RowHistory */}
          <RowHistory videoId={videoId} usertype={user}/>
        </div>

        <div className='ml-12 mr-8 px-3 pr-8 justify-center w-[95%]'>
          <ViewComment videoId={videoId} type={"annotator"}/>
        </div>

        {/* <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"reply"}/>
        </div> */}
      <div className=" flex items-end justify-center mt-4 z-10 h-full"> {/* Position cancel button at the bottom */}
        <button onClick={()=>handleViewDetails(data[0].size,data[0].product,data[0].brand,data[0].unit)}
                  className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                  >
                  View Product Details
                </button>

                <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 onClick={() => window.history.back()}>
                  Cancel
                </button>
      </div>
      </div>
      </div>
  );
}

export default History;
