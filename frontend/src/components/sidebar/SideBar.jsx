import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../assets/Images/edit.png';
import home from '../../assets/Images/home.png';
import menu from '../../assets/Images/menu.png';
import foodproducts from '../../assets/Images/products.png';
import video from '../../assets/Images/video.png';



const Sidebar = ({type,onValueChange}) => {
  const [isEnlarge, setEnlarge] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const email  = localStorage.getItem('email');
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
          const response = await axios.get(`http://localhost:3000/api/users/getUser/${email}`);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);

  const navAnnotator = [
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

  const navExpert = [
    {
      icon: home,
      selectedIcon: home,
      text: 'Home',
    },
    {
      icon: edit,
      selectedIcon: edit,
      text: 'Rules and Regulations',
    },
    {
      icon: video,
      selectedIcon: video,
      text: 'Video',
    },
  ];

  const navIndustryOrSensor = [
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
  
  const navResearcher = [
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
      icon: edit,
      selectedIcon: edit,
      text: 'Rules & Regulations',
    },
    {
      icon: edit,
      selectedIcon: edit,
      text: 'Reports',
    },
    {
      icon: edit,
      selectedIcon: edit,
      text: 'History',
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

  
  const handleItemClick = (index,event) => {
    event.preventDefault();

    localStorage.setItem('selectedSidebarItem', JSON.stringify(index));
   
    setSelected(index);
    if (type==="annotator") {
      if (index === navAnnotator.findIndex((item) => item.text === 'Video')) {
        setDropdownOpen(!isDropdownOpen);
      }else if (selected === index) {
        return;
      } else {
        if (index === navAnnotator.findIndex((item) => item.text === 'Products')){
        navigate(`/addedproduct/${type}`);    
      } else{
        navigate('/home');
      }
    }
    }else if (type==="expert") {

      if (index === navExpert.findIndex((item) => item.text === 'Video')) {
        setDropdownOpen(!isDropdownOpen);
      }else{
        if (selected === index) {
          // If the clicked item is already selected, navigate to the default 'Home' item
          return;
        } else {
           if (index === navExpert.findIndex((item) => item.text === 'Rules and Regulations')){
        navigate(`/rules/${type}`);
        
          } else{
        navigate('/expertpanelhome');
        }
        }    
    }
    }else if (type==="industry") {
      if (selected === index) {
        // If the clicked item is already selected, navigate to the default 'Home' item
        return;
      } else {
        // setSelected(index);
        if (index === navIndustryOrSensor.findIndex((item) => item.text === 'Videos')) {
          navigate('/industryhistory');
        } else if (index === navIndustryOrSensor.findIndex((item) => item.text === 'Products')) {
          navigate(`/addedproduct/${type}`);
        } else if (index === navIndustryOrSensor.findIndex((item) => item.text === 'Rules & Regulations')) {
          navigate(`/rules/${type}`);
        } else {
          navigate('/industryhome');
        }
      }
    }else if (type==="sensormanager") {
      if (selected === index) {
        // If the clicked item is already selected, navigate to the default 'Home' item
        // navigate('/sensormanagerhome');
        return;
      } else {
        setSelected(index);
        if (index === navIndustryOrSensor.findIndex((item) => item.text === 'Videos')) {
          navigate('/sensormanagernewvideo');
        } else if (index === navIndustryOrSensor.findIndex((item) => item.text === 'Products')) {
          navigate('/sensormanagerproducts');
        } else if (index === navIndustryOrSensor.findIndex((item) => item.text === 'Rules & Regulations')) {
          navigate(`/rules/${type}`);
        } else {
          navigate('/sensormanagerhome');
        }
      }
    }else if (type==="researcher") {
      if (selected === index) {
        // If the clicked item is already selected, navigate to the default 'Home' item
        // navigate('/sensormanagerhome');
        return;
      } else {
        setSelected(index);
        if (index === navResearcher.findIndex((item) => item.text === 'History')) {
          navigate('/history');
        } else if (index === navResearcher.findIndex((item) => item.text === 'Products')) {
          // navigate('/sensormanagerproducts');
        } else if (index === navResearcher.findIndex((item) => item.text === 'Rules & Regulations')) {
          navigate(`/rules/${type}`);
        }  else if (index===navResearcher.findIndex((item)=>item.text === "Reports")){
          navigate('/reports');
        } else {
          navigate('/researcherhome');
        }
      }
    }
  }
  // };

  const handleEnlargeClick = () => {
    setEnlarge(!isEnlarge);
    onValueChange(!isEnlarge);
  };

  return (
    <div id="app" className="min-h-screen fixed bg-sidebarGreen lg:max-w-[15%] text-left">
  <header className="pos-r h-screen inline-flex flex-col justify-between bg-sidebarGreen p-6">
    <nav className=" inline-flex flex-col space-y-2">
      <button
        className="h-8 w-8 p-1 mb-8 hidden sm:block bg-sidebarGreen text-sidebarGreen rounded-lg mx-auto hover:border-gray-300"
        onClick={handleEnlargeClick}
      >
        <img src={isEnlarge ? enlarge.decrease : enlarge.enlarge} alt="Enlarge/Decrease" />
      </button>
      {type === "annotator" && navAnnotator.map((link, index) => (
        <div key={index} className="relative">
          <a
            className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${
              isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-full'
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
              <Link
                to="/reannotatevideos"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                onClick={() => handleItemClick(2)}
              >
                Reannotated Videos
              </Link>
              
            </div>
          )}
        </div>
      ))}

          {type==="expert" && navExpert.map((link, index) => (
            <div key={index} className="relative">
              <a
                className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${
                  isEnlarge ? 'pl-1 pr-1 rounded-lg' : 'px-1  rounded-full'
                } ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={(event) => handleItemClick(index,event)}
              >
                <img
                  src={isEnlarge ? link.selectedIcon : link.icon}
                  alt={link.text}
                  className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-0' : ''}`}
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
                <div className="absolute top-full left-0 bg-darkGreen shadow rounded mt-2 w-full">
              <Link
                  to="/expertpanelnew"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
                  New Videos
                </Link>

                {(userData.role !=="expert head" )&& (
                  <Link
                  to="/reviewedvideos"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
                  Reviewed Videos
                </Link>
                )}
                <Link
                  to="/red"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
                  Red Flaged
                </Link>
                <Link
                  to="/green"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-white"
                  onClick={() => handleItemClick(2)}
                >
                 Green Flaged
                </Link>
                </div>
              )}
            </div>
          ))}

          {type==="industry" && navIndustryOrSensor.map((link, index) => (
            <div key={index} className="relative">
              <a
                className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${
                  isEnlarge ? 'pl-1 pr-4 rounded-lg' : 'px-1 rounded-full'
                } ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={(event) => handleItemClick(index, event)}
              >
                <img
                  src={isEnlarge ? link.selectedIcon : link.icon}
                  alt={link.text}
                  className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-0' : ''}`}
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
              {type==="sensormanager" && navIndustryOrSensor.map((link, index) => (
            <div key={index} className="relative">
              <a
                className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${
                  isEnlarge ? 'pl-1 pr-3 rounded-lg' : 'px-1 rounded-full'
                } ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={(event) => handleItemClick(index, event)}
              >
                <img
                  src={isEnlarge ? link.selectedIcon : link.icon}
                  alt={link.text}
                  className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-1' : ''}`}
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


          {type==="researcher" && navResearcher.map((link, index) => (
            <div key={index} className="relative">
              <a
                className={`flex items-center text-white py-2 cursor-pointer hover:bg-darkGreen hover:text-sidebarGreen  ${
                  isEnlarge ? 'pl-1 pr-3 rounded-lg' : 'px-1 rounded-full'
                } ${selected === index ? 'bg-darkGreen text-sidebarGreen' : ''}`}
                onClick={(event) => handleItemClick(index, event)}
              >
                <img
                  src={isEnlarge ? link.selectedIcon : link.icon}
                  alt={link.text}
                  className={`w-8 h-8 p-1 ${isEnlarge ? 'mr-1' : ''}`}
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

export default Sidebar ;