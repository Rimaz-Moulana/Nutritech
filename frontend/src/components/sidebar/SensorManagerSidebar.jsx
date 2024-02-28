import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import home from '../../assets/Images/home.png';
import menu from '../../assets/Images/menu.png';
import foodproducts from '../../assets/Images/products.png';
import video from '../../assets/Images/video.png';
import edit from '../../assets/Images/edit.png';

const SensorManagerSidebar = () => {
  const [isEnlarge, setEnlarge] = useState(true);
  const navigate = useNavigate(); 

  const [selected, setSelected] = useState(() => {
    const storedSelected = JSON.parse(localStorage.getItem('selectedSidebarItem'));
    return storedSelected !== null ? storedSelected : nav.findIndex((item) => item.text === 'Home');
  }); 


  useEffect(() => {
    localStorage.setItem('selectedSidebarItem', JSON.stringify(selected));
  }, [selected]);

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
      text: 'Videos',
    },
    {
      icon: edit,
      selectedIcon: edit,
      text: 'Rules & Regulations',
    },
  ];

  const enlarge = {
    decrease: menu,
    enlarge: menu,
    text: 'Group Manager',
  };

  const handleItemClick = (index, event) => {
    // event.preventDefault();

    localStorage.setItem('selectedSidebarItem', JSON.stringify(index));
    // Update the state with the selected index
    setSelected(index);

    if (selected === index) {
      // If the clicked item is already selected, navigate to the default 'Home' item
      navigate('/sensormanagerhome');
    } else {
      setSelected(index);
      if (index === nav.findIndex((item) => item.text === 'Videos')) {
        navigate('/sensormanagernewvideo');
      } else if (index === nav.findIndex((item) => item.text === 'Products')) {
        navigate('/sensormanagerproducts');
      } else if (index === nav.findIndex((item) => item.text === 'Rules & Regulations')) {
        navigate('/rules');
      } else {
        navigate('/sensormanagerhome');
      }
    }
  };
  
 
  

  const handleEnlargeClick = () => {
    setEnlarge(!isEnlarge);
  };

  return (
    <div id="app" className="min-h-screen fixed bg-sidebarGreen">
      <header className="pos-r h-screen inline-flex flex-col justify-between bg-sidebarGreen p-3">
        <nav className=" inline-flex flex-col space-y-2">
          <button
            className="h-8 w-8 p-1 mb-8 hidden sm:block bg-sidebarGreen text-sidebarGreen rounded-lg mx-auto hover:border-gray-300"
            onClick={handleEnlargeClick}
          >
            <img src={isEnlarge ? enlarge.decrease : enlarge.enlarge} alt="Enlarge/Decrease" />
          </button>
          {nav.map((link, index) => (
            <div key={index} className="relative">
              <a
                className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${
                  isEnlarge ? 'pl-1 pr-6 rounded-lg' : 'px-1 rounded-full'
                } ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={(event) => handleItemClick(index, event)}
              >
                <img
                  src={isEnlarge ? link.selectedIcon : link.icon}
                  alt={link.text}
                  className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-4' : ''}`}
                />
                {isEnlarge && <span className="font-medium select-none">{link.text}</span>}
                {link.text === 'Video' && link.image && (
                  <img
                    src={link.image}
                    alt="Video"
                    className="w-8 h-8 p-1 ml-2 rounded-full"
                  />
                )}
              </a>
            </div>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default SensorManagerSidebar;
