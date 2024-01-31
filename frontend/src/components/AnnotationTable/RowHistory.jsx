import React from 'react';

function RowHistory() {
  return (
    <div className='flex ml-0 mt-12 text-gray-500'>  
    <div className=''>
    <div className="relative justify-center border-gray-200 border-1 rounded-sm">
      <label id='timestamp' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Stamp</label>
      <p className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen">00-05s</p>
    </div>
    <div className="relative mt-4 min-w-[200px] border-gray-200 border-1 rounded-sm">
      <label id='rules' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rule</label>
      {/* <select className="bg-gray-50 border mt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen">
        <option >Rule 01</option>
        <option >Rule 02</option>
        <option >Rule 03</option>
        <option >Rule 04</option>
        <option >Rule 05</option>
        <option >Rule 06</option>
      </select> */}
      <p>Rule 01</p>
    </div>
    <div className='mt-4 border-2 text-left border-gray-300 rounded-sm h-24 text'>
      <p className=''> Advertisements must not make false or misleading claims about the health benefits of foods</p>
    </div>
    </div>
<div className='flex'>
<div >
    <div className="relative h-full mb-6 ml-12 border-gray-200 border-1 rounded-sm">
    <label id='details' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
      <p type="text" id="small-input" className="block w-96 h-60 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> The dvertisement make false or misleading claims about the health benefits of food</p>
    </div>
      </div>

      <div className="relative h-full mb-6 ml-12 border-gray-200 border-1 rounded-sm">
          <label id='reccomendation' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recommendation</label>
            <p type="text" id="small-input" className="block w-96 h-60 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">hjfgb hgqagbf hfgqhi uyrgfqurg yegugr ygryrgb wejhqi ufh    iow</p>
          </div>
</div>
    
      </div>

      
  );
}

export default RowHistory;

