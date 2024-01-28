import React from 'react'
import video from '../../assets/videos/astra.mp4'

function Videowithtext() {
  return (
    <div className='flex justify-center'>
        <div>
        <video className="h-auto max-w-full rounded-lg ml-10" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        </div>
      <div className='bg-white w-1/2 p-3 ml-8 text-justify border rounded-lg'>
        <p>
        Cake? Bake!
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Cake Bake Cake Bake Cake Bake Cake Bake cake bake cake bake with Astra 
        Share the love of baking with Astra  
        </p>
      </div>
    </div>
  )
}

export default Videowithtext
