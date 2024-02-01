import React, { useEffect, useState } from 'react';
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar';
import Navbar from '../../components/navbar/Navbar';
import Row from '../../components/AnnotationTable/Row';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import plus from '../../assets/Images/plus.png';
import minus from '../../assets/Images/minus.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnnotationTable() {
  const navigate = useNavigate();
  const viewdetails = () => {
    navigate('/product');
  };

  const [addedrows, setAddedRows] = useState(() => {
    const storedrows = localStorage.getItem('addedrows');
    return storedrows ? JSON.parse(storedrows) : [];
  });

  const [rowsData, setRowsData] = useState([]);

  const [rowCount, setRowCount] = useState(() => addedrows.length);

  

  const addRow = () => {
    setRowCount((prevCount) => prevCount + 1);
    setAddedRows((prevRows) => [...prevRows, rowCount]);
    setRowsData((prevData) => [...prevData, { timestamp: '', rule: '', details: '', recommendation: '' }]);
  };

  const removeRow = (index) => {
    if (addedrows.includes(index) && rowCount > 0) {
      setRowCount((prevCount) => prevCount - 1);
      setAddedRows((prevRows) => prevRows.filter((rowIndex) => rowIndex !== index));
      setRowsData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    localStorage.setItem('addedrows', JSON.stringify(addedrows));
  }, [addedrows]);

  const handleRowChange = (index, field, value) => {
    setRowsData((prevData) =>
      prevData.map((rowData, i) => (i === index ? { ...rowData, [field]: value } : rowData))
    );
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/annotation', rowsData);
  };

  return (
    <div className='bg-backgroundGreen h-full flex'>
      <div className='w-2/8 fixed h-full hidden sm:flex flex-col'> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
      </div>
      <div className='w-full h-full sm:w-3/4 ml-0 sm:ml-64'>
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
          <Videowithtext />
        </div>
        <div className='ml-16 h-full sm:ml-20 mb-8 mt-10 text-sm font-semibold text-black'>
          <div className='flex-end'>
          
            {[...Array(rowCount)].map((_, index) => (
              <div key={index}>
                <Row
                  rowData={rowsData[index]}
                  onRuleChange={(value) => handleRowChange(index, 'rule', value)}
                  onDetailsChange={(value) => handleRowChange(index, 'details', value)}
                  onTimestampChange={(value) => handleRowChange(index, 'timestamp', value)}
                  onRecommendationChange={(value) => handleRowChange(index, 'recommendation', value)}
                />
                {addedrows.includes(index) && (
                  <button
                    className='rounded-full mt-4 justify-end h-24 w-24'
                    onClick={() => removeRow(index)}
                  >
                    <img className='mr-0 mt-0 h-12 w-12' src={minus} alt='Remove' />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className='flex items-end justify-center mt-4 h-full'>
            <div className='flex fixed right-12 bottom-20'>
              <button
                className='rounded-full bg-gradient-to-r from-buttonGreen to-darkGreen hover:bg-gradient-to-br p-2 ml-[950px] mb-8'
                onClick={addRow}
              >
                <img src={plus} alt='Add' />
              </button>
            </div>
            <div className='flex'>
              <button
                className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 '
                onClick={submit}
              >
                Save
              </button>
              <button
                className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                onClick={viewdetails}
              >
                View Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnotationTable;
