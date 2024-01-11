import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Dropdown from '../components/dropdown/Dropdown'
import VideoContainer from '../components/videoContainer/VideoContainer'

function Allvideos() {
  return (
    <div className='bg-backgroundGreen'>
        <Navbar/>
        <Dropdown/>
        <VideoContainer/>
    </div>
    
  )
}

export default Allvideos
