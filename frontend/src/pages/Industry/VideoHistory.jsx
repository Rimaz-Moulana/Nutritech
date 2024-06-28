import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RowHistory from '../../components/AnnotationTable/RowHistory';
import ViewComment from '../../components/CommentSection/ViewComment';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';

function History() {
  const { videoId } = useParams();
  const [data, setData] = useState([]);
  let [isEnlarge, setEnlarge] = useState(true);

  useEffect(() => {
    const fetchAnnotations = async () => {
      try {
        const response = await axios.get(`${API}/annotations/annotationhistory/${videoId}`);
        setData(response.data.annotations);
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

  return (
    <div className='bg-backgroundGreen h-full min-h-screen flex flex-col'> {/* Make the main container a flex column */}
      <div className="fixed hidden sm:flex flex-col">
        <Sidebar type="researcher" onValueChange={handleValueChange}/>
      </div>
      <div className={`w-full z-10 mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
        <Navbar type='researcher' />
        <div className='w-full mt-28'>
        <VideowithReview Id={videoId} text={"video"} type={"industry"}/>
        </div>
        <h1 className='px-3 mb-8 mt-12 text-3xl font-semibold text-sidebarGreen '>
                  Annotations
                </h1>
        <div className='ml-24 mr-8 mb-8 mt-10 text-sm font-semibold text-black center-l lg:w-[100%]'>
        
          {/* Pass videoId and video to RowHistory */}
          <RowHistory videoId={videoId} usertype={"industry"}/>
        </div>

        <div className='ml-24 px-3 center-l w-full pr-8'>
          <ViewComment videoId={videoId} type={"industry"}/>
        </div>

        {/* <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"reply"}/>
        </div> */}
      <div className=" flex items-end justify-center mt-4 z-10 h-full"> {/* Position cancel button at the bottom */}
        <button
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
