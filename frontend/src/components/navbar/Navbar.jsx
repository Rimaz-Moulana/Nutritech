import React from 'react';
import logo from '../../../src/assets/Images/NutriTechLogo08.png';

function Navbar() {
  // const [isSidebarVisible, setSidebarVisible] = useState(false);

  // const handleMenuClick = () => {
  //   setSidebarVisible(!isSidebarVisible);
  // };

  return (
    <nav className="border--200 bg-backgroundGreen mt-2">
      <div className="flex p-4">
        <img src={logo} className="h-16 place-items-start w-full ml-56" alt="NutriTech Logo" />  
     </div>
  </nav>
  )
}

//     <div>
//       <nav className="mt-0 mb-12 fixed w-full">
//         <div className="flex p-4 bg-backgroundGreen">
//           {/* Menu Icon for Small Screens */}
//           <img
//             src={menuIcon}
//             className="h-8 w-8 ml-1 mt-4 sm:hidden cursor-pointer"
//             alt="Menu Icon"
//             onClick={handleMenuClick}
//           />

//           {/* Logo */}
//           <img src={logo} className="h-16 w-44 place-items-start width-full ml-4" alt="NutriTech Logo" />
//         </div>

//           {/* Sidebar */}
//       {isSidebarVisible && (
//         <div className="sm:hidden fixed h-1/2 w-1/2 inset-0 bg-opacity-0 z-50 mt-24 ">
//           <div className="flex">
//             <Sidebar />
//             <div className="flex-1" onClick={handleMenuClick}></div>
//           </div>
//         </div>
//       )} 

//       </nav>

    
//     </div>
//   );
// }

export default Navbar;

