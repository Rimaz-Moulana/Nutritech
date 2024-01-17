import React, { useState } from 'react';
import backarrow from '../../assets/Images/backarrowgreen.png';
import arrow from '../../assets/Images/arrowgreen.png';
import home from '../../assets/Images/home.png';
import video from '../../assets/Images/video.png';
import foodproducts from '../../assets/Images/products.png';

const Annotatorsidebar = () => {
  const [selected, setSelected] = useState(0);
  const [isEnlarge, setEnlarge] = useState(true);

  const nav = [
    {
      icon: home,
      selectedIcon: home,
      text: 'Home',
    },
    {
      icon: video,
      selectedIcon: video,
      text: 'Video',
    },
    {
      icon: foodproducts,
      selectedIcon: foodproducts,
      text: 'Products',
    },
  ];

  const enlarge = {
    decrease:arrow, 
    enlarge:backarrow,
    text: 'Group Manager',
  };

  const handleItemClick = (index) => {
    setSelected(index);
  };

  const handleEnlargeClick = () => {
    setEnlarge(!isEnlarge);
  };

  return (
    <div id="app" className="min-h-screen bg-sidebarGreen">
      <header className="pos-r h-screen inline-flex flex-col justify-between bg-sidebarGreen p-6">
        <nav className=" inline-flex flex-col space-y-2">
          {nav.map((link, index) => (
            <a
              key={index}
              className={`flex items-left text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''} ${isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'pt-2 rounded-full'}`}
              onClick={() => handleItemClick(index)}
            >
              <img
                src={isEnlarge ? link.selectedIcon : link.icon}
                alt={link.text}
                className={`w-8 h-8 p-0 ${isEnlarge ? 'mr-4' : ''}`}
              />
              {isEnlarge && <span className="font-medium select-none">{link.text}</span>}
            </a>
          ))}
        </nav>
        <button
          className="h-8 w-8 p-1 bg-darkGreen text-sidebarGreen rounded-lg mx-auto border border-solid border-gray-200 hover:border-gray-300"
          onClick={handleEnlargeClick}
        >
          <img src={isEnlarge ? enlarge.decrease : enlarge.enlarge} alt="Enlarge/Decrease" />
        </button>
      </header>
    </div>
  );
};

export default Annotatorsidebar;
