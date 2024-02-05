
import React, { useState, useEffect } from 'react';
import axios from 'axios';

    function RowHistory({ videoId }) {
      const [annotations, setAnnotations] = useState([]);
    
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchAnnotations = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/annotations/annotationhistory/${videoId}`);
            setAnnotations(response.data.annotations);
            console.log(annotations)
          } catch (error) {
            console.error('Error fetching annotations:', error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchAnnotations();
      }, [videoId]);
      
// RowHistory.jsx


  return (
    <div className='flex ml-0 mt-12 text-gray-500 h-full'>
      {annotations.map((annotation, index) => (
        <div key={index} className='flex'>
          <div>
          <div className="relative justify-center border-gray-200 border-1 rounded-sm">
            <label id={`timestamp-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Stamp</label>
            <p className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen">{annotation.timestamp}</p>
          </div>
          <div className="relative mt-4 min-w-[200px] border-gray-200 border-1 rounded-sm">
            <label id={`rule-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regulation</label>
            <p >{annotation.rule}</p>
          </div>
          </div>
    
          <div className='relative h-32 mb-6 ml-12 border-gray-200 border-1 rounded-sm'>
          <label id={`details-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
            <p className='block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>{annotation.details}</p>
          </div>
          <div className="relative h-32 mb-6 ml-12 border-gray-200 border-1 rounded-sm">
            <label id={`recommendation-${index}`} htmlFor={`small-input-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recommendation</label>
            <p className='block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>{annotation.recommendation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RowHistory;
