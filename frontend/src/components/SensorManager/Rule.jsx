import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Rule({ rule , type}) {

  const handleDelete = async (ruleId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/rules/rules/${ruleId}`,
      
      );
      // window.history.back();
    } catch (error) {
      console.error('Error declining video:', error);
    }
  };

  const handleOpen = async (ruleId) => {
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
          handleDelete(ruleId);
          Swal.fire({
            showConfirmButton: false,
            text: "Done",
            timer: 2000,
            icon: "success",
            iconColor: '#294B29',
            customClass: {
              popup: 'bg-gray-300 text-sidebarGreen',
            },
          });
         }
    
      });
    
  };


  return (
    <div className='flex bg-white rounded w-6/8 ml-8 mt-12 mr-16 border-2 border-black h-16'>
      <div className='w-3/4'>
        <p className='text-left ml-4 '>{rule.rule} </p>
      </div>

      <div className='flex h-12 justify-end w-1/4 mt-6'>
        {/* <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">Edit</button> */}
        
      {type !== "home" || type!=="expert" && (
        <button
        className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => handleOpen(rule._id)}
      >
        Delete
      </button>
      )}  
      </div>

      {/* <Popup text1={"delete"} text2={"rule"} button={"Delete"} openModal={openModal} setOpenModal={setOpenModal}/> */}

    </div>
  );
}

export default Rule;
