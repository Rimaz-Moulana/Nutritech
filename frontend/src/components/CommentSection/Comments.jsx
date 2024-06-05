import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios here
import Swal from 'sweetalert2';

function Comments({ videoId, type,section,onClose}) {
  const [comment, setComment] = useState('');
  const [reply,setReply]=useState('');
  const [loading, setLoading] = useState(false);
  const email  = localStorage.getItem('email');
  
  let text;

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
          const response = await axios.get(`http://localhost:3000/api/users/getUser/${email}`);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);

  useEffect(() => {
    // Retrieve the comment value from localStorage when the component mounts
    const savedComment = localStorage.getItem('savedComment');
    if (savedComment) {
      setComment(savedComment);
    }
  }, []);

  const handleCommentChange = (e) => {
    // Update the comment value and save it to localStorage
    const newComment = e.target.value;
    setComment(newComment);
    // localStorage.setItem('savedComment', newComment);
  };
console.log(section);
  const handleSubmit = async () => {
    try {
      if (comment.trim() !== '') {
        setLoading(true);
  
        const response = await axios.post(
          section==="message" ? `http://localhost:3000/api/videos/message/${videoId}` :
          
          userData.role==="expert head" ? `http://localhost:3000/api/videos/finalcomment/${videoId}` :

          type === "comment"
            ?
             `http://localhost:3000/api/videos/comment/${videoId}`
             
            : `http://localhost:3000/api/videos/reply/${videoId}`,
          { comment, email }
        );
  
        console.log('Comment submitted successfully:', response.data);
      } else {
        console.warn('Comment cannot be empty');
      }

      Swal.fire({
        icon: 'success',
        title: 'Comment saved successfully!',
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
     

      // window.history.back();
      
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false);
    }


  };
  

  useEffect(() => {
    console.log(comment); // This will log the comment whenever it changes
  }, [comment]);

  return (
    <>
        <div>
          <textarea
            placeholder={`Type ${type}...`}
            className='w-[75%] h-24 ml-8 z-10 text-black'
            required={type !== "message"}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="bottom-0 flex justify-center w-full px-4 py-4"> 
        <button
          className='mb-12 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'
          onClick={handleSubmit}
        >
          Submit
        </button>
        {/* <button className="mb-12 text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " onClick={() => window.history.back()}>Cancel</button> */}
      </div>
      </>
  
  );
}

export default Comments;
