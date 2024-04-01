import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Row from './Row'
import Modal from 'react-modal';

function RowHistory({ videoId, usertype }) {
  // console.log(usertype)
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const pRefs = useRef([]);
  const [rowCorrectness, setRowCorrectness] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(() => {
    // return JSON.parse(localStorage.getItem('isChecked')) || false;
  });


  useEffect(() => {
    const fetchAnnotations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/annotations/annotationhistory/${videoId}`);
        setAnnotations(response.data.annotations);
      } catch (error) {
        console.error('Error fetching annotations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnotations();
  }, [videoId]);

  useEffect(() => {
    // Set the height of each p tag based on its content
    pRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.height = `${ref.scrollHeight}px`;
      }
    });
  }, [annotations]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    setShowModal(true);

    // localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  }
  
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className='ml-0 text-gray-500'>
    <table className="w-full bg-white border rounded">
      <thead>
        <tr>
          <th className="border border-gray-300">Time Stamp</th>
          <th className="border border-gray-300">Regulation</th>
          <th className="border border-gray-300">Details</th>
          <th className="border border-gray-300">Recommendation</th>
          
        </tr>
      </thead>
      <tbody>
        {annotations.map((annotation, index) => (
          <React.Fragment key={index}>

            {annotation.rule !== "" && (
            <tr>
              <td className="border border-gray-300 p-2">{annotation.timestamp}</td>
              <td className="border border-gray-300 text-start p-2">{annotation.rule}</td>
              <td className="border border-gray-300 text-left p-2">{annotation.details}</td>
              <td className="border border-gray-300 text-left p-2">{annotation.recommendation}</td>
              {/* {usertype === "expert" && annotation.rule !== "" && (
                <>
                  <td className="border border-gray-300 text-center p-2 "><input checked id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 center bg-gray-100 border-gray-300 focus:ring-darkGreen dark:focus:ring-darkGreen dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  /></td>
                  <td className="border border-gray-300 text-center p-2"><input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-darkGreen dark:focus:ring-darkGreen dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleCheckboxChange}/></td>
                </>
              )} */}
            </tr>
            )}

          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default RowHistory;
