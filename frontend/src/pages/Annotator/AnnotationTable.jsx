import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Row from '../../components/AnnotationTable/Row';
import Videowithtext from '../../components/AnnotationTable/Videowithtext';
import plus from '../../assets/Images/plus.png';
import minus from '../../assets/Images/minus.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../../components/sidebar/SideBar';

function AnnotationTable() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  const [isYesSelected, setIsYesSelected] = useState(true);
  const [videoDuration, setDuration] = useState([]);

  const handleYesClick = () => {
    setIsYesSelected(true);
  };

  const handleNoClick = () => {
    setIsYesSelected(false);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5a7d59",
      confirmButtonText: "Yes",
      iconColor: "#294B29",
      customClass: {
        popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
        cancelButton: 'bg-gradient-to-t from-buttonGreen to-darkGreen',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        submitNone();
        Swal.fire({
          // title: "Deleted!",
          showConfirmButton: false,
          text: "Done",
          timer: 2000,
          icon: "success",
          iconColor: '#294B29',
          customClass: {
            popup: 'bg-gray-300 text-sidebarGreen', // Use Tailwind CSS class directly
          },
        });
      }else{
        handleYesClick()
      }
    });
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
      setAddedRows((prevRows) => [...prevRows, newCount - 1]); // Store the actual index
      setRowsData((prevData) => [
        ...prevData,
        { id: newCount, timestamp: '', rule: '', details: '', recommendation: '' },
      ]);
      return newCount;
    });
  };

  useEffect(() => {
    // console.log('Updated rowsData:', rowsData);
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
      await axios.post(`http://localhost:3000/annotations/annotation/${videoId}`, {
        annotations: rowsData,
      });

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
      
      localStorage.removeItem('addedrows');
      localStorage.removeItem('rowsData');
      window.history.back();
    } catch (error) {
      console.error('Error saving annotations:', error);
    }
  };

  const submitNone = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/annotations/annotation/${videoId}`, {
        annotations: {
          timestamp: '',
          rule: '',
          details: '',
          recommendation: '',
        }
      });
  
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
      window.history.back();
    } catch (error) {
      console.error('Error saving annotations:', error);
    }
  };
  
 

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/videos/annotation/${videoId}`);
        const data = response.data[0].duration;  // Access the data property directly
        setDuration(data);
      } catch (error) {
        console.error('Error fetching Video:', error);
      } 
    };
  
    fetchVideo();
  }, [videoId]);
  
console.log(videoDuration)
  return (
    <div className='bg-backgroundGreen h-full min-h-screen flex z-10 '>
      <div className='fixed h-full hidden sm:flex flex-col'>
        <Sidebar type="annotator" />
      </div>
      <div className='w-full lg:ml-[15%] lg:w-[75%] h-full ml-0 flex-grow z-10 '>
        <Navbar type='annotator' />
        <div className='w-full mt-28'>
          <Videowithtext videoId={videoId}/>
        </div>
        <div className='px-3 h-full mb-8 mt-10 text-sm font-semibold text-black'>
          <div className='lg:flex-end'>
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
            {isYesSelected && (
              <>
                {[...Array(rowCount)].map((_, index) => (
                  <div key={index} className='center-l flex'>
                    <Row duration={videoDuration}
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
                        className='rounded-full justify-end h-12 w-12 ml-[5%] mt-[13%] '
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
