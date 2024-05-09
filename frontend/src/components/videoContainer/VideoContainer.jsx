import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import history from '../../../src/assets/Images/history.png';
import pen from '../../../src/assets/Images/pen.png';
import review from '../../../src/assets/Images/review.png';
import blue from '../../assets/Images/blue.png';
import green from '../../assets/Images/greenflag.png';
import red from '../../assets/Images/redflag.png';
import white from '../../assets/Images/white.png';
import yellow from '../../assets/Images/yellow.png';

function VideoContainer({ type,videoData,viewType,videotype }) {
  // console.log(viewType)
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  // const [productFilter, setProductFilter] = useState('all');

  const [productFilter, setProductFilter] = useState(() => {
    // Retrieve from localStorage, default to 'all' if not found
    return localStorage.getItem('productFilter') || 'all';
  });

  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Update localStorage when productFilter changes
    localStorage.setItem('productFilter', productFilter);
  }, [productFilter]);


  const handleAnnotate = (videoId,category) => {
    navigate(`/annotation/${category}/${videoId}`);
  };

  const ViewAnnotate = (videoId) => {
    navigate(`/annotationhistory/${videoId}`)
  };
const Viewvideohistory=(videoId) => {
  navigate(`/videohistory/${videoId}`)
};
  const ViewHistory = (videoId) => {
    navigate(`/videohistory/${videoId}`)
  };


  const ViewReviewHistory = (videoId) => {
    navigate(`/expertreviewhistory/${videoId}`)
  };


  const handleReview = (videoId) => {
    navigate(`/reviewvideo/${videoId}`);
  };


  const handleApprove = (videoId) => {
    if (type==='expertred' || type==='expertgreen') {
      navigate(`/expertreviewhistory/${videoId}`)
    }
    else{
      navigate(`/approvevideo/${videoId}`);
    }
    
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

  const productMatch = productFilter === 'all' || video.category === productFilter;
  const uploadedDateMatch = !startDate || new Date(video.createdIn).toLocaleDateString() === startDate.toLocaleDateString();
  const annotatedDateMatch = !startDate || (video.annotateddate && new Date(video.annotateddate).toLocaleDateString() === startDate.toLocaleDateString());

  if (type === "annotator") {
    return productMatch && annotatedDateMatch;
  } else {
    return productMatch && uploadedDateMatch;
  }
});



  return (
    <div className='w-full ml-auto pr-2 pl-2'> 
    {viewType=== 'Grid'  &&(
      <div className='sm:w-auto right-0'>
        <div className=' items-end'>
      {type !== "industry" && (
        <>
            <select className='bg-white text-xs p-1 items-end mt-2 mb-2 rounded w-[25%]'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All Products</option>
                <option value='Confectionery'>Confectionery</option>
                <option value='Fine Bakery Wares'>Fine Bakery Wares</option>
                <option value='Bread and Ordinary Bakery Wares'>Bread and Ordinary Bakery Wares</option>
                <option value='Cereals'>Cereals</option>
                <option value='Potato,cereal or starch-based and animal based'>Potato,cereal or starch-based and animal based</option>
                <option value='Processed nuts'>Processed nuts</option>
                <option value='Fish-based'>Fish-based</option>
                <option value='Juices'>Juices</option>
                <option value='Milk and dairy based drinks'>Milk and dairy based drinks</option>
                <option value='Water based flavoured drink'>Water based flavoured drink</option>
                <option value='Coffee,coffee substitutes,tea, herbal infusions'>Coffee,coffee substitutes,tea, herbal infusions</option>
                <option value='Cereal,grain, tree nut-based beverages'>Cereal,grain, tree nut-based beverages</option>
                <option value='Frozen dairy based desserts and edible ices'>Frozen dairy based desserts and edible ices</option>
                <option value='Curded dairy based desserts'>Curded dairy based desserts</option>
                <option value='Cheese and analogues'>Cheese and analogues</option>
                <option value='Composite foods'>Composite foods</option>
                <option value='Fats and oils, and fat emulsions'>Fats and oils, and fat emulsions</option>
                <option value='Pasta and noodles and like products'>Pasta and noodles and like products</option>
                <option value='Fresh and frozen meat, poultry, game, fish and seafood products'>Fresh and frozen meat, poultry, game, fish and seafood products</option>
                <option value='Processed meat, poultry and game Products'>Processed meat, poultry and game Products</option>
                <option value='Processed fish and seafood products'>Processed fish and seafood products</option>
                <option value='Fresh and frozen fruits and vegetables,and legumes'>Fresh and frozen fruits and vegetables,and legumes</option>
                <option value='Processed fruits and vegetables'>Processed fruits and vegetables</option>
                <option value='Solid-form soybean Products'>Solid-form soybean Products</option>
                <option value='Sauces, dips, and dressings'>Sauces, dips, and dressings</option>
                <option value='Fats and oils, and fat emulsions'>Fats and oils, and fat emulsions</option>
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
      
    <div className="grid h-full h-min-screen grid-cols-2 md:grid-cols-4 gap-6 p-4 mt-8 mr-5 mb-8 bg-backgroundGreen">
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
              <p>Category: {video.category}</p>
              <p>Size: {video.size} {video.unit}</p>
              
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
                onClick={() => handleAnnotate(video._id,"annotate")} // Pass video ID to handleAnnotate
              />
            </div>
          )}

        {type === 'reannotate' && !("industry" === type) &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img
                src={pen}
                alt="reannotate"
                onClick={() => handleAnnotate(video._id,"reannotation")} // Pass video ID to handleAnnotate
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

          {type === 'annotated' && !("industry" === type) && (type!=="expert")&&(
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={history} alt="Annotated" onClick={() => ViewAnnotate(video._id)}/>
            </div>
          )}
{/* 
            {type==="reviewvideo" && (
              <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={history} alt="Annotated" />
            </div>
             )} */}

          {(video.status === 'annotated' && type==="expertnew") &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={pen} alt="Annotated" onClick={() => handleApprove(video._id)}/>
            </div>
          )}

{(video.status === 'annotated' && type==="expertreviewed") &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 mt-2 mr-2 right-0 cursor-pointer ">
              <img src={history} alt="Annotated" onClick={() => ViewReviewHistory(video._id)}/>
            </div>
          )}

          {video.status === 'red' && (type==="expert" || type==="expertred"|| type==="industry") &&(
            <div className="flex h-8 w-full icon-overlay absolute top-0 mt-2 mr-2 right-0 justify-between ">
              <img src={red} alt="red" />
              {type==="industry" && (
                <img className='cursor-pointer'src={history} alt="Annotated" onClick={() => Viewvideohistory(video._id)}/>
              )}
              {(type==="expertred" || type ==="expert") && type!=="history" &&(
                <img className='cursor-pointer'src={history} alt="Annotated" onClick={() => handleApprove(video._id)}/>
              )}  
            </div>
          )}

          {video.status === 'green' && type!=="history" && (type==="expert"|| type==="expertgreen"||type==="industry") &&(
            <div className="flex justify-between ml-4 h-8 w-full icon-overlay absolute top-0 mt-2 mr-2 right-0 ">
              <img src={green} alt="green" />
              {type==="industry" && (
                <img className='cursor-pointer'src={history} alt="Annotated" onClick={() => ViewAnnotate(video._id)}/>
              )}
              { (type==="expert"|| type==="expertgreen") && (
                 <img className='cursor-pointer'src={history} alt="Annotated" onClick={() => handleApprove(video._id)}/>
              )}
              
            </div>
          )}



        {((videotype === 'annotated' && type==="industry") && type!=="history" || (video.status ==="annotated" && type==="industry") && type!=="history")&&(
            <div className="flex justify-between gap-8 h-12 w-60 icon-overlay absolute top-0 mt-2 mr-1 right-0  cursor-pointer ">
              <img className="h-8 w-8" src={history} alt="Annotate" onClick={() => ViewAnnotate(video._id)}/>
              <img className="h-4 w-4" src={blue} alt="Annotate"/>
              
            </div>
          )}

          
          {type === 'pending' && !("industry" === type) && type!=="history" &&(
            <div className="h-24 w-8 icon-overlay absolute top-0 right-0 cursor-pointer ">

              <img src={review} alt="Review" onClick={() => handleReview(video._id)} />
            </div>
          )}

        {((videotype === 'pending' && type === 'industry') && type!=="history" || (video.status === 'pending' && type === 'industry')) && (
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
   <div className='h-full mt-4 text-black w-full min-w-screen'>
    <div className='items-end'>
    {type !== "industry" && (
      <>
    <select className='bg-white p-1 items-end mt-2 mb-2 rounded'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                 <option value='all'>All Products</option>
                <option value='Confectionery'>Confectionery</option>
                <option value='Fine Bakery Wares'>Fine Bakery Wares</option>
                <option value='Bread and Ordinary Bakery Wares'>Bread and Ordinary Bakery Wares</option>
                <option value='Cereals'>Cereals</option>
                <option value='Potato,cereal or starch-based and animal based'>Potato,cereal or starch-based and animal based</option>
                <option value='Processed nuts'>Processed nuts</option>
                <option value='Fish-based'>Fish-based</option>
                <option value='Juices'>Juices</option>
                <option value='Milk and dairy based drinks'>Milk and dairy based drinks</option>
                <option value='Water based flavoured drink'>Water based flavoured drink</option>
                <option value='Coffee,coffee substitutes,tea, herbal infusions'>Coffee,coffee substitutes,tea, herbal infusions</option>
                <option value='Cereal,grain, tree nut-based beverages'>Cereal,grain, tree nut-based beverages</option>
                <option value='Frozen dairy based desserts and edible ices'>Frozen dairy based desserts and edible ices</option>
                <option value='Curded dairy based desserts'>Curded dairy based desserts</option>
                <option value='Cheese and analogues'>Cheese and analogues</option>
                <option value='Composite foods'>Composite foods</option>
                <option value='Fats and oils, and fat emulsions'>Fats and oils, and fat emulsions</option>
                <option value='Pasta and noodles and like products'>Pasta and noodles and like products</option>
                <option value='Fresh and frozen meat, poultry, game, fish and seafood products'>Fresh and frozen meat, poultry, game, fish and seafood products</option>
                <option value='Processed meat, poultry and game Products'>Processed meat, poultry and game Products</option>
                <option value='Processed fish and seafood products'>Processed fish and seafood products</option>
                <option value='Fresh and frozen fruits and vegetables,and legumes'>Fresh and frozen fruits and vegetables,and legumes</option>
                <option value='Processed fruits and vegetables'>Processed fruits and vegetables</option>
                <option value='Solid-form soybean Products'>Solid-form soybean Products</option>
                <option value='Sauces, dips, and dressings'>Sauces, dips, and dressings</option>
                <option value='Fats and oils, and fat emulsions'>Fats and oils, and fat emulsions</option>
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
    <div className='h-full mt-4 overflow-x-auto xl:overflow-hidden text-black place-items-center pr-4'> 
   <table className='h-full mt-8 w-full'>
     {/* Table headers with filter dropdown for 'Status' and date picker for 'Uploaded Date' */}
     <thead>
       <tr className='mt-12'>
        <th></th>
        {/* <th className='px-3'> {' '}</th> */}
        <th className='px-2'>Brand {' '}</th>
         <th className='px-2'> Product{' '}</th>
         {/* <th className='px-2'> Category{' '}</th> */}
         <th className='px-2'> Size{' '}</th>
         <th>
           Status
         </th>
         <th className='px-2 text-center mt-12'>Uploaded Date</th>
         <th className='px-2 mt-12'>Uploaded Time</th>
         <th className='px-2 mt-12'>Uploader</th>
         {type === 'annotated' && (
           <>
             <th className='px-2'>Annotated Date</th>
             <th className='px-2'>Annotated Time</th>
           </>
         )}
         {type!=="history" && type!="reviewvideo" && (
         <th className='px-2 mt-12'>Actions</th>
         )} 
       </tr>
     </thead>
     <tbody className='mt-12 text-black'>
       {filteredVideos.map((video, index) => (
         <tr key={index} className='border-b-1'>
          <td className='w-40 pr-2'>
            <div></div>
            <div>
            <ReactPlayer
                className='react-player h-8 w-8 pl-2'
                url={`/videos/${handleVideo(video.videoPath)}`}
                width='100%'
                height='auto'
                controls={true}
            />
            </div>
         
          </td>
          <td className='pr-2'>{video.brand}</td>
           <td className='px-2'>{video.product}</td>
            {/* <td className='px-2'>{video.category}</td> */}
           <td className='px-2'>{video.size} {video.unit}</td>
           <td className='px-2'>{video.status}</td>
           <td className='px-2'>{video.createdIn}</td>
           <td className='px-2'>{video.createdAt}</td>
           <td className='px-2'>{video.uploader}</td>
           {type === 'annotated' && (
             <>
               <td className='px-2'>{video.annotateddate}</td>
               <td className='px-2'>{video.annotatedtime}</td>
             </>
           )}

           <td className='px-2'>
             {video.status === 'unannotated' && type!=="reviewvideo" && type!=="history" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-11 py-2.5 text-center me-2 mb-2 "
                 onClick={() => handleAnnotate(video._id,"annotate")}
               >Annotate</button>
             )}
              {video.status === 'reannotate' && type!=="reviewvideo" && type!=="history" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-11 py-2.5 text-center me-2 mb-2 "
                 onClick={() => handleAnnotate(video._id,"reannotation")}
               >Reannotate</button>
             )}
             {(video.status === 'annotated' || video.status==="red" || video.status==="green" )&& type!=="industry" && type!=="reviewvideo"  && type!=="expert" && type!=="expertred" && type!=="expertnew" && type!=="history" && type!=="expertreviewed" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => ViewAnnotate(video._id)}
             >View History</button>
             )}

            {(video.status === 'annotated' || video.status==="red" || video.status==="green" )&& type==="industry" && type!=="reviewvideo"  && type!=="expert" && type!=="expertnew" && type!=="history" && type!=="expertreviewed" &&(
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => ViewHistory(video._id)}
             >View History</button>
             )}

            {(video.status==="red" || video.status==="green" )&& (type==="expertred" || type==="expertgreen" || type==="expertreviewed") && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => ViewReviewHistory(video._id)}
             >View History</button>
             )}

              {video.status === 'annotated' && type==="expertnew" && type!=="history" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => handleApprove(video._id)}
             >Review</button>
             )}

            {/* {video.status === 'red' && (type==="expert") && type!=="history" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-8 py-2.5 "
                 onClick={() => handleApprove(video._id)}
             >View Details</button>
             )} */}

             {/* {type==="reviewvideo" && (
              <button
              className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 lg:px-8 py-2.5 sm:px-2 "
                onClick={() => handleApprove(video._id)}
            >View Details</button>
             )} */}

             {video.status === 'green' && (type==="expert" || type==='expertgreen') && type!=="history" && type!="expertreviewed" && (
               <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 lg:px-8 py-2.5 sm:px-2 "
                 onClick={() => handleApprove(video._id)}
             >View Details</button>
             )}
             


             {video.status === 'pending' && type!=="reviewvideo" && type!=="history" && type!=="industry" &&(
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
 </div>

)}
</div>
)
 }

export default VideoContainer;


