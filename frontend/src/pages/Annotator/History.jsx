import React, { useEffect, useState } from 'react';
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar';
import Navbar from '../../components/navbar/Navbar';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import RowHistory from '../../components/AnnotationTable/RowHistory';
import { useParams } from 'react-router-dom';
import Comments from '../../components/CommentSection/Comments';
import ViewComment from '../../components/CommentSection/ViewComment';
import axios from 'axios';

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
      <div className="w-2/8 fixed hidden sm:flex flex-col">
        <Annotatorsidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64 flex-grow"> {/* Make this div take up remaining vertical space */}
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
          <Videowithtext videoId={videoId}/>
        </div>
        <h1 className='ml-16 mb-8 mt-32 text-3xl lg:mr-[1000px] font-semibold text-sidebarGreen left-0'>
                  Annotations
                </h1>
        <div className='ml-16 sm:ml-20 mb-8 mt-10 text-sm font-semibold text-black'>
        
          {/* Pass videoId and video to RowHistory */}
          <RowHistory videoId={videoId} />
        </div>
      </div>
      <div className='mt-8 w-full'>
          <ViewComment videoId={videoId} type={"reply"}/>
        </div>

        {/* <div className='mt-8 w-full'>
          <Comments videoId={videoId} type={"reply"}/>
        </div> */}
      <div className="bottom-0 left-0 w-full px-4 py-4"> {/* Position cancel button at the bottom */}
        <button className="mb-12 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " onClick={() => window.history.back()}>Cancel</button>
      </div>
    </div>
  );
}

export default History;
