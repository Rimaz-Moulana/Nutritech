import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import RowHistory from '../../components/AnnotationTable/RowHistory';
import { useParams } from 'react-router-dom';
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';
import axios from 'axios';
import Sidebar from '../../components/sidebar/SideBar';

function History() {
  const { videoId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnnotations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/annotations/annotationhistory/${videoId}`);
        setData(response.data.annotations);
      } catch (error) {
        console.error('Error fetching annotations:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchAnnotations();
  }, [videoId]);

  console.log(data)

  return (
    <div className='bg-backgroundGreen h-full min-h-screen flex flex-col'> {/* Make the main container a flex column */}
      <div className="fixed hidden sm:flex flex-col">
        <Sidebar type="industry" />
      </div>
      <div className="w-full lg:w-[75%] ml-0 sm:ml-64 flex-grow"> {/* Make this div take up remaining vertical space */}
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
        <VideowithReview Id={videoId} text={"video"} type={"industry"}/>
        </div>
        <h1 className='px-3 mb-8 mt-12 text-3xl font-semibold text-sidebarGreen text-left'>
                  Annotations
                </h1>
        <div className='px-3 mb-8 mt-10 text-sm font-semibold text-black center-l lg:w-[100%]'>
        
          {/* Pass videoId and video to RowHistory */}
          <RowHistory videoId={videoId} usertype={"industry"}/>
        </div>

        <div className='px-3 center-l w-full'>
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
