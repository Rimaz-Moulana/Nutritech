import React, { useEffect, useState } from 'react'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'
import Navbar from '../../components/navbar/Navbar'
import Rownames from '../../components/AnnotationTable/Rownames'
import Row from '../../components/AnnotationTable/Row'
import Buttons from '../../components/AnnotationTable/Buttons'
import Videowithtext from '../../components/AnnotationTable/Videowithtext'
import plus from '../../assets/Images/plus.png'
import minus from '../../assets/Images/minus.png'

function AnnotationTable() {
  const [addedrows, setAddedRows] = useState(() => {
        const storedrows = localStorage.getItem('addedrows');
        return storedrows ? JSON.parse(storedrows) : [];
      });
  const [rowCount, setRowCount] = useState(() => addedrows.length); 

  const addRow = () => {
    setRowCount((prevCount) => prevCount + 1);
    setAddedRows((prevRows) => [...prevRows, rowCount]);
  };  

  const removeRow = (index) => {
    if (addedrows.includes(index) && rowCount > 0) {
      setRowCount((prevCount) => prevCount - 1);
      setAddedRows((prevRows) => prevRows.filter((rowIndex) => rowIndex !== index));
    }
  };

    useEffect(() => {
    localStorage.setItem('addedrows', JSON.stringify(addedrows));
  }, [addedrows]);

  return (  
    <div className='bg-backgroundGreen h-full flex'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className="w-full h-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar type='annotator'/>
        <div className='w-full mt-28'>
            <Videowithtext />
        </div>
        <div className='ml-16 h-full sm:ml-20 mb-8 mt-10 text-3xl font-semibold text-sidebarGreen'>
          <Rownames />
          <Row />
          <Row />
          <Row />
          {[...Array(rowCount)].map((_, index) => (
            <div key={index} className='flex'>
              <Row />
              {addedrows.includes(index) && (
                <button 
                  className='rounded-full p-2 justify-end ml-8'
                  onClick={() => removeRow(index)}
                >
                  <img src={minus} alt="Remove" />
                </button>
              )}
            </div>
          ))}
          <div className='flex fixed right-32 bottom-20'>
            <button 
              className='rounded-full bg-gradient-to-r from-buttonGreen to-darkGreen hover:bg-gradient-to-br p-2 mr-2 mb-8'
              onClick={addRow}
            >
              <img src={plus} alt="Add" />
            </button>
          </div>
          <div className='flex items-end justify-center mt-4 h-full'>
        <Buttons />
      </div>
      </div>
      
      </div>
    </div>
  )
}

export default AnnotationTable