import React, { useEffect, useState } from 'react';
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar';
import Navbar from '../../components/navbar/Navbar';
import Row from '../../components/AnnotationTable/Row';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import plus from '../../assets/Images/plus.png';
import minus from '../../assets/Images/minus.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AnnotationTable() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  const [isChecked, setIsChecked] = useState(() => {
    return JSON.parse(localStorage.getItem('isChecked')) || false;
  });

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    localStorage.setItem('isChecked', JSON.stringify(newCheckedState));
  };

  const viewdetails = () => {
    navigate('/product');
  };

  const [addedrows, setAddedRows] = useState(() => {
    const storedrows = localStorage.getItem('addedrows');
    return storedrows ? JSON.parse(storedrows) : [0];
  });

  const [rowsData, setRowsData] = useState(() => {
    const storedRowsData = localStorage.getItem('rowsData');
    return storedRowsData
      ? JSON.parse(storedRowsData)
      : [{ id: 0, timestamp: '', rule: '', details: '', recommendation: '' }];
  });

  const [rowCount, setRowCount] = useState(() => addedrows.length);

  const addRow = () => {
    setRowCount((prevCount) => {
      const newCount = prevCount + 1;
      setAddedRows((prevRows) => [...prevRows, newCount]);
      setRowsData((prevData) => [
        ...prevData,
        { id: newCount, timestamp: '', rule: '', details: '', recommendation: '' },
      ]);
      return newCount;
    });
  };

  useEffect(() => {
    console.log('Updated rowsData:', rowsData);
    localStorage.setItem('rowsData', JSON.stringify(rowsData));
  }, [rowsData]);

  const removeRow = (index) => {
    if (addedrows.includes(index) && rowCount > 0) {
      setRowCount((prevCount) => prevCount - 1);
      setAddedRows((prevRows) => prevRows.filter((rowIndex) => rowIndex !== index));
      setRowsData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  const handleRowChange = (index, field, value) => {
    setRowsData((prevData) => {
      const updatedData = prevData.map((rowData, i) =>
        i === index ? { ...rowData, [field]: value } : rowData
      );
      console.log('Updated rowsData:', updatedData);
      return updatedData;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/annotations/annotation/${videoId}`, {
        annotations: rowsData,
      });

      console.log('Response from server:', response.data);
      window.alert('Annotations saved successfully!');
    } catch (error) {
      console.error('Error saving annotations:', error);
    }
  };

  return (
    <div className='bg-backgroundGreen h-full flex'>
      <div className='w-2/8 fixed h-full hidden sm:flex flex-col'>
        <Annotatorsidebar />
      </div>
      <div className='w-full h-full sm:w-3/4 ml-0 sm:ml-64'>
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
          <Videowithtext />
        </div>
        <div className='ml-16 h-full sm:ml-20 mb-8 mt-10 text-sm font-semibold text-black'>
          <div className='flex-end'>
            <p>Is this video violated advertising rules and regulations?</p>
            
            <div>
              <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white '>
                <input
                  type='checkbox'
                  className='sr-only'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                    !isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
                  }`}
                >
                  Yes
                </span>
                <span
                  className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                    isChecked ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
                  }`}
                >
                  No
                </span>
              </label>
            </div>

            {!isChecked && (
              <>
                {[...Array(rowCount)].map((_, index) => (
                  <div key={index}>
                    <Row
                      rowData={rowsData[index] || {
                        timestamp: '',
                        rule: '',
                        details: '',
                        recommendation: '',
                      }}
                      onRuleChange={(value) => handleRowChange(index, 'rule', value)}
                      onDetailsChange={(value) => handleRowChange(index, 'details', value)}
                      onTimestampChange={(value) => handleRowChange(index, 'timestamp', value)}
                      onRecommendationChange={(value) =>
                        handleRowChange(index, 'recommendation', value)
                      }
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
              </>
            )}
          </div>

          {!isChecked && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnotationTable;
