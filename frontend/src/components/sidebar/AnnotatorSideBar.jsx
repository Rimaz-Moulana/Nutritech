import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import home from '../../assets/Images/home.png';
import menu from '../../assets/Images/menu.png';
import foodproducts from '../../assets/Images/products.png';
import video from '../../assets/Images/video.png';

const Annotatorsidebar = () => {
  const [isEnlarge, setEnlarge] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

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
      text: 'Video',
    },
  ];

  const enlarge = {
    decrease: menu,
    enlarge: menu,
    text: 'Group Manager',
  };

  const [selected, setSelected] = useState(() => {
    const storedSelected = JSON.parse(localStorage.getItem('selectedSidebarItem'));
    return storedSelected !== null ? storedSelected : nav.findIndex((item) => item.text === 'Home');
  }); 

  useEffect(() => {
    localStorage.setItem('selectedSidebarItem', JSON.stringify(selected));
  }, [selected]);

  
  const handleItemClick = (index) => {
    setSelected(index);
    if (index === nav.findIndex((item) => item.text === 'Video')) {
      setDropdownOpen(!isDropdownOpen);
    } else if (index === nav.findIndex((item) => item.text === 'Products')){
      navigate('/addedproduct');
      
    } else{
      navigate('/home');
    }
  };

  const handleEnlargeClick = () => {
    setEnlarge(!isEnlarge);
  };

  return (
    <div id="app" className="min-h-screen fixed bg-sidebarGreen">
      <header className="pos-r h-screen inline-flex flex-col justify-between bg-sidebarGreen p-6">
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
                  isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-full'
                } ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={() => handleItemClick(index)}
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
              {link.text === 'Video' && isDropdownOpen && (
                <div className="absolute top-full left-0 bg-darkGreen shadow rounded mt-2">
              <Link
                  to="/all"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
                  All Videos
                </Link>
                <Link
                  to="/annotated-videos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
                  Annotated Videos
                </Link>
                <Link
                  to="/unannotated-videos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
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
