import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function RowHistory({ videoId }) {
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const pRefs = useRef([]);

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
            <tr key={index}>
              <td className="border-l border-gray-300 p-2">{annotation.timestamp}</td>
              <td className="border-l border-gray-300 text-start p-2">{annotation.rule}</td>
              <td className="border-l border-gray-300 text-left p-2">{annotation.details}</td>
              <td className="border-l border-gray-300 text-left p-2">{annotation.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RowHistory;
