import { Sidebar } from 'flowbite-react';
import menu from '../../assets/Images/menu.png';
import home from '../../assets/Images/home.png';
import video from '../../assets/Images/video.png';
import foodproducts from '../../assets/Images/products.png';
import annotate from '../../assets/Images/edit.png';
import dropdownIcon from '../../assets/Images/triangledropdown.png';
// import Dropdown from '../Dropdown/annotatorvideosdropdown'
import { Dropdown as FlowbiteDropdown } from 'flowbite-react';
import { useState } from 'react';

function AnnotatorSideBar() {

  
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  }; 
  return (
    <Sidebar className='h-screen bg-sidebarGreen w-32 items-center whitespace-normal px-0 py-0'>
      <Sidebar.Items className="h-screen bg-sidebarGreen px-0 py-0">
        <Sidebar.ItemGroup className='px-0 py-0'>
          <Sidebar.Item href="#"><img src={menu} alt="Menu" className='h-8 w-8 mt-7 mr-7 ml-2 items-center'/></Sidebar.Item>
          <Sidebar.Item href="#"><img src={home} alt="Menu" className='h-8 w-8 mt-9 mb-9 mr-7 ml-2 items-center'/></Sidebar.Item>
          <div className='relative'>
           <FlowbiteDropdown className='w-52 border-hidden' placement="right-start" label={<img src={video} alt="Menu" className='h-8 w-8 ml-3' />}>
              <FlowbiteDropdown.Item>All Videos</FlowbiteDropdown.Item>
              <FlowbiteDropdown.Item>Annotated Videos</FlowbiteDropdown.Item>
              <FlowbiteDropdown.Item>Unannotated Videos</FlowbiteDropdown.Item>
            </FlowbiteDropdown>
          </div>
          {/* <Dropdown/> */}
          <Sidebar.Item href="#"><img src={foodproducts} alt="Menu" className='h-8 w-8 mt-10 mr-7 ml-2 items-center'/></Sidebar.Item>
          <Sidebar.Item href="#"><img src={annotate} alt="Menu" className='h-8 w-8 mt-10 mr-7 ml-2 items-center'/></Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AnnotatorSideBar