import React from 'react';

function Row() {
  return (
    <div className='flex ml-16'>  
    <div className="relative h-full bg-backgroundGreen justify-center border-gray-200 border-1 rounded-sm">
      <label id='timestamp' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
      <select className="bg-gray-50 border w-36 border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen">
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
    <div className="relative h-full bg-backgroundGreen ml-12 min-w-[200px] border-gray-200 border-1 rounded-sm">
      <label id='rules' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
      <select className="bg-gray-50 bordermt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-sidebarGreen focus:border-sidebarGreen block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sidebarGreen dark:focus:border-sidebarGreen">
        <option >Rule 01</option>
        <option >Rule 02</option>
        <option >Rule 03</option>
        <option >Rule 04</option>
        <option >Rule 05</option>
        <option >Rule 06</option>
      </select>
    </div>
    <div>
    <div className="relative h-full mb-6 bg-backgroundGreen ml-12 border-gray-200 border-1 rounded-sm">
    <label id='details' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
      <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
    </div>
      </div>

      <div className="relative h-full mb-6 bg-backgroundGreen ml-12 border-gray-200 border-1 rounded-sm">
          <label id='reccomendation' htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          </div>
      </div>

      
  );
}

export default Row;

