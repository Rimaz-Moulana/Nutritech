import React from 'react';
import Comments from '../CommentSection/Comments';

function MessagePopup({ videoId, onClose }) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="bg-bg-backgroundGreen inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-backgroundGreen px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Message to annotator</h3>
                <div className="mt-2 w-full">
                <Comments videoId={videoId} type={"message"} section={"message"} onClose={onClose}/>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-bg-backgroundGreen px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-buttonGreen text-base font-medium text-white hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkGreen sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePopup