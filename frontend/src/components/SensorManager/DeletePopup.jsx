import React, { useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function DeletePopup({ openModal, setOpenModal }) {

  return (
    <div className='h-screen object-center'>
  <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup className='w-1/4 object-center'>
    <Modal.Body className='px-0 py-0 bg-darkGreen text-white rounded'>
      <div className="text-center p-3">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14" />
        <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
          Are you sure you want to delete this Rule?
        </h3>
        <div className="flex justify-center gap-4">
          <Button className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ' onClick={() => setOpenModal(false)}>
            Delete
          </Button>
          <Button className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
</div>
  )
}

export default DeletePopup
