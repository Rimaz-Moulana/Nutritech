import React from 'react';
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar';
import Navbar from '../../components/navbar/Navbar';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import RowHistory from '../../components/AnnotationTable/RowHistory';
import { useParams } from 'react-router-dom';

function History() {
  const { videoId } = useParams();

  return (
    <div className='bg-backgroundGreen h-full flex flex-col'> {/* Make the main container a flex column */}
      <div className="w-2/8 fixed hidden sm:flex flex-col">
        <Annotatorsidebar />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-64 flex-grow"> {/* Make this div take up remaining vertical space */}
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
          <Videowithtext />
        </div>
        <div className='ml-16 sm:ml-20 mb-8 mt-10 text-sm font-semibold text-black'>
          {/* Pass videoId and video to RowHistory */}
          <RowHistory videoId={videoId} />
        </div>
      </div>
      <div className="bottom-0 left-0 w-full px-4 py-4"> {/* Position cancel button at the bottom */}
        <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " onClick={() => window.history.back()}>Cancel</button>
      </div>
    </div>
  );
}

export default History;
