import React from 'react';
import logo from '../../../src/assets/Images/NutriTechLogo08.png';


export default function NavbarMediaStation() {

  return (
    <div>
      <nav className="mt-0 mb-6 fixed w-3/4 z-10">
        <div className="flex p-2 bg-backgroundGreen">
          {/* Logo */}
          <img src={logo} className="h-16 w-44 place-items-start width-full ml-4" alt="NutriTech Logo" />
        </div>
      </nav>    
    </div>
  );
}