import React from 'react';

function Rownames() {
  return (
    <div className='flex text-xl'>  
    <div className="relative h-full bg-backgroundGreen w-64 min-w-[200px] ml-12 border-gray-200 border-1 rounded-sm">
        TimeStamp
    </div>
    <div className="relative h-full bg-backgroundGreen w-64 min-w-[200px] ml-12 border-gray-200 border-1 rounded-sm">
      Violated Rule
    </div>
    <div>
    <div className="relative h-full mb-6 bg-backgroundGreen w-64 min-w-[200px] ml-12 border-gray-200 border-1 rounded-sm">
        Details
     </div>
      </div>

      <div className="relative h-full mb-6 bg-backgroundGreen w-72 min-w-[200px] ml-12 border-gray-200 border-1 rounded-sm">
          Reccomendaations
      </div>
    </div>
  );
}

export default Rownames;

