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
          <tr key={`finalcomment-${0}`}>
            <td className='p-2'>{Data.finalcomment[0].commenter}</td>
            <td className='p-2'>Final Comment</td>
            <td className='p-2'>{Data.finalcomment[0].text}</td>
            <td className='p-2'>
              {Data.finalflag[0].status === "green" && (
                <>
                  <span>Green</span>
                  {/* <img src={green} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
              {Data.finalflag[0].status === "red" && (
                <>
                  <span>Red</span>
                  {/* <img src={red} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
            </td>
            <td className='p-2'>{Data.finalcomment[0].commenteddate}</td>
            <td className='p-2'>{Data.finalcomment[0].commentedtime}</td>
          </tr>
        );
      }
    }

    else if (userData && userData.role && userData.role === "expert head" && type !== "Industry" && type !== "annotator") {
      if(Data.comment){
        for (let i = 0; i < Data.comment.length; i++) {
          let status='';
          for(let j=0;j<Data.panelstatus.length;j++){
            if(Data.comment[i].commenter === Data.panelstatus[j].email){
              status = Data.panelstatus[j].status;
            }
          }
          result.push(
            <tr key={`comment-${i}`}>
              <td className='p-2'>{Data.comment[i].commenter}</td>
              <td className='p-2'>Comment</td>
              <td className='p-2'>{Data.comment[i].text}</td>
              <td className='p-2'>
                {status === "green" && (
                  <>
                    <span>Green</span>
                    {/* <img src={green} className="h-8 w-8 ml-4" alt="" /> */}
                  </>
                )}
                {status === "red" && (
                  <>
                    <span>Red</span>
                    {/* <img src={red} className="h-8 w-8 ml-4" alt="" /> */}
                  </>
                )}
              </td>
              <td className='p-2'>{Data.comment[i].commenteddate}</td>
              <td className='p-2'>{Data.comment[i].commentedtime}</td>
            </tr>
          );

          if (Data.reply && Data.reply.length > 0 && Data.reply[i]) {
            for (let j = 0; j < Data.reply[i].length; j++) {
              result.push(
                <tr key={`reply-${i}-${j}`}>
                  <td className='p-2'>{Data.reply[i][j].replyer}</td>
                  <td className='p-2'>Reply</td>
                  <td className='p-2'>{Data.reply[i][j].text}</td>
                  <td className='p-2'></td>
                  <td className='p-2'>{Data.reply[i][j].replieddate}</td>
                  <td className='p-2'>{Data.reply[i][j].repliedtime}</td>
                </tr>
              );
            }
          }
        }
      }
      if(Data.finalcomment[0] ){     
        result.push(
          <tr key={`finalcomment-${0}`}>
            <td className='p-2'>{Data.finalcomment[0].commenter}</td>
            <td className='p-2'>Final Comment</td>
            <td className='p-2'>{Data.finalcomment[0].text}</td>
            <td className='p-2'>
              {Data.finalflag[0].status === "green" && (
                <>
                  <span>Green</span>
                  {/* <img src={green} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
              {Data.finalflag[0].status === "red" && (
                <>
                  <span>Red</span>
                  {/* <img src={red} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
            </td>
            <td className='p-2'>{Data.finalcomment[0].commenteddate}</td>
            <td className='p-2'>{Data.finalcomment[0].commentedtime}</td>
          </tr>
        );
      }
    } else if (userData && userData.role && userData.role === "expert panel" && type !== "annotator" && Data.comment && Data.comment.length > 0) {
      let userCommentIndex = -1; 
      for (let z = 0; z < Data.comment.length; z++) {
        if (Data.comment[z].commenter === email) {
          userCommentIndex = z;
          break; 
        }
      }
    
      if(userCommentIndex >= 0){
        let status='';
        for(let j=0;j<Data.panelstatus.length;j++){
          if(email === Data.panelstatus[j].email){
            status = Data.panelstatus[j].status;   
          }
        }
        result.push(
          <tr key={`comment-${userCommentIndex}`}>
            <td className='p-2'>{Data.comment[userCommentIndex].commenter}</td>
            <td className='p-2'>Comment</td>
            <td className='p-2'>{Data.comment[userCommentIndex].text}</td>
            <td className='p-2'>
              {status === "green" && (
                <>
                  <span>Green</span>
                  {/* <img src={green} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
              {status === "red" && (
                <>
                  <span>Red</span>
                  {/* <img src={red} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
            </td>
            <td className='p-2'>{Data.comment[userCommentIndex].commenteddate}</td>
            <td className='p-2'>{Data.comment[userCommentIndex].commentedtime}</td>
          </tr>
        );
      }
      if(Data.finalcomment && Data.finalcomment.length > 0) {
        result.push(
          <tr key={`finalcomment-${0}`}>
            <td className='p-2'>{Data.finalcomment[0].commenter}</td>
            <td className='p-2'>Final Comment</td>
            <td className='p-2'>{Data.finalcomment[0].text}</td>
            <td className='p-2'>
              {Data.finalflag[0].status === "green" && (
                <>
                  <span>Green</span>
                  {/* <img src={green} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
              {Data.finalflag[0].status === "red" && (
                <>
                  <span>Red</span>
                  {/* <img src={red} className="h-8 w-8 ml-4" alt="" /> */}
                </>
              )}
            </td>
            <td className='p-2'>{Data.finalcomment[0].commenteddate}</td>
            <td className='p-2'>{Data.finalcomment[0].commentedtime}</td>
          </tr>
        );
      }
    }

    if(type !== "annotator"){
      for(let i = 0; i < Data.reply.length; i++){
        if (Data.reply && Data.reply.length > 0 && Data.reply[i]) {
          result.push(
            <tr key={`reply-${i}`}>
              <td className='p-2'>{Data.reply[i].replyer}</td>
              <td className='p-2'>Reply</td>
              <td className='p-2'>{Data.reply[i].text}</td>
              <td className='p-2'></td>
              <td className='p-2'>{Data.reply[i].replieddate}</td>
              <td className='p-2'>{Data.reply[i].repliedtime}</td>
            </tr>
          );
        }
      }
    }

    return result;
  };

  return (
    <div className='mt-12 lg:w-3/4 p-3 font-semibold text-center ml-0'>
      <h1 className='text-sidebarGreen text-2xl'>Comment section</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Commenter</th>
              <th className="w-1/4 px-4 py-2">Type</th>
              <th className="w-1/4 px-4 py-2">Text</th>
              <th className="w-1/4 px-4 py-2">Status</th>
              <th className="w-1/4 px-4 py-2">Date</th>
              <th className="w-1/4 px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {renderCommentsAndReplies().length > 0 ? (
              renderCommentsAndReplies()
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Not yet reviewed this video
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {((type !== "annotator" && !Data.finalcomment) || (Data && Data.reply && Data.reply.length > 0 && type !== "industry")) && (
        <div className='bg-gray-300 text-white p-3 mt-4 text-xl text-left'>
          <h1></h1>
          <Comments type={type} videoId={videoId} />
        </div>
      )}

      {((type === "industry" || user === "industry") && Data.finalcomment && !Data.reply.length > 0) && (
        <div className='bg-gray-300 text-white p-3 mt-4 text-xl text-left'>
          <Comments type={"reply"} videoId={videoId} />
        </div>
      )}
    </div>
  );
}

export default ViewComment;
