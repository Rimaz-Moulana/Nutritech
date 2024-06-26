import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import API from '../config/config';

function Rule({ rule , type, rules}) {
// console.log(rules)
  const handleDelete = async (ruleId) => {
    try {
      const response = await axios.delete(`${API}/api/rules/rules/${ruleId}`,
      
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
    <div>
    <div className='flex bg-white rounded ml-8 mt-8 mr-16 border-2 border-black h-fit'>
      <div className='w-full'>
      <p className='text-left ml-4 text-gray-500 '>{rule.ruleNumber} </p>
        <p className='text-left ml-4 font-semibold mb-4 p-2'>{rule.rule} </p>
      </div>

     
        {/* <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ">Edit</button> */}
        
      {(type === "sensormanager" || type==="expert") && (
         <div className='flex justify-end items-end h-12 w-1/8 mt-6 bottom-0'>
         <button
           className=" text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
           onClick={() => handleOpen(rule._id)}
         >
           Delete
         </button>
       </div>
       
      )}  
      

      {/* <Popup text1={"delete"} text2={"rule"} button={"Delete"} openModal={openModal} setOpenModal={setOpenModal}/> */}

    </div>
  
    </div>
  );
}

export default Rule;
