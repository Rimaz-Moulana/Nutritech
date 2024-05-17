import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import red from '../../assets/Images/redflag.png'
import green from '../../assets/Images/greenflag.png'
import { useParams } from 'react-router-dom';

function ViewComment({ videoId, type }) {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const email  = localStorage.getItem('email');

  const {user} = useParams();

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
// console.log(userData);

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

  const renderCommentsAndReplies = () => {
    const result = [];

    if(type==="industry" || type==="annotator" ){
      if(Data.finalcomment[0] ){     
        result.push(
          <div key={`finalcomment-${0}`} className='bg-gray-300 text-black mt-4 p-3 text-xl text-left'>
            {/* {console.log(Data.reply[i][j].text)} */}
    
            <p className='text-gray-600'>{Data.finalcomment[0].commenter}</p>
             <p className='text-gray-600 text-sm'>Final Comment :</p> 
             {Data.finalcomment[0].text}

            {Data.finalflag[0].status==="green" && (
              <>
              <p className='text-gray-600 text-sm'>Status :</p>
              <div className='flex'>
                <p>Green</p>
                <p className='text-sm text-gray-600'>(Verified)</p>
                <img src={green} className="h-8 w-8 ml-4" alt="" />
                
              </div>
              </>
            )}
            {Data.finalflag[0].status==="red" && (
              <>
              <p className='text-gray-600 text-sm'>Status :</p>
              <div className='flex'>
                <p>Red</p>
                <img src={red} className="h-8 w-8 ml-4" alt="" />
              </div>
              </>
            )}
            
            {/* {console.log(Data.reply[i][j].text)} */}
            <div className='flex space-x-8 text-sm mt-4'>
              
              <p>{Data.finalcomment[0].commenteddate}</p>
              <p>{Data.finalcomment[0].commentedtime}</p>
            </div>
          </div>
        );
      }
    }

    else if (userData && userData.role && userData.role=="expert head" && type!=="Industry" && type!=="annotator") {
      // Interleave comments and replies
      if(Data.comment){
      for (let i = 0; i < Data.comment.length; i++) {
        let status='';
      // console.log(Data.panelstatus.lrngth);
      for(let j=0;j<Data.panelstatus.length;j++){
        if(Data.comment[i].commenter==Data.panelstatus[j].email){
          status=Data.panelstatus[j].status;
        }
      }
        result.push(
          <div key={`comment-${i}`} className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
            {/* {Data.comment[i] && Data.comment[i].commenter && ( */}
              <>
            <p className='text-gray-600'>{Data.comment[i].commenter}</p>
            <p className='text-gray-600 text-sm'>Comment :</p>
            {Data.comment[i].text}

            {status && status==="green" && (
             <>
             <p className='text-gray-600 text-sm'>Status :</p>
             <div className='flex'>
               <p>Green</p>
               <p className='text-sm text-gray-600'>(Verified)</p>
               <img src={green} className="h-8 w-8 ml-4" alt="" />
               
             </div>
             </>
          )}

        {status && status==="red" && (
          <>
          <p className='text-gray-600 text-sm'>Status :</p>
             <div className='flex'>
             <p>Red</p>
             <img src={red} className="h-8 w-8 ml-4" alt="" />
           </div>
           </>
          )}
            
            <div className='flex space-x-8 text-sm mt-4'>
              <p>{Data.comment[i].commenteddate}</p>
              <p>{Data.comment[i].commentedtime}</p>
            </div>
            </>
            {/* )} */}
          </div>
        );

        // Check if there are replies for this comment
        if (Data.reply && Data.reply.length > 0 && Data.reply[i]) {
          // Rendering replies
          for (let j = 0; j < Data.reply[i].length; j++) {
              result.push(
                  <div key={`reply-${i}-${j}`} className='bg-gray-200 text-black mt-4 p-3 text-xl text-left'>
                      {/* {console.log(Data.reply[i][j].text)} */}
                      <p className='text-gray-600'>{Data.reply[i][j].replyer}</p>
                      <p className='text-gray-600 text-sm'>Reply :</p> 
                      {Data.reply[i][j].text}
                      {/* {console.log(Data.reply[i][j].text)} */}
                      <div className='flex space-x-8 text-sm mt-4'>
                          {/* <p>{Data.reply[i].status}</p> */}
                          <p>{Data.reply[i][j].replieddate}</p>
                          <p>{Data.reply[i][j].repliedtime}</p>
                      </div>
                  </div>
              );
          }
      }
        // }
      }
    }
      if(Data.finalcomment[0] ){     
        result.push(
          <div key={`finalcomment-${0}`} className='bg-gray-300 text-black mt-4 p-3 text-xl text-left'>
            {/* {console.log(Data.reply[i][j].text)} */}
    
            <p className='text-gray-600'>{Data.finalcomment[0].commenter}</p>
            <p className='text-gray-600 text-sm'>Final Comment :</p> 
             {Data.finalcomment[0].text}
            {/* {console.log(Data.reply[i][j].text)} */}
            {/* <div className='flex space-x-8 text-sm mt-4'> */}
            {(Data.finalflag && Data.finalflag.length>0 && Data.finalflag[0].status==="green") && (
                <>
                <p className='text-gray-600 text-sm'>Status :</p>
                <div className='flex'>
                  <p>Green</p>
                  <p className='text-sm text-gray-600'>(Verified)</p>
                  <img src={green} className="h-8 w-8 ml-4" alt="" />
                  
                </div>
                </>
             
            ) }

            {(Data.finalflag && Data.finalflag.length>0 && Data.finalflag[0].status==="red") && (
              <>
              <p className='text-gray-600 text-sm'>Status :</p>
                  <div className='flex'>
                  <p>Red</p>
                  <img src={red} className="h-8 w-8 ml-4" alt="" />
                </div>
              </>
            )}
            <div className='flex space-x-8 text-sm mt-4'>
              <p>{Data.finalcomment[0].commenteddate}</p>
              <p>{Data.finalcomment[0].commentedtime}</p>
            </div>
          </div>
        );
      }
    }else if(userData && userData.role && userData.role=="expert panel" && type!=="annotator" && Data.comment && Data.comment.length > 0 ){
      // console.log("jhbfjhf ",email);
      let usercommetIndex = -1; // Initialize to -1
      for (let z = 0; z < Data.comment.length; z++) {
        if (Data.comment[z].commenter === email) {
          usercommetIndex = z;
          break; // Break once found
        }
      }
    
      console.log("usercommetIndex ",usercommetIndex)
      if(usercommetIndex>=0){
      
        let status='';
          for(let j=0;j<Data.panelstatus.length;j++){
          console.log("Hi");
          // console.log(Data.panelstatus[j].email);
          if(email===Data.panelstatus[j].email){
            status=Data.panelstatus[j].status;   
          }
        }
        result.push(
          <div key={`comment-${usercommetIndex}`} className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
            {/* {Data.comment[usercommetIndex] && Data.comment[usercommetIndex].commenter && ( */}
              <>
            <p className='text-gray-600'>{Data.comment[usercommetIndex].commenter}</p> 
            <p className='text-gray-600 text-sm'>Comment :</p> 
            {Data.comment[usercommetIndex].text}
            
            {status && status==="green" && (
             <>
             <p className='text-gray-600 text-sm'>Status :</p>
             <div className='flex'>
               <p>Green</p>
               <p className='text-sm text-gray-600'>(Verified)</p>
               <img src={green} className="h-8 w-8 ml-4" alt="" />
               
             </div>
             </>
          )}

        {status && status==="red" && (
          <>

          <p className='text-gray-600 text-sm'>Status :</p>
             <div className='flex'>
             <p>Red</p>
             <img src={red} className="h-8 w-8 ml-4" alt="" />
           </div>

           </>
          )}
            
            <div className='flex space-x-8 text-sm mt-4'>
              <p>{Data.comment[usercommetIndex].commenteddate}</p>
              <p>{Data.comment[usercommetIndex].commentedtime}</p>
            </div>
            </>
            {/* )} */}
          </div>
        );
      }
      if(Data.finalcomment && Data.finalcomment.length > 0) {
        result.push(
          <div key={`finalcomment-${0}`} className='bg-gray-400 text-white mt-4 p-3 text-xl text-left'>
            {/* {Data.finalcomment[0] && Data.finalcomment[0].commenter && ( */}
              <>
            <p className='text-gray-600'>{Data.finalcomment[0].commenter}</p>
            <p className='text-gray-600 text-sm'>Final Comment :</p> 
             {Data.finalcomment[0].text}
            {/* {console.log(Data.reply[i][j].text)} */}
            {/* <div className='flex space-x-8 text-sm mt-4'> */}
            {(Data.finalflag && Data.finalflag.length>0 && Data.finalflag[0].status==="green") && (
                <>
                <p className='text-gray-600 text-sm'>Status :</p>
                <div className='flex'>
                  <p>Green</p>
                  <p className='text-sm text-gray-600'>(Verified)</p>
                  <img src={green} className="h-8 w-8 ml-4" alt="" />
                  
                </div>
                </>
             
            ) }

            {(Data.finalflag && Data.finalflag.length>0 && Data.finalflag[0].status==="red") && (
              <>
              <p className='text-gray-600 text-sm'>Status :</p>
                  <div className='flex'>
                  <p>Red</p>
                  <img src={red} className="h-8 w-8 ml-4" alt="" />
                </div>
              </>
            )}
            
            <div className='flex space-x-8 text-sm mt-4'>
              <p>{Data.finalcomment[0].commenteddate}</p>
              <p>{Data.finalcomment[0].commentedtime}</p>
            </div>
            </>
            {/* )} */}
          </div>
        );
      }
    }

    if(type!=="annotator"){
      for(let i=0;i<Data.reply.length;i++){
        if (Data.reply && Data.reply.length > 0 && Data.reply[i]) {
          // Interleave replies
          // for (let j = 0; j < Data.reply.length; j++) {
            
            result.push(
              <div key={`reply-${i}`} className='bg-gray-200 text-black mt-4 p-3 text-xl text-left'>
                {/* {console.log(Data.reply[i][j].text)} */}
        
                <p className='text-gray-600'>{Data.reply[i].replyer}</p>
                <p className='text-gray-600 text-sm'>Reply :</p> 
                {Data.reply[i].text}
                {/* {console.log(Data.reply[i][j].text)} */}
                <div className='flex space-x-8 text-sm mt-4'>
                  {/* <p>{Data.reply[i].status}</p> */}
                  <p>{Data.reply[i].replieddate}</p>
                  <p>{Data.reply[i].repliedtime}</p>
                </div>
              </div>
            );
          }
      } 
      
    }

    return result;
  };
  console.log(user);
  return (
    <div className=' lg:w-3/4 p-3 font-semibold mx-auto text-center'>
      <h1 className='text-sidebarGreen text-2xl'>Comment section</h1>

      {loading ? (
        <div>Loading...</div>
      ) : renderCommentsAndReplies().length > 0 ? (
        <>
          {renderCommentsAndReplies()}

          {((type !=="annotator" && !Data.finalcomment) ||(Data.reply.length>0 && type!="industry" && userData.role=="expert head"))&& (
          <div className='bg-gray-300 text-white p-3 mt-4 text-xl text-left'>
            <Comments type={type} videoId={videoId} />
          </div>
          )}

      {((type ==="industry" || user==="industry") && Data.finalcomment && !Data.reply.length>0) && (
          <div className='bg-gray-300 text-white p-3 mt-4 text-xl text-left'>
            <Comments type={"reply"} videoId={videoId} />
          </div>
          )}
        </>
      ) : (
        <div className='bg-darkGreen text-white mt-4 p-3 text-xl text-left'>
          Not yet reviewed this video
        </div>
      )}


    </div>
  );
}

export default ViewComment;
