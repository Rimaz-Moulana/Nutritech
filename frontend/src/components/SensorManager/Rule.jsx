import React, { useState } from 'react';
import EditRule from '../Popup/EditRule';
import Popup from './Popup';


function Rule() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className='flex bg-white rounded w-6/8 ml-8 mt-12 mr-16 border-2 border-black h-24'>
      <div className='w-3/4'>
        <p className='text-left ml-4 '>Rule </p>
      </div>

      <div className='flex h-12 justify-end w-1/4 mt-6'>
        <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">Edit</button>
        
        <button
          className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleOpen}  // Add parentheses to call the function
        >
          Delete
        </button>
      </div>

      <Popup text1={"delete"} text2={"rule"} button={"Delete"} openModal={openModal} setOpenModal={setOpenModal}/>

    </div>
  );
}

export default Rule;
