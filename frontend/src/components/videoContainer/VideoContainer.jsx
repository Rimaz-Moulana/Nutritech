import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import astra from '../../../src/assets/videos/astra.mp4';
import pen from '../../../src/assets/Images/pen.png';
import history from '../../../src/assets/Images/history.png';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import review from '../../../src/assets/Images/review.png'

function VideoContainer({ type,videoData,viewType }) {
  console.log(videoData)
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [productFilter, setProductFilter] = useState('all');

  const handleAnnotate = (videoId) => {
    navigate(`/annotation/${videoId}`);
  };

  const ViewAnnotate = (videoId) => {
    navigate(`/annotationhistory/${videoId}`)
  };

  const handleReview = () => {
    navigate('/reviewvideos');
  };

  const filteredVideos = videoData.filter((video) => {
    const productMatch =
      productFilter === 'all' || video.product === productFilter;
    const dateMatch =
      !startDate || new Date(video.date) >= startDate;

      return productMatch && dateMatch;
  });
  return (
    <div className='w-full ml-12'> 
    {viewType=== 'Grid' &&(
      <div className='mt-12 right-0'>
      <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All</option>
                <option value='Biscuits'>Biscuits</option>
                <option value='Dairy'>Dairy</option>
                <option value='Margarine'>Margarine</option>
                <option value='Noodles'>Noodles</option>
                <option value='Soft drinks'>Soft Drinks</option>
                <option value='Bakery items'>Bakery Items</option>
                <option value='Confectionary'>Confectionary</option>
                <option value='Other'>Other</option>
              </select>
    <div className="grid h-full h-min-screen grid-cols-2 md:grid-cols-4 gap-6 ml-12 mt-8 mr-5 mb-8 bg-backgroundGreen">
      {filteredVideos.map((video, index) => (
        <div key={index} className='relative'>
          <div className=''>
            <video className="h-auto max-w-full rounded-lg" controls>
              <source src={astra} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className='border-2 mt-2 border-gray-300 text-left'>
              <p className='font-semibold'>Status: {video.status}</p>
              <p>Product: {video.product}</p>
              <p>Uploaded Date: {video.date}</p>
              <p>Uploaded Time: {video.time}</p>
              <p>Uploader: {video.uploader}</p>
              
           {type==='annotated' &&(
            <>
              <p>Annotated Date: {video.annotateddate}</p>
              <p>Annotated Time: {video.annotatedtime}</p>
              </>
            )}
            </div>
          </div>

          {type === 'unannotated' && (
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img
                src={pen}
                alt="Annotate"
                onClick={() => handleAnnotate(video._id)} // Pass video ID to handleAnnotate
              />
            </div>
          )}

          {type === 'annotated' && (
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={history} alt="Annotate" onClick={() => ViewAnnotate(video._id)}/>
            </div>
          )}

          
{type === 'pending' && (
            <div className="h-24 w-8 icon-overlay absolute top-0 right-0 cursor-pointer ">
              <img src={review} alt="Review" onClick={handleReview} />
            </div>
          )}

        </div>
      ))}
      </div>
      </div>
  )}

 {viewType==="List" && (
   <div className='h-full h-min-screen mt-12'>
   <table className='w-full'>
     {/* Table headers with filter dropdown for 'Status' and date picker for 'Uploaded Date' */}
     <thead>
       <tr className='mt-12'>
         <th className=''> Product{' '}
              <select
              className='text-center w-24 bg-darkGreen'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All</option>
                <option value='Biscuits'>Biscuits</option>
                <option value='Dairy'>Dairy</option>
                <option value='Margarine'>Margarine</option>
                <option value='Noodles'>Noodles</option>
                <option value='Soft Drinks'>Soft Drinks</option>
                <option value='Bakery items'>Bakery Items</option>
                <option value='Confectionary'>Confectionary</option>
                <option value='Other'>Other</option>
              </select>
              </th>
         <th>
           Status
         </th>
         <th className='text-center mt-12'>
           Uploaded Date{' '}
           <DatePicker
           className='bg-darkGreen w-28 text-sm'
             selected={startDate}
             onChange={(date) => setStartDate(date)}
             isClearable
             dateFormat='dd/mm/yyyy'
           />
         </th>
         <th className='mt-12'>Uploaded Time</th>
         <th className='mt-12'>Uploader</th>
         {type === 'annotated' && (
           <>
             <th>Annotated Date</th>
             <th>Annotated Time</th>
           </>
         )}
         <th className='mt-12'>Actions</th>
       </tr>
     </thead>
     <tbody className='mt-8'>
       {filteredVideos.map((video, index) => (
         <tr key={index} className='border-b-1'>
           <td>{video.product}</td>
           <td>{video.status}</td>
           <td>{video.date}</td>
           <td>{video.time}</td>
           <td>{video.uploader}</td>
           {type === 'annotated' && (
             <>
               <td>{video.annotateddate}</td>
               <td>{video.annotatedtime}</td>
             </>
           )}

           <td>
             {video.status === 'unannotated' && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-11 py-2.5 text-center me-2 mb-2 "
                 onClick={() => handleAnnotate(video._id)}
               >Annotate</button>
             )}
             {video.status === 'annotated' && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => ViewAnnotate(video._id)}
             >View History</button>
             )}

             {video.status === 'pending' && (
             <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-12 py-2.5 "
                 onClick={() => handleReview(video._id)}
             >Review</button>
          )}
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>

)}
</div>
)
 }

export default VideoContainer;
