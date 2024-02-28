import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import history from '../../../src/assets/Images/history.png';
import pen from '../../../src/assets/Images/pen.png';
import review from '../../../src/assets/Images/review.png';
import ReactPlayer from 'react-player';
import blue from '../../assets/Images/blue.png'
import white from '../../assets/Images/white.png'
import yellow from '../../assets/Images/yellow.png'

function VideoContainer({ type,videoData,viewType,videotype }) {
  console.log(viewType)
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  // const [productFilter, setProductFilter] = useState('all');

  const [productFilter, setProductFilter] = useState(() => {
    // Retrieve from localStorage, default to 'all' if not found
    return localStorage.getItem('productFilter') || 'all';
  });

  useEffect(() => {
    // Update localStorage when productFilter changes
    localStorage.setItem('productFilter', productFilter);
  }, [productFilter]);


  const handleAnnotate = (videoId) => {
    navigate(`/annotation/${videoId}`);
  };

  const ViewAnnotate = (videoId) => {
    navigate(`/annotationhistory/${videoId}`)
  };

  const handleReview = (videoId) => {
    navigate(`/reviewvideo/${videoId}`);
  };

const handleVideo = (inputUrl) =>{
  const url = inputUrl.replace(/\\/g, '/');

// Split the URL based on backslash ("\")
  const urlParts = url.split('/');

// Take the last part of the array
  const desiredPart = urlParts[urlParts.length - 1];
// console.log(desiredPart)
return desiredPart;
}

const filteredVideos = videoData?.filter((video) => {
  if (type === "industry") {
    // If type is "industry", return all videos without filtering
    return true;
  }

  const productMatch = productFilter === 'all' || video.product === productFilter;
  const uploadedDateMatch = !startDate || new Date(video.createdIn).toLocaleDateString() === startDate.toLocaleDateString();
  const annotatedDateMatch = !startDate || (video.annotateddate && new Date(video.annotateddate).toLocaleDateString() === startDate.toLocaleDateString());

  if (type === "annotator") {
    return productMatch && annotatedDateMatch;
  } else {
    return productMatch && uploadedDateMatch;
  }
});



  return (
    <div className='w-full ml-12'> 
    {viewType=== 'Grid'  &&(
      <div className=' right-0'>
        <div className=' items-end'>
      {type !== "industry" && (
        <>
            <select className='bg-white p-1 items-end mt-2 mb-2 rounded'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All Products</option>
                <option value='Biscuits'>Biscuits</option>
                <option value='Dairy'>Dairy</option>
                <option value='Margarine'>Margarine</option>
                <option value='Noodles'>Noodles</option>
                <option value='Soft drinks'>Soft Drinks</option>
                <option value='Bakery items'>Bakery Items</option>
                <option value='Confectionary'>Confectionary</option>
                <option value='Other'>Other</option>
    </select>

           <DatePicker
           className='bg-white mt-2 ml-4 p-1 mb-2 rounded'
              placeholderText='Select Date'
             selected={startDate}
             onChange={(date) => setStartDate(date)}
             isClearable
             dateFormat='MM/dd/YYYY'
           />
           </>
      )}
    </div>
      
    <div className="grid h-full h-min-screen grid-cols-2 md:grid-cols-4 gap-6 ml-12 mt-8 mr-5 mb-8 bg-backgroundGreen">
      {filteredVideos.map((video, index) => (
        <div key={index} className='relative'>
          <div className=''>
            {console.log(`/videos${video.videoPath.replace(/\\/g, '/')}`)}

          {/* <video className="h-auto max-w-full rounded-lg" controls>
              <source src={`M:${video.videoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
          </video> */}

            <ReactPlayer
                className='react-player fixed-bottom'
                url={`/videos/${handleVideo(video.videoPath)}`}
                width='100%'
                height='100%'
                controls={true}
            />

            <div className='border-2 mt-2 border-gray-300 text-left'>
              <p className='font-semibold'>Status: {video.status}</p>
              <p>Product: {video.product}</p>
              <p>Uploaded Date: {video.createdIn}</p>
              <p>Uploaded Time: {video.createdAt}</p>
              <p>Uploader: {video.uploader}</p>
              
              {type === 'annotated' && !("industry" === type) && (
  <>
    <p>Annotated Date: {video.annotateddate}</p>
    <p>Annotated Time: {video.annotatedtime}</p>
  </>
)}

            </div>
          </div>

          {type === 'unannotated' && !("industry" === type) &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img
                src={pen}
                alt="Annotate"
                onClick={() => handleAnnotate(video._id)} // Pass video ID to handleAnnotate
              />
            </div>
          )}

        {((videotype === 'unannotated' && type==="industry") || (video.status ==="unannotated" && type==="industry")) &&(
            <div className="h-24 w-4 icon-overlay absolute top-0 mt-2 mr-1 right-0 cursor-pointer ">
              <img
              className="h-4 w-4"
                src={yellow}
                alt="Unannotated"
                // onClick={() => handleAnnotate(video._id)} // Pass video ID to handleAnnotate
              />
            </div>
          )}

          {type === 'annotated' && !("industry" === type) &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={history} alt="Annotated" onClick={() => ViewAnnotate(video._id)}/>
            </div>
          )}

        {((videotype === 'annotated' && type==="industry") || (video.status ==="annotated" && type==="industry") )&&(
            <div className="flex justify-between gap-8 h-12 w-60 icon-overlay absolute top-0 mt-2 mr-1 right-0  cursor-pointer ">
              <img className="h-8 w-8" src={history} alt="Annotate" onClick={() => ViewAnnotate(video._id)}/>
              <img className="h-4 w-4" src={blue} alt="Annotate"/>
              
            </div>
          )}

          
          {type === 'pending' && !("industry" === type) &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 right-0 cursor-pointer ">

              <img src={review} alt="Review" onClick={() => handleReview(video._id)} />
            </div>
          )}

        {((videotype === 'pending' && type === 'industry') || (video.status === 'pending' && type === 'industry')) && (
          <div className="h-8 w-4 mr-1 mt-2 icon-overlay absolute top-0 right-0 cursor-pointer ">
            <img 
              className="h-4 w-4"
              src={white} alt="pending" 
            />
          </div>
        )}


        </div>
      ))}
      </div>
      </div>
  )}

 {viewType==="List" && (
   <div className='h-full h-min-screen mt-4 text-black w-full min-w-screen'>
    <div className=' items-end'>
    {type !== "industry" && (
      <>
    <select className='bg-white p-1 items-end mt-2 mb-2 rounded'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All Products</option>
                <option value='Biscuits'>Biscuits</option>
                <option value='Dairy'>Dairy</option>
                <option value='Margarine'>Margarine</option>
                <option value='Noodles'>Noodles</option>
                <option value='Soft drinks'>Soft Drinks</option>
                <option value='Bakery items'>Bakery Items</option>
                <option value='Confectionary'>Confectionary</option>
                <option value='Other'>Other</option>
    </select>

           <DatePicker
           className='bg-white mt-2 ml-4 p-1 mb-2 rounded'
              placeholderText='Select Date'
             selected={startDate}
             onChange={(date) => setStartDate(date)}
             isClearable
             dateFormat='MM/dd/YYYY'
           />
           </>
    )}
    </div>
     
   <table className='w-full mt-8'>
     {/* Table headers with filter dropdown for 'Status' and date picker for 'Uploaded Date' */}
     <thead>
       <tr className='mt-12'>
        <th></th>
        <th>Brand {' '}</th>
         <th className=''> Product{' '}</th>
         <th>
           Status
         </th>
         <th className='text-center mt-12'>Uploaded Date</th>
         <th className='mt-12'>Uploaded Time</th>
         <th className='mt-12'>Uploader</th>
         {type === 'annotated' && (
           <>
             <th>Annotated Date</th>
             <th>Annotated Time</th>
           </>
         )}
         {type!=="reviewvideo" && (
         <th className='mt-12'>Actions</th>
         )} 
       </tr>
     </thead>
     <tbody className='mt-12 text-black'>
       {filteredVideos.map((video, index) => (
         <tr key={index} className='border-b-1'>
          <td className='w-40'>
          <ReactPlayer
                className='react-player fixed-bottom h-8 w-8 p-2'
                url={`/videos/${handleVideo(video.videoPath)}`}
                width='100%'
                height='100%'
                controls={true}
            />
          </td>
          <td>{video.brand}</td>
           <td>{video.product}</td>
           <td>{video.status}</td>
           <td>{video.createdIn}</td>
           <td>{video.createdAt}</td>
           <td>{video.uploader}</td>
           {type === 'annotated' && (
             <>
               <td>{video.annotateddate}</td>
               <td>{video.annotatedtime}</td>
             </>
           )}

           <td>
             {video.status === 'unannotated' && type!=="reviewvideo" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-11 py-2.5 text-center me-2 mb-2 "
                 onClick={() => handleAnnotate(video._id)}
               >Annotate</button>
             )}
             {video.status === 'annotated' && type!=="reviewvideo" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => ViewAnnotate(video._id)}
             >View History</button>
             )}

             {video.status === 'pending' && type!=="reviewvideo" &&(
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


