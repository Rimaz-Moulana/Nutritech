import React from 'react';

function Rownames() {
  return (
    <div className='flex text-xl ml-0'>  
    <div className="relative h-full bg-backgroundGreen w-24 min-w-[200px] ml-8 border-gray-200 border-1 rounded-sm">
        TimeStamp
    </div>
    <div className="relative h-full bg-backgroundGreen w-24 min-w-[200px] ml-8 border-gray-200 border-1 rounded-sm">
      Violated Rule
    </div>
    <div>
    <div className="relative h-full mb-6 bg-backgroundGreen w-24 min-w-[200px] ml-8 border-gray-200 border-1 rounded-sm">
        Details
     </div>
      </div>
      <div className="relative h-full mb-6 bg-backgroundGreen w-24 ml-8 border-gray-200 border-1 rounded-sm">
          Reccomendations
      </div>
    </div>
  );
}

export default Rownames;

