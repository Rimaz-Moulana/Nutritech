import React from 'react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Comments from '../CommentSection/Comments';
import { Button, Modal } from 'flowbite-react';

function Message({ videoId }) {
    const [openModal, setOpenModal] = useState(true);
  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <Comments videoId={videoId} type={"message"} section={"message"}/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default Message;
