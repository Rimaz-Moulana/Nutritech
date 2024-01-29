import React from 'react'
import video from '../../assets/videos/astra.mp4'
import Videodetails from '../../components/SensorManager/Videodetails'

function VideowithReview() {
  return (
    <div className='flex justify-center'>
        <div>
        <video className="h-auto max-w-full rounded-lg ml-10" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        </div>
      <div className='bg-white w-1/2 p-3 ml-8 text-justify border rounded-lg'>
        <Videodetails type='Brand Name'/>
        <Videodetails type='Product'/>
        <Videodetails type='Variation'/>
      </div>
    </div>
  )
}

export default VideowithReview
