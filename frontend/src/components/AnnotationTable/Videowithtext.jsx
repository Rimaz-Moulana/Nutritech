import React from 'react'
import video from '../../assets/videos/astra.mp4'

function Videowithtext() {
  return (
    <div className='lg:flex sm:relative justify-center'>
        <div>
        <video className="h-auto max-w-full rounded-lg lg:ml-10 sm:ml-4" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        </div>
      <div className='bg-white lg:w-1/2 lg:ml-12 sm:w-full p-3 text-justify border rounded-lg'>
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
