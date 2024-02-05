import React from 'react'
import video from '../../assets/videos/astra.mp4'
import Videodetails from '../SensorManager/Videodetails'

function VideowithReview() {
  return (
    <div className='lg:flex mt-32 justify-right ml-8'>
        <div className='w-1/2'>
        <video className="h-auto max-w-full justify-right rounded-lg ml-10" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        </div>
      
        <form className="w-full max-w-sm lg:ml-36">
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
        Brand Name
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="shadow bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" id="inline-full-name" type="text" value=""/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4" for="inline-password">
        Product
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="shadow bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" id="inline-password" type="password" />
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-black font-bold text-left mb-1 md:mb-0 pr-4" for="inline-password">
        Variation
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="shadow bg-white appearance-none border-2 border-darkGreen rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-sidebarGreen" id="variation" type="variation"/>
    </div>
  </div>
  <div className="flex items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button">
        Decline
      </button>
    </div>
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button">
        Save
      </button>
    </div>
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " type="button">
        Cancel
      </button>
    </div>
  </div>
</form>
    </div>
  )
}

export default VideowithReview
