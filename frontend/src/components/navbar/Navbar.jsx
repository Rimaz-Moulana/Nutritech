import React from 'react'
import logo from '../../../src/assets/Images/NutriTechLogo11.png'

export default function Navbar() {
  return (
    <nav className="border--200 bg-black w-full">
      <div className="flex p-4 w-full">
        <img src={logo} className="h-8 place-items-start width-full ml-7.5" alt="NutriTech Logo" />  
     </div>
  </nav>
  )
}