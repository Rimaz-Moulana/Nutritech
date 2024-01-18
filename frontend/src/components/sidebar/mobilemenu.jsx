import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import home from '../../assets/Images/home.png';
import video from '../../assets/Images/video.png';
import foodproducts from '../../assets/Images/products.png';
import menu from '../../assets/Images/menu.png'

const Annotatorsidebar = () => {
  const [selected, setSelected] = useState(0);
  const [isEnlarge, setEnlarge] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const nav = [
    {
      icon: home,
      selectedIcon: home,
      text: 'Home',
    },

    {
      icon: foodproducts,
      selectedIcon: foodproducts,
      text: 'Products',
    },

    {
      icon: video,
      selectedIcon: video,
      text: 'Video  ',
    },
    
  ];

  const enlarge = {
    decrease: menu, 
    enlarge: menu,
    text: 'Group Manager',
  };

  const handleItemClick = (index) => {
    setSelected(index);
    if (index === nav.findIndex(item => item.text === 'Video  ')) {
      setDropdownOpen(!isDropdownOpen);
    } else {
      setDropdownOpen(false);
      setSelected(index);
    }
  };

  const handleEnlargeClick = () => {
    setEnlarge(!isEnlarge);
  };

  const isSmallScreen = window.innerWidth <= 768; 
 
  return (
    <div id="app" className="min-h-screen bg-sidebarGreen">
      <header className="pos-r h-screen inline-flex flex-col bg-sidebarGreen p-6">
      <button
          className="h-8 w-8 p-1 mb-12 gray-300 text-sidebarGreen rounded-lg mx-auto border border-solid border-gray-200 hover:border-gray-300"
          onClick={handleEnlargeClick}
        >
          <img src={isEnlarge ? enlarge.decrease : enlarge.enlarge} alt="Enlarge/Decrease" />
        </button>

        <nav className=" inline-flex flex-col space-y-2">
          {nav.map((link, index) => (
            <div key={index} className="relative">
              <a
                className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-full'} ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={() => handleItemClick(index)}
              >
                <img
                  src={isEnlarge ? link.selectedIcon : link.icon}
                  alt={link.text}
                  className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-4' : ''}`}
                />
                {isEnlarge && <span className="font-medium select-none">{link.text}</span>}
                {link.text === 'Video  ' && link.image && !isSmallScreen && (
                  <img
                    src={link.image}
                    alt="Video"
                    className="w-8 h-8 p-1 ml-2 rounded-full"
                  />
                )}
              </a>
              {link.text === 'Video  ' && isDropdownOpen && (
                  <div className="absolute top-full left-0 bg-darkGreen shadow rounded mt-2">
                    <Link to="/all" className="block px-4 py-2 text-sm text-gray-700 hover:text-white">
                      All Videos
                    </Link>
                    <Link to="/annotated-videos" className="block px-4 py-2 text-sm text-gray-700 hover:text-white">
                      Annotated Videos
                    </Link>
                    <Link to="/unannotated-videos" className="block px-4 py-2 text-sm text-gray-700 hover:text-white">
                      Unannotated Videos
                    </Link>
                  </div>
              )}
            </div>
          ))}
        </nav>
        
      </header>
    </div>
  );
};

export default Annotatorsidebar;
