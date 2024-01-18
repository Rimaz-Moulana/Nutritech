import React from 'react'
import logo from '../../../src/assets/Images/NutriTechLogo08.png'

export default function Navbar() {
  return (
    <nav className="border--200 bg-backgroundGreen mt-2">
      <div className="flex p-4">
        <img src={logo} className="h-16 place-items-start w-full ml-56" alt="NutriTech Logo" />  
     </div>
  </nav>
  )
}