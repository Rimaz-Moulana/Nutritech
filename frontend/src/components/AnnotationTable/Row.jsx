import React, { useState } from 'react';

function Row({
  onRuleChange,
  onDetailsChange,
  onTimestampChange,
  onRecommendationChange,
}) {
  const [timestamp, setTimeStamp] = useState('');
  const [rule, setRule] = useState('');
  const [details, setDetails] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleRuleChange = (e) => {
    setRule(e.target.value);
    onRuleChange(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
    onDetailsChange(e.target.value);
  };

  const handleTimestampChange = (e) => {
    setTimeStamp(e.target.value);
    onTimestampChange(e.target.value);
  };

  const handleRecommendationChange = (e) => {
    console.log('e.target.value:', e.target.value);
    setRecommendation(e.target.value);
    onRecommendationChange(e.target.value);
  };


  return (
    <div className='flex ml-0 mt-12'>  
    <div className=''>
    <div className="relative justify-center border-gray-200 border-1 rounded-sm">
      <label id='timestamp' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Stamp</label>
      <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen" onChange={handleTimestampChange}>
        <option >Select</option>
        <option >00-05s</option>
        <option >05-10s</option>
        <option >10-15s</option>
        <option >15-20s</option>
        <option >20-25s</option>
        <option >25-30s</option>
        <option >30-35s</option>
        <option >35-40s</option>
        <option >40-45s</option>
        <option >45-50s</option>
        <option >50-55s</option>
        <option >55-60s</option>
      </select>
    </div>
    <div className="relative mt-4 min-w-[200px] border-gray-200 border-1 rounded-sm">
      <label id='rules' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regulation</label>
      <select className="bg-gray-50 border mt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen" onChange={handleRuleChange}>
      <option >Select</option>
        <option >Regulation 01</option>
        <option >Regulation 02</option>
        <option >Regulation 03</option>
        <option >Regulation 04</option>
        <option >Regulation 05</option>
        <option >Regulation 06</option>
      </select>
    </div>
    <div className='mt-4 border-2 text-left border-gray-300 rounded-sm h-24 '>
      <p className=''>Rule 01</p>
    </div>
    </div>
<div className='flex'>
<div >
    <div className="relative h-full mb-6 ml-12 border-gray-200 border-1 rounded-sm">
    <label id='details' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
      <textarea type="text" id="small-input" className="block w-96 h-60 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDetailsChange}></textarea>
    </div>
      </div>

      <div className="relative h-full mb-6 ml-12 border-gray-200 border-1 rounded-sm">
          <label id='reccomendation' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recommendation</label>
            <textarea type="text" id="small-input" className="block w-96 h-60 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleRecommendationChange}></textarea>
          </div>
</div>
    
      </div>

      
  );
}

export default Row;
