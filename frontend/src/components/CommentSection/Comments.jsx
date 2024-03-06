import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios here

function Comments({ videoId }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

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
    localStorage.setItem('savedComment', newComment);
  };

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      setLoading(true);
      // Make API call with the comment value
      const response= axios.post(`http://localhost:3000/api/videos/comment/${videoId}`, { comment })
        .then((response) => {
          // Handle success if needed
          console.log('Comment submitted successfully:', response.data);
        })
        .catch((error) => {
          // Handle error if needed
          console.error('Error submitting comment:', error);
        })
        .finally(() => {
          setLoading(false);
        });
        localStorage.removeItem('savedComment')
        window.history.back();
    } else {
      // Handle empty comment case if needed
      console.warn('Comment cannot be empty');
    }
  };

  useEffect(() => {
    console.log(comment); // This will log the comment whenever it changes
  }, [comment]);

  return (
    <div>
        <div>
          <textarea
            placeholder='Type Comments...'
            className='w-1/2 ml-8 h-16'
            required
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        <button
          className='text-white mt-4 bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2'
          onClick={handleSubmit}
        >
          Submit
        </button>

    </div>
  );
}

export default Comments;
