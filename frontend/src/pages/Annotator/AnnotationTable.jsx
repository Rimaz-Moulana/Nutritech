import React, { useEffect, useState } from 'react'
// import TimeStamp from '../../components/AnnotationTable/TimeStamp'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'
import Navbar from '../../components/navbar/Navbar'
import Rownames from '../../components/AnnotationTable/Rownames'
import Row from '../../components/AnnotationTable/Row'
import Buttons from '../../components/AnnotationTable/Buttons'
import Videowithtext from '../../components/AnnotationTable/Videowithtext'
import plus from '../../assets/Images/plus.png'
import minus from '../../assets/Images/minus.png'

function AnnotationTable() {
  const [addedRows, setAddedRows] = useState(() => {
    const storedRows = localStorage.getItem('addedRows');
    return storedRows ? JSON.parse(storedRows) : [];
  });

  const [rowcount, setRowcount] = useState(() => addedRows.length);

  const addRow = () => {
    setRowcount((prevcount) => prevcount + 1);
    setAddedRows((prevRows) => [...prevRows, rowcount]);
  };

  const removeRow = (index) => {
    setAddedRows((prevRows) => {
      if (prevRows.includes(index) && prevRows.length > 0) {
        setRowcount((prevcount) => prevcount - 1);
        return prevRows.filter((rowIndex) => rowIndex !== index);
      }
      return prevRows;
    });
  };
  

  useEffect(() => {
    localStorage.setItem('addedRows', JSON.stringify(addedRows));
  }, [addedRows]);


  return (  
    <div className='bg-backgroundGreen flex h-full'>

      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className="w-full h-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        <div className='w-full mt-32'>
            <Videowithtext />
        </div>
        <div className='ml-4 h-full sm:ml-20 mb-8 mt-10 text-3xl font-semibold text-sidebarGreen'>
          <Rownames />
          <Row />
          <Row />
          <Row />
      
            {[...Array(rowcount)].map((_, index) => (
              <div key={index} className='relative'>
                <Row />
                {addedRows.includes(index) && (
                  <button 
                    className='rounded-full p-2 absolute right-0 bottom-0 left-156 top-3/4'
                    onClick={() => removeRow(index)}
                  >
                    <img src={minus} alt="Remove" />
                  </button>
                )}
              </div>
            ))}
          <div className='flex absolute right-4 bottom-4'>
            <button 
              className='rounded-full bg-gradient-to-r from-buttonGreen to-darkGreen hover:bg-gradient-to-br p-2 mr-2 mb-8'
              onClick={addRow}
            >
              <img src={plus} alt="Add" />
            </button>
          </div>
      </div>
      <div className='flex items-end justify-center h-full'>
        <Buttons />
      </div>
      </div>
    </div>
  )
}

export default AnnotationTable
