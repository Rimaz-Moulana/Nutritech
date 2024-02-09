import React, { useEffect, useState } from 'react';
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar';
import Navbar from '../../components/navbar/Navbar';
import Row from '../../components/AnnotationTable/Row';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import plus from '../../assets/Images/plus.png';
import minus from '../../assets/Images/minus.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function AnnotationTable() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  const [isYesSelected, setIsYesSelected] = useState(true);

  const handleYesClick = () => {
    setIsYesSelected(true);
  };

  const handleNoClick = () => {
    setIsYesSelected(false);
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
      Swal.fire({
        icon: 'success',
        title: 'Annotations saved successfully!',
        showConfirmButton: false,
        timer: 2000, 
        customClass: {
          popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        },
        iconColor: '#294B29',
      });
    } catch (error) {
      console.error('Error saving annotations:', error);
    }
  };

  return (
    <div className='bg-backgroundGreen h-full min-h-screen flex z-10'>
      <div className='w-2/8 fixed h-full hidden sm:flex flex-col'>
        <Annotatorsidebar />
      </div>
      <div className='w-full h-full sm:w-3/4 ml-0 z-10 sm:ml-64'>
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
          <Videowithtext />
        </div>
        <div className='ml-16 h-full sm:ml-20 mb-8 mt-10 text-sm font-semibold text-black'>
          <div className='flex-end'>
            <p className='text-lg'>Does this video violated advertising rules and regulations?</p>
            
            <div className='flex place-content-center'>
              <button
                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                  isYesSelected ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
                }`}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                  !isYesSelected ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
                }`}
                onClick={handleNoClick}
              >
                No
              </button>
            </div>
            {!isYesSelected && (
              <>
              <div className='mt-12 w-1/2 ml-52 bg-white p-2 place-content-center item-center'>
              <div className='mt-4 text-lg'>Are you sure?</div>
              <div className='flex mt-4 place-content-center'>
              <button
                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                  isYesSelected ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
                }`}
                onClick={submit}
              >
                Yes
              </button>
              
              <button
                className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                  !isYesSelected ? 'text-primary bg-sidebarGreen text-white' : 'text-body-color'
                }`}
                onClick={handleYesClick}
              >
                No
              </button>
            </div>
              </div>
             

            <div>
            <button className="text-white mt-24 bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
               onClick={() => window.history.back()}>
                Cancel
                </button>
            </div>
            </>
            )
            }

            {isYesSelected && (
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

          {isYesSelected && (
            <div className='flex items-end justify-center mt-4 z-10 h-full'>
              <div className='flex fixed right-12 bottom-20'>
                <button
                  className='rounded-full bg-gradient-to-r from-buttonGreen to-darkGreen hover:bg-gradient-to-br p-2 ml-[950px] mb-8'
                  onClick={addRow}
                >
                  <img src={plus} alt='Add' />
                </button>
              </div>
              <div className='flex z-10'>
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

                <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 onClick={() => window.history.back()}>
                  Cancel
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
